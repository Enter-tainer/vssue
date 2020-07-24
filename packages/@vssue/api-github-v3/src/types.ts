export interface ResponseAccessToken {
  access_token: string;
}

export interface ResponseUser {
  login: string;
  html_url: string;
  avatar_url: string;
}

export interface ResponseIssue {
  number: number;
  title: string;
  body: string;
  html_url: string;
  comments: number;
}

export interface ResponseComment {
  id: number;
  user: ResponseUser;
  body: string;
  body_html: string;
  created_at: string;
  updated_at: string;
  reactions: ResponseReactionsSummary;
}

export interface ResponseReaction {
  id: number;
  content: '+1' | '-1' | 'heart' | string;
}

export interface ResponseReactionsSummary {
  '+1': number;
  '-1': number;
  heart: number;
}

export interface ResponseSearch<T> {
  total_count: number;
  items: T[];
}

export type Reactions = {
  type: 'heart' | 'like' | 'unlike';
  count: number;
  viewerHasReacted: boolean;
  users: User[];
}[];

export type User = {
  username: string;
  avatar?: string;
  homepage?: string;
};

export type Comment = {
  id: string | number;
  content: string;
  contentRaw: string;
  author: User;
  createdAt: string;
  updatedAt: string;
  reactions?: Reactions | null;
};

export type Comments = {
  count: number;
  page: number;
  perPage: number;
  data: Array<Comment>;
};
