import { useQuery } from "@apollo/client";
import gql from "graphql-tag";

import styles from "./Snippet.module.css";

const SNIPPET_QUERY = gql`
  query ($snippetId: String!){
    snippet(snippetId: $snippetId) {
      language
      text
    }
  }
`;

type SnippetProps = {
  snippetId: string
}

export const Snippet = ({ snippetId }: SnippetProps) => {
  const {
    loading, data, error
  } = useQuery(SNIPPET_QUERY, { variables: { snippetId: snippetId } });

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
