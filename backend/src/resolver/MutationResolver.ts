import { Mutation, Resolver } from "type-graphql";

import { SnippetMutations, UserMutations } from "../type";

@Resolver()
export class MutationResolver {
  @Mutation()
  user(): UserMutations {
    return new UserMutations();
  }

  @Mutation()
  snippet(): SnippetMutations {
    return new SnippetMutations();
  }
}
