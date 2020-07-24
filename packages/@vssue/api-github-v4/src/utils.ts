import { VssueAPI } from 'vssue';

import {
  ResponseUser,
  ResponseIssue,
  ResponseComment,
  ResponseReaction,
  Reactions,
  Comment,
} from './types';

export function normalizeUser(user: ResponseUser): VssueAPI.User {
  // workaround for deleted user
  // @see https://github.community/t5/GitHub-API-Development-and/Keep-deleted-issue-author-as-ghost/td-p/15456
  if (user === null) {
    return {
      username: 'ghost',
      avatar: 'https://avatars3.githubusercontent.com/u/10137?v=4',
      homepage: 'https://github.com/ghost',
    };
  }
  return {
    username: user.login,
    avatar: user.avatarUrl,
    homepage: user.url,
  };
}

export function normalizeIssue(issue: ResponseIssue): VssueAPI.Issue {
  return {
    id: issue.number,
    title: issue.title,
    content: issue.body,
    link: issue.url,
  };
}

export function normalizeReactions(reactions: ResponseReaction[]): Reactions {
  const like = reactions.find(item => item.content === 'THUMBS_UP');
  const unlike = reactions.find(item => item.content === 'THUMBS_DOWN');
  const heart = reactions.find(item => item.content === 'HEART');
  return [
    {
      type: 'like',
      count: like!.users.totalCount,
      users: like!.users.nodes.map(normalizeUser),
      viewerHasReacted: like!.viewerHasReacted,
    },
    {
      type: 'unlike',
      count: unlike!.users.totalCount,
      users: unlike!.users.nodes.map(normalizeUser),
      viewerHasReacted: unlike!.viewerHasReacted,
    },
    {
      type: 'heart',
      count: heart!.users.totalCount,
      users: heart!.users.nodes.map(normalizeUser),
      viewerHasReacted: heart!.viewerHasReacted,
    },
  ];
}

export function normalizeComment(comment: ResponseComment): Comment {
  return {
    id: comment.id,
    content: comment.bodyHTML,
    contentRaw: comment.body,
    author: normalizeUser(comment.author),
    createdAt: comment.createdAt,
    updatedAt: comment.updatedAt,
    reactions: normalizeReactions(comment.reactionGroups),
  };
}

export function mapReactionName(reaction: 'heart' | 'like' | 'unlike'): string {
  if (reaction === 'like') return 'THUMBS_UP';
  if (reaction === 'unlike') return 'THUMBS_DOWN';
  if (reaction === 'heart') return 'HEART';
  return reaction;
}

export default {
  normalizeUser,
  normalizeIssue,
  normalizeComment,
  normalizeReactions,
  mapReactionName,
};
