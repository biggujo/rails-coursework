import axios, { AxiosResponse } from 'axios';
import {
  ChatEntity,
  ChatMessage,
  CommentEntity,
  GroupEntity,
  NewCommentEntity,
  GroupFormValues,
  NewPostEntity,
  PasswordRecoveryFormData,
  PostEntity,
  UserProfile,
  UserSignInFormAPI,
  PostsFilters,
} from '../interfaces';
import UserSignUpFormAPI from '../interfaces/UserSignUpFormAPI.ts';
import { ProfileUpdateFormAPI } from '../interfaces/ProfileUpdateFormAPI.ts';
import UserEntity from '../interfaces/UserEntity.interface.ts';

axios.defaults.baseURL = import.meta.env.VITE_API_URL; // Rails

const MULTIPART_FORM_HEADERS = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
};

const auth = {
  signIn: async (data: UserSignInFormAPI) => {
    const response: AxiosResponse = await axios.post('/sign_in', {
      user: data,
    });

    return response;
  },
  signUp: async (data: UserSignUpFormAPI) => {
    const response: AxiosResponse = await axios.post('/sign_up', {
      user: data,
    });

    return response;
  },
  signOut: async () => {
    const response: AxiosResponse = await axios.delete('/sign_out');

    return response;
  },
  refreshUser: async () => {
    const response: AxiosResponse = await axios.get('/refresh');
    return response.data as UserProfile;
  },
};

const user = {
  getAll: async () => {
    const response: AxiosResponse = await axios.get('/users');
    return response.data as {
      data: Array<UserEntity>;
    };
  },
  getById: async (id: number) => {
    const response: AxiosResponse = await axios.get(`/users/${id}`);
    return response.data;
  },
  updateById: async (data: ProfileUpdateFormAPI) => {
    // FormData is needed to correctly send files
    const formData = new FormData();

    for (const key in data) {
      // @ts-expect-error because TS doesn't know about Blob serialization
      formData.append(key, data[key as keyof ProfileUpdateFormAPI]);
    }

    const response: AxiosResponse = await axios.patch(
      `/users/${data.id}`,
      {
        user: data,
      },
      MULTIPART_FORM_HEADERS
    );
    return response.data as UserProfile;
  },
  purgeProfilePhoto: async () => {
    await axios.delete(`/profile_photo`);
    return;
  },
};

const friends = {
  fetchFollowing: (id: number) => async () => {
    const response: AxiosResponse = await axios.get(
      `/users/${id}/friends/following`
    );

    return response.data as Array<UserEntity>;
  },
  fetchFollowers: (id: number) => async () => {
    const response: AxiosResponse = await axios.get(
      `/users/${id}/friends/followers`
    );

    return response.data as Array<UserEntity>;
  },
  fetchFriends: (id: number) => async () => {
    const response: AxiosResponse = await axios.get(
      `/users/${id}/friends/mutual_friends`
    );

    return response.data as Array<UserEntity>;
  },
  addFriend: async ({
    currentUserId,
    otherPersonId,
  }: {
    currentUserId: number;
    otherPersonId: number;
  }) => {
    const data = {
      friend_id: otherPersonId,
    };

    const response: AxiosResponse = await axios.post(
      `/users/${currentUserId}/friends`,
      data
    );

    return response.data as { success: string };
  },
  removeFriend: async ({
    currentUserId,
    otherPersonId,
  }: {
    currentUserId: number;
    otherPersonId: number;
  }) => {
    const response: AxiosResponse = await axios.delete(
      `/users/${currentUserId}/friends/${otherPersonId}`
    );

    return response.data as { success: string };
  },
};

export interface FetchPreviousMessagesResponse {
  metadata: {
    last: number;
  };
  items: Array<ChatMessage>;
  private_chat_id: number;
}

const messages = {
  fetchPrevious: async ({
    chatId,
    page,
    offset,
  }: {
    chatId: number;
    page?: number;
    offset?: number;
  }) => {
    const params = new URLSearchParams({});

    if (page) {
      params.set('page', String(page));
    }

    if (offset) {
      params.set('offset', String(offset));
    }

    const response: AxiosResponse = await axios.get(
      `/private_chats/${chatId}/messages?${params}`
    );

    return response.data as FetchPreviousMessagesResponse;
  },
};

const chats = {
  fetchAll: async () => {
    const response: AxiosResponse = await axios.get(`/private_chats`);

    return response.data as Array<ChatEntity>;
  },
};

