import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from '../../../utils/axios';
import { toast } from 'react-toastify';

const initialState = {
  comments: [],
  isLoadding: false
}

export const createComment = createAsyncThunk(
  'comments/createComment',
  async (newComment) => {
    try {
      const { data } = await axios.post(`/comments/${newComment.get('postId')}'`, newComment);

      return data;
    } catch (error) {
      console.log(error)
    }
  }
);

export const removeComment = createAsyncThunk(
  'comments/removeComment',
  async (commentId) => {
    try {
      const { data } = await axios.delete(`/comments/${commentId}`);

      return data;
    } catch (error) {
      console.log(error)
    }
  }
);

export const getPostComments = createAsyncThunk(
  'posts/getPostComments',
  async (postId) => {
    try {
      const { data } = await axios.get(`/posts/comments/${postId}`)

      return data;
    } catch (error) {
      toast.error('Can\'t load post comments')
      console.log(error)
    }
  }
)

export const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearComments: (state) => {
      state.comments = [];
    }
  },
  extraReducers: {
    // Create Comment
    [createComment.pending]: (state) => {
      state.isLoading = true;
    },
    [createComment.fulfilled]: (state, action) => {
      state.comments.push(action.payload.newComment)
      state.isLoading = false;
    },
    [createComment.rejected]: (state, action) => {
      state.isLoading = false;
    },
    // Get Post Comments
    [getPostComments.pending]: (state) => {
      state.isLoading = true;
    },
    [getPostComments.fulfilled]: (state, action) => {
      state.comments = action.payload
      state.isLoading = false;
    },
    [getPostComments.rejected]: (state, action) => {
      state.isLoading = false;
    },
    // Remove Comment
    [removeComment.pending]: (state) => {
      state.isLoading = true;
    },
    [removeComment.fulfilled]: (state, action) => {
      state.comments = state.comments.filter(comment => comment._id !== action.payload.comment._id)
      state.isLoading = false;
    },
    [removeComment.rejected]: (state, action) => {
      state.isLoading = false;
    },
  }
})

export const { clearComments } = commentsSlice.actions;
export default commentsSlice.reducer