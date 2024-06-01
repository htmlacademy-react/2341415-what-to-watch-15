import { ServerRoute } from '../const';
import { Comment, Film, UserComment } from '../types';
import api from './api';

const commentsApi = {

  async getList(id: Film['id']): Promise<Comment[]> {
    const { data } = await api.get<Comment[]>(`${ServerRoute.Comments}/${id}`);
    return data;
  },
  async sendComment({ comment, id, rating }: UserComment):Promise<Comment> {
    const { data } = await api.post<Comment>(`${ServerRoute.Comments}/${id}`, { comment, rating });
    return data;
  }
} as const;

type CommentsApi = typeof commentsApi;

export {
  commentsApi,
};

export type {
  CommentsApi,
};
