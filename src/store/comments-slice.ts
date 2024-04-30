import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { Comment } from '../types';
import { comments } from '../fake-data/films';

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type CommentsState = {
  comments: Comment[];
}

const initialState: CommentsState = {
  comments,
};

const commentsSlice = createSliceWithThunks({
  name: 'comments',
  initialState,
  selectors: {
    selectComments: (state) => state.comments,
  },
  reducers: {},
});

export default commentsSlice;
export const { selectComments } = commentsSlice.selectors;
