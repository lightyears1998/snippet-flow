/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Post
// ====================================================

export interface Post_post_children_Post {
  __typename: "Post";
  postId: string;
}

export interface Post_post_children_Snippet {
  __typename: "Snippet";
  snippetId: string;
}

export type Post_post_children = Post_post_children_Post | Post_post_children_Snippet;

export interface Post_post {
  __typename: "Post";
  headline: string;
  children: Post_post_children[];
}

export interface Post {
  post: Post_post | null;
}

export interface PostVariables {
  postId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Snippet
// ====================================================

export interface Snippet_snippet {
  __typename: "Snippet";
  language: string;
  text: string;
}

export interface Snippet {
  snippet: Snippet_snippet | null;
}

export interface SnippetVariables {
  snippetId: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL query operation: Me
// ====================================================

export interface Me_me {
  __typename: "User";
  userId: string;
  /**
   * 用户名
   */
  username: string;
  /**
   * 用户注册日期
   */
  createdAt: any;
}

export interface Me {
  /**
   * 查询用户信息；若用户未登录，将返回 `CLIENT_NOT_LOGIN` 异常。
   */
  me: Me_me;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

// ====================================================
// GraphQL mutation operation: SignIn
// ====================================================

export interface SignIn_user_signIn {
  __typename: "User";
  userId: string;
  /**
   * 用户名
   */
  username: string;
}

export interface SignIn_user {
  __typename: "UserMutations";
  /**
   * 用户登录
   */
  signIn: SignIn_user_signIn | null;
}

export interface SignIn {
  user: SignIn_user;
}

export interface SignInVariables {
  username: string;
  password: string;
}

/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

//==============================================================
// END Enums and Input Objects
//==============================================================
