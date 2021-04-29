import Router, { useRouter } from "next/router";

const PostPage = () => {
  const router = useRouter()
  let { postId } = router.query as unknown as { postId: number }
  postId = Number(postId)

  if (!postId) {
    Router.push('/')
  }

  return <p>{postId}</p>
}

export default PostPage;
