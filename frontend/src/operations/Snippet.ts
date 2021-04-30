import { gql } from "@apollo/client";

export const QUERY_SNIPPET = gql`
  query Snippet($snippetId: String!){
    snippet(snippetId: $snippetId) {
      language
      text
    }
  }
`;
