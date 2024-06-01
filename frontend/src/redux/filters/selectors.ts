import { RootState } from '../store.ts';

export const selectPostsFilters = (state: RootState) => state.filters.posts;
