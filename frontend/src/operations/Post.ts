import { gql } from "@apollo/client";

export const QUERY_POST = gql`
  query Post($postId: String!) {
    post(postId: $postId) {
      headline
      children {
        __typename
        ... on Post {
          postId
        }
        ... on Snippet {
          snippetId
        }
      }
    }
}
`;
