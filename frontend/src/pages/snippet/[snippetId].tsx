import { useRouter } from "next/router";
import { Snippet } from "@/components/Snippet";

const SnippetPage = () => {
  const router = useRouter();
  const { snippetId } = router.query as { snippetId: string };

  return (<>
    <p>{snippetId}</p>
    <Snippet snippetId={snippetId}></Snippet>
  </>);
};

export default SnippetPage;
