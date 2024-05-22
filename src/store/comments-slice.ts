import { buildCreateSlice, asyncThunkCreator } from '@reduxjs/toolkit';
import { Comment, UserComment } from '../types';
import { CommentsApi } from '../services/comments-api';
import { setErrorMessage } from './error-slice';
import { getMessage } from '../services/handle-error';

const createSliceWithThunks = buildCreateSlice({
  creators: { asyncThunk: asyncThunkCreator },
});

type CommentsState = {
  comments: Comment[];
  isCommentAddingInProgress: boolean;
  isCommentWasAdded: boolean;
}

const initialState: CommentsState = {
  comments: [],
  isCommentAddingInProgress: false,
  isCommentWasAdded: false
};

const commentsSlice = createSliceWithThunks({
  name: 'comments',
  initialState,
  selectors: {
    selectComments: (state) => state.comments,
    selectCommentWasAdded: (state) => state.isCommentWasAdded,
    selectIsCommentAddingInProgress: (state) => state.isCommentAddingInProgress,
  },
  reducers: (create) => ({
    resetCommentWasAddedAction: create.reducer((state) => {
      state.isCommentWasAdded = false;
    }),
    fetchCommentsAction: create.asyncThunk<Comment[], string, { extra: { commentsApi: CommentsApi }}>(
      async (id, { extra: { commentsApi } }) => commentsApi.getList(id).catch((err) => {
        setErrorMessage(getMessage(err));
        throw err;
      }),
      {
        fulfilled: (state, action) => {
          state.comments = action.payload;
        },
        pending: (state) => {
          state.comments = [];
        },
      }
    ),
    addCommentAction: create.asyncThunk<Comment, { comment: UserComment; onSuccess: () => void }, { extra: { commentsApi: CommentsApi }}>(
      ({ comment, onSuccess }, { extra: { commentsApi }, dispatch }) => commentsApi.sendComment(comment)
        .then((res) => {
          onSuccess();
          return res;
        })
        .catch((err) => {
          dispatch(setErrorMessage(getMessage(err)));
          throw err;
        }),
    {
      fulfilled: (state, action) => {
        state.isCommentAddingInProgress = false;
        state.comments = [action.payload,...state.comments];
        state.isCommentWasAdded = true;
      },
      pending: (state) => {
        state.isCommentAddingInProgress = true;
      },
      rejected: (state) => {
        state.isCommentAddingInProgress = false;
      }
    }
    ),
  }),
});

export default commentsSlice;
export const { selectComments, selectCommentWasAdded, selectIsCommentAddingInProgress } = commentsSlice.selectors;
export const { fetchCommentsAction, addCommentAction, resetCommentWasAddedAction } = commentsSlice.actions;
