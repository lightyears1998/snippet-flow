import {
  Resolver, Arg, FieldResolver, Authorized, ID
} from "type-graphql";
import { Inject } from "typedi";

import { Snippet } from "../../entity";
import { SnippetService } from "../../service";
import { SnippetMutations } from "../../type";

import { CreateSnippetInput, UpdateSnippetInput } from "./type";

@Resolver(() => SnippetMutations)
export class SnippetMutationsResolver {
  @Inject()
  private readonly snippetService!: SnippetService

  @Authorized()
  @FieldResolver(() => Snippet, { description: "创建代码片段" })
  async create(
    @Arg("input") { language, text }: CreateSnippetInput
  ): Promise<Snippet> {
    return this.snippetService.createSnippet(language, text);
  }

  @Authorized()
  @FieldResolver(() => Snippet, { description: "修改代码片段" })
  async update(
    @Arg("input") input: UpdateSnippetInput
  ): Promise<Snippet> {
    const { snippetId } = input;
    const snippet = await this.snippetService.loadSnippet(snippetId);
    Object.assign(snippet, input);
    return this.snippetService.updateSnippet(snippet);
  }

  @Authorized()
  @FieldResolver(() => [ID], { description: "删除代码片段" })
  async delete(
    @Arg("snippetId", () => [ID]) id: string[]
  ): Promise<string[]> {
    return this.snippetService.removeSnippets(id);
  }
}
