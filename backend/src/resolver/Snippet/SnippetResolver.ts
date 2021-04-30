import {
  FieldResolver, Root, Resolver, Query, Arg, ID, Int
} from "type-graphql";
import { Inject } from "typedi";

import { Snippet } from "../../entity";
import { NodeService, SnippetService } from "../../service";

import { SnippetsConnection } from "./type";

@Resolver(() => Snippet)
export class SnippetResolver {
  @Inject()
  private nodeService!: NodeService

  @Inject()
  private snippetService!: SnippetService

  @FieldResolver(() => ID)
  id(@Root() snippet: Snippet): string {
    return this.nodeService.getIdForNode(Snippet, snippet.snippetId);
  }

  @Query(() => Snippet, { nullable: true })
  snippet(@Arg("snippetId") snippetId: string): Promise<Snippet | undefined> {
    return this.snippetService.findSnippetBySnippetId(snippetId);
  }

  @Query(() => SnippetsConnection, { nullable: true })
  async snippets(
    @Arg("skip", () => Int, { nullable: true, defaultValue: 0 }) skip: number,
    @Arg("take", () => Int, { nullable: true, defaultValue: 20 }) take: number
  ): Promise<SnippetsConnection> {
    const { snippets, total } = await this.snippetService.listSnippets(skip, take);

    return {
      nodes: snippets,
      pageInfo: {
        skip, take, total
      }
    };
  }
}
