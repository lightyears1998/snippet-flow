import { useQuery } from "@apollo/client";

import { QUERY_SNIPPET } from "../../operations/Snippet";

import styles from "./Snippet.module.css";

type SnippetProps = {
  snippetId: string
}

export const Snippet = ({ snippetId }: SnippetProps) => {
  const {
    loading, data, error
  } = useQuery(QUERY_SNIPPET, { variables: { snippetId: snippetId } });

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Oops... Something went wrong.</p>;
  }

  const snippet = data.snippet;

  return (<>
    <p className={styles.language}>{snippet.language}</p>
    <code>{snippet.text}</code>
  </>);
};
