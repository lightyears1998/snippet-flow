import { gql } from "@apollo/client";

export const QUERY_ME = gql`query Me {
  me {
    userId
    username
  	createdAt
  }
}`;

export const SIGN_IN = gql`mutation SignIn($username: String!, $password: String!) {
  user {
    signIn(username: $username, password: $password) {
      userId
      username
    }
  }
}`;
