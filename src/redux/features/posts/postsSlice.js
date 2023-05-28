import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';

const initialState = {
  posts: [],
  popularPosts: [],
  isLoading: false,
  errorMessage: '',
}

export const createPost = createAsyncThunk(
  'posts/createPost',
  async (postParams) => {
    try {
      const { data } = await axios.post('/posts', postParams);

      return data;
    } catch (error) {
      console.log(error)
    }
  }
)

export const getAllPosts = createAsyncThunk(
  'posts/getAllPosts',
  async () => {
    try {
      const { data } = await axios.get('/posts')

      return data;
    } catch (error) {
      console.log(error)
    }
  }
)

export const removePost = createAsyncThunk(
  'posts/removePost',
  async (id) => {
    try {
      const { data } = await axios.delete(`/posts/${id}`);

      return data;
    } catch (error) {
      console.log(error)
    }
  }
);

export const updatePost = createAsyncThunk(
  'posts/updatePost',
  async (updatedPost) => {
    try {
      const { data } = await axios.put(`/posts/${updatedPost.get('id')}`, updatedPost);

      return data;
    } catch (error) {
      console.log(error)
    }
  }
)

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {},
  extraReducers: {
    // Create Post
    [createPost.pending]: (state) => {
      state.isLoading = true;
    },
    [createPost.fulfilled]: (state, action) => {
      state.posts.push(action.payload)
      state.isLoading = false;

    },
    [createPost.rejected]: (state, action) => {
      state.isLoading = false;
    },
    // Get All Posts
    [getAllPosts.pending]: (state) => {
      state.isLoading = true;
      state.errorMessage = ''
    },
    [getAllPosts.fulfilled]: (state, action) => {

      if (action?.payload?.posts) {
        debugger
        state.posts = action.payload.posts;
      }

      if (action?.payload?.popularPosts) {
        state.popularPosts = action.payload.popularPosts;
      }

      if (action?.payload?.message) {
        state.errorMessage = action.payload.message
      };

      state.isLoading = false;
    },
    [getAllPosts.rejected]: (state, action) => {
      state.isLoading = false;
      state.errorMessage = action.payload.errorMessage
    },
    // Delete post
    [removePost.pending]: (state) => {
      state.isLoading = true;
    },
    [removePost.fulfilled]: (state, action) => {
      state.posts = state.posts.filter(post => post._id !== action.payload.post._id);
      state.popularPosts = state.popularPosts.filter(post => post._id !== action.payload.post._id);
      state.isLoading = false;
    },
    [removePost.rejected]: (state, action) => {
      state.isLoading = false;
    },
    // Update post
    [updatePost.pending]: (state) => {
      state.isLoading = true;
    },
    [updatePost.fulfilled]: (state, action) => {
      const postIndex = state.posts.findIndex(post => post._id === action.payload.post._id)
      state.posts[postIndex] = action.payload.post
      state.isLoading = false;
    },
    [updatePost.rejected]: (state, action) => {
      state.isLoading = false;
    },
  },
})

export default postsSlice.reducer;
