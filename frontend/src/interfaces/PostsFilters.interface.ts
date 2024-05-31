type ascOrDesc = 'asc' | 'desc' | '';

interface PostsFilters {
  content: string;
  start_date: string;
  end_date: string;
  sort_activity: ascOrDesc;
  sort_date: ascOrDesc;
}

export default PostsFilters;