const passwordRecovery = {
  request: async (email: string) => {
    const data = {
      user: {
        email,
      },
    };

    const response: AxiosResponse = await axios.post('/password/reset', data);

    return response.data as { message: string };
  },
  reset: async (
    data: PasswordRecoveryFormData & { reset_password_token: string }
  ) => {
    const properData = {
      user: data,
    };

    const response: AxiosResponse = await axios.patch('/password', properData);

    return response.data as { message: string };
  },
};

export interface FetchAllPostsResponse {
  metadata: {
    last: number;
  };
  items: Array<PostEntity>;
}

export interface LikeResponse {
  id: number;
  postId?: number;
  likesCount: number;
  dislikesCount: number;
}

const postsBlueprint = (prefix: 'users' | 'groups') => ({
  fetchAll: async ({
    id,
    page,
    offset,
    filterData,
  }: {
    id: number;
    page: number;
    offset: number;
    filterData: PostsFilters;
  }) => {
    const params = new URLSearchParams({});

    if (page) {
      params.set('page', String(page));
    }

    if (offset) {
      params.set('offset', String(offset));
    }

    for (const key in filterData) {
      const value = filterData[key as keyof PostsFilters];
      if (value) {
        params.set(key, String(value));
      }
    }

    const response: AxiosResponse = await axios.get(
      `/${prefix}/${id}/posts?${params}`
    );

    const data = response.data;

    const metadata = data[0];
    const items = data[1];

    return {
      metadata,
      items,
    } as FetchAllPostsResponse;
  },
  fetchById: async (postId: number) => {
    const response: AxiosResponse = await axios.get(`/posts/${postId}`);

    return response.data as PostEntity;
  },
  updateById: async (
    postId: number,
    data: {
      title: string;
      content: string;
      photos: Array<File>;
    }
  ) => {
    const response: AxiosResponse = await axios.patch(
      `/posts/${postId}`,
      data,
      {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }
    );

    return response.data;
  },
  deleteById: async (postId: number) => {
    const response: AxiosResponse = await axios.delete(`/posts/${postId}`);

    return response.data as PostEntity;
  },
  likes: {
    likeById: async (postId: number) => {
      const data = {
        likeable_id: `${postId}`,
        likeable_type: 'post',
      };

      const response: AxiosResponse = await axios.post('/like', data);

      return {
        id: postId,
        likesCount: response.data.likes_count,
        dislikesCount: response.data.dislikes_count,
      } as LikeResponse;
    },
    dislikeById: async (postId: number) => {
      const data = {
        likeable_id: `${postId}`,
        likeable_type: 'post',
      };

      const response: AxiosResponse = await axios.post('/dislike', data);

      return {
        id: postId,
        likesCount: response.data.likes_count,
        dislikesCount: response.data.dislikes_count,
      } as LikeResponse;
    },
  },
});

const allPosts = {
  ...postsBlueprint('users'),
  fetchAll: async ({
    page,
    offset,
    filterData,
  }: {
    id: number;
    page: number;
    offset: number;
    filterData: PostsFilters;
  }) => {
    const params = new URLSearchParams({});

    if (page) {
      params.set('page', String(page));
    }

    if (offset) {
      params.set('offset', String(offset));
    }

    for (const key in filterData) {
      const value = filterData[key as keyof PostsFilters];
      if (value) {
        params.set(key, String(value));
      }
    }

    const response: AxiosResponse = await axios.get(`/posts?${params}`);

    const data = response.data;

    const metadata = data[0];
    const items = data[1];

    return {
      metadata,
      items,
    } as FetchAllPostsResponse;
  },
};

const profilePosts = {
  ...postsBlueprint('users'),
  add: async (data: NewPostEntity) => {
    const response: AxiosResponse = await axios.post(
      `/posts`,
      data,
      MULTIPART_FORM_HEADERS
    );

    return response.data as PostEntity;
  },
};

const groupPosts = {
  ...postsBlueprint('groups'),
  add: async (data: Required<NewPostEntity>) => {
    const response: AxiosResponse = await axios.post(
      `/posts`,
      data,
      MULTIPART_FORM_HEADERS
    );

    return response.data as PostEntity;
  },
};

const purgePostPhotosById = async (id: number) => {
  await axios.delete(`/post_photos/${id}`);
  return;
};

