import { useRouter } from "next/router";
import { Post } from "@/components/Post";

const PostPage = () => {
  const router = useRouter();
  const { postId } = router.query as { postId: string };

  return <Post postId={postId} level={0}></Post>;
};

export default PostPage;
