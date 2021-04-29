import { Mutation, Resolver } from "type-graphql";

import {
  PostMutations, SnippetMutations, UserMutations
} from ".";

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

  @Mutation()
  post(): PostMutations {
    return new PostMutations();
  }
}
