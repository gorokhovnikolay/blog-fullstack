import { request } from '../../utils/request';

export const deletePostAsynk = (id) => () => request(`/post/${id}`, 'DELETE');
