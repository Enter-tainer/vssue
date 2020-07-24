import { VssueAPI } from 'vssue';

import {
  ResponseUser,
  ResponseIssue,
  ResponseComment,
  ResponseReactionsSummary,
  Reactions,
  Comment,
} from './types';

export function normalizeUser(user: ResponseUser): VssueAPI.User {
  return {
    username: user.login,
    avatar: user.avatar_url,
    homepage: user.html_url,
  };
}

export function normalizeIssue(issue: ResponseIssue): VssueAPI.Issue {
  return {
    id: issue.number,
    title: issue.title,
    content: issue.body,
    link: issue.html_url,
  };
}

export function normalizeReactions(
  reactions: ResponseReactionsSummary
): Reactions {
  return [
    {
      type: 'like',
      count: reactions['+1'],
      viewerHasReacted: false,
      users: [],
    },
    {
      type: 'unlike',
      count: reactions['-1'],
      viewerHasReacted: false,
      users: [],
    },
    {
      type: 'heart',
      count: reactions.heart,
      viewerHasReacted: false,
      users: [],
    },
  ];
}

export function normalizeComment(comment: ResponseComment): Comment {
  return {
    id: comment.id,
    content: comment.body_html,
    contentRaw: comment.body,
    author: normalizeUser(comment.user),
    createdAt: comment.created_at,
    updatedAt: comment.updated_at,
    reactions: normalizeReactions(comment.reactions),
  };
}

export function mapReactionName(reaction: keyof VssueAPI.Reactions): string {
  if (reaction === 'like') return '+1';
  if (reaction === 'unlike') return '-1';
  return reaction;
}

export default {
  normalizeUser,
  normalizeIssue,
  normalizeComment,
  normalizeReactions,
  mapReactionName,
};
