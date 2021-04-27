import {
  FieldResolver, Root, Resolver, Query, Arg, ID
} from "type-graphql";
import { Inject } from "typedi";

import { Snippet } from "../../entity";
import { NodeService, SnippetService } from "../../service";

@Resolver(() => Snippet)
export class SnippetResolver {
  @Inject()
  private nodeService!: NodeService

  @Inject()
  private snippetService!: SnippetService

  @FieldResolver(() => ID)
  id(@Root() snippet: Snippet): string {
    return this.nodeService.getIdForNode(Snippet, snippet.id);
  }

  @Query(() => Snippet, { nullable: true })
  snippet(@Arg("snippetId") snippetId: string): Promise<Snippet | undefined> {
    return this.snippetService.findSnippetBySnippetId(snippetId);
  }
}