const comments = {
  fetchByPostId: async (postId: number) => {
    const response: AxiosResponse = await axios.get(
      `/posts/${postId}/comments`
    );

    return response.data as Array<CommentEntity>;
  },
  add: async ({ postId, data }: { postId: number; data: NewCommentEntity }) => {
    const response: AxiosResponse = await axios.post(
      `/posts/${postId}/comments`,
      data
    );

    return response.data as CommentEntity;
  },
  updateById: async ({
    postId,
    commentId,
    data,
  }: {
    postId: number;
    commentId: number;
    data: {
      text: string;
    };
  }) => {
    const response: AxiosResponse = await axios.patch(
      `/posts/${postId}/comments/${commentId}`,
      data
    );

    return response.data;
  },
  deleteById: async ({
    postId,
    commentId,
  }: {
    postId: number;
    commentId: number;
  }) => {
    const response: AxiosResponse = await axios.delete(
      `/posts/${postId}/comments/${commentId}`
    );

    return response.data;
  },
  likes: {
    likeById: async (commentId: number) => {
      const data = {
        likeable_id: `${commentId}`,
        likeable_type: 'comment',
      };

      const response: AxiosResponse = await axios.post('/like', data);

      const comment = response.data.Comment as {
        id: number;
        post_id: number;
      };

      return {
        id: comment.id,
        postId: comment.post_id,
        likesCount: response.data.likes_count,
        dislikesCount: response.data.dislikes_count,
      } as LikeResponse;
    },
    dislikeById: async (commentId: number) => {
      const data = {
        likeable_id: `${commentId}`,
        likeable_type: 'comment',
      };

      const response: AxiosResponse = await axios.post('/dislike', data);

      const comment = response.data.Comment as {
        id: number;
        post_id: number;
      };

      return {
        id: comment.id,
        postId: comment.post_id,
        likesCount: response.data.likes_count,
        dislikesCount: response.data.dislikes_count,
      } as LikeResponse;
    },
  },
};

const groups = {
  fetchAll: async () => {
    const response: AxiosResponse = await axios.get(`/groups`);
    return response.data as Array<GroupEntity>;
  },
  fetchMyGroups: async () => {
    const response: AxiosResponse = await axios.get(`/my_groups`);
    return response.data as Array<GroupEntity>;
  },
  fetchById: (id: number) => async () => {
    const response: AxiosResponse = await axios.get(`/groups/${id}`);
    return response.data;
  },
  fetchMembersById: (id: number) => async () => {
    const response: AxiosResponse = await axios.get(`/groups/${id}/members`);
    return response.data;
  },
  create: async (data: GroupFormValues) => {
    const response: AxiosResponse = await axios.post(`/groups`, data);
    return response.data as GroupEntity;
  },
  updateById: async ({ id, data }: { id: number; data: GroupFormValues }) => {
    const response: AxiosResponse = await axios.patch(
      `/groups/${id}`,
      data,
      MULTIPART_FORM_HEADERS
    );
    return response.data as GroupEntity;
  },
  joinById: async ({
    groupId,
    userId,
  }: {
    groupId: number;
    userId: number;
  }) => {
    const data = { user_id: userId };

    const response: AxiosResponse = await axios.post(
      `/groups/${groupId}/members`,
      data
    );

    return response.data[0] as UserEntity;
  },
  leaveById: async ({
    groupId,
    userId,
  }: {
    groupId: number;
    userId: number;
  }) => {
    const response: AxiosResponse = await axios.delete(
      `/groups/${groupId}/members/${userId}`
    );

    return response.data[0] as UserEntity;
  },
  deleteById: (id: number) => async () => {
    await axios.delete(`/groups/${id}`);
    return;
  },
  purgeProfilePhoto: async (id: number) => {
    await axios.delete(`/group_profile_photo/${id}`);
    return;
  },
};

const search = async (name: string) => {
  const response: AxiosResponse = await axios.get(`/search?name=${name}`);

  return response.data as Array<{
    id: number;
    type: 'user' | 'group';
    attributes: UserEntity | GroupEntity;
  }>;
};

const reposts = {
  add: async ({
    data,
    originalPostId,
  }: {
    data: NewPostEntity;
    originalPostId: number;
  }) => {
    const completeData = {
      ...data,
      reposted_post_id: originalPostId,
    };

    const response: AxiosResponse = await axios.post(
      `/posts`,
      completeData,
      MULTIPART_FORM_HEADERS
    );

    return response.data as PostEntity;
  },
};

const exportToCsv = {
  allPosts: async () => (await axios.get('/posts.csv')).data,
  userPosts: async (id: number) =>
    (await axios.get(`/users/${id}/posts.csv`)).data,
  groupPosts: async (id: number) =>
    (await axios.get(`/groups/${id}/posts.csv`)).data,
};

const API = {
  auth,
  user: {
    ...user,
    friends,
  },
  groups,
  allPosts,
  profilePosts,
  groupPosts,
  comments,
  messages,
  reposts,
  purgePostPhotosById,
  chats,
  search,
  passwordRecovery,
  exportToCsv,
  webSocket: {
    URL: import.meta.env.VITE_CABLE_URL,
  },
};

export default API;
