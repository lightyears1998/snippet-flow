import { useQuery } from "@apollo/client";
import { useState } from "react";
import { QUERY_POST } from "@/operations/Post";

import { Snippet } from "../Snippet";

import styles from "./Post.module.css";
import { PostHeadline } from "./PostHeadline";

type PostProps = {
  postId: string
  level: number
}

export const Post = ({ postId, level = 0 }: PostProps) => {
  const [expand, setExpand] = useState(level < 2);
  const {
    loading, data, error
  } = useQuery(QUERY_POST, { variables: { postId } });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Oops... Something went wrong.</p>;
  }

  if (level > 5) {
    return <p><a href={`/post/${postId}`}>Open Post in a new tab.</a></p>;
  }

  const post = data.post;
  const children = post.children;

  return (<>
    <div>
      <PostHeadline headline={post.headline} level={level} expand={expand} setExpand={setExpand}></PostHeadline>
    </div>
    {
      expand && <div className={styles.children}>
        {children.map((child) => {
          if (child.__typename === "Post") {
            return <Post key={child.id} postId={child.postId} level={level + 1}></Post>;
          } else if (child.__typename === "Snippet") {
            return <Snippet key={child.id} snippetId={child.snippetId}></Snippet>;
          }
        })}
      </div>
    }
  </>);
};
