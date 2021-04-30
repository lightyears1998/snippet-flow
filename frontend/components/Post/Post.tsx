import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

import { Snippet } from "../Snippet";

import styles from "./Post.module.css";

const POST_QUERY = gql`
  query ($postId: String!) {
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

type PostProps = {
  postId: string
  level: number
}

export const Post = ({ postId, level = 0 }: PostProps) => {
  const {
    loading, data, error
  } = useQuery(POST_QUERY, { variables: { postId } });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Oops... Something went wrong.</p>;
  }

  if (level > 5) {
    return <p><a href={`/post/${postId}`}>Open post in new tab.</a></p>;
  }

  const post = data.post;
  const children = post.children;

  return (<>
    <p className={styles.headline}>{post.headline}</p>
    <div className={styles.children}>
      {children.map((child) => {
        if (child.__typename === "Post") {
          return <Post key={child.id} postId={child.postId} level={level + 1}></Post>;
        } else if (child.__typename === "Snippet") {
          return <Snippet key={child.id} snippetId={child.snippetId}></Snippet>;
        }
      })}
    </div>
  </>);
};
