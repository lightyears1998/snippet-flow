import { Service } from "typedi";
import { In, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Snippet } from "../entity";

@Service()
export class SnippetService {
  @InjectRepository(Snippet)
  readonly snippetRepository!: Repository<Snippet>

  async findSnippetBySnippetId(snippetId: string): Promise<Snippet | undefined> {
    return this.snippetRepository.findOne({ where: { snippetId } });
  }

  async listSnippets(skip: number, take: number): Promise<{snippets: Snippet[], total: number}> {
    const snippets = await this.snippetRepository.find({ skip, take });
    const total = await this.snippetRepository.count();
    return { snippets, total };
  }

  async loadSnippet(snippetId: string): Promise<Snippet> {
    return this.snippetRepository.findOneOrFail({ where: { snippetId } });
  }

  async createSnippet(language: string, text: string): Promise<Snippet> {
    const snippet = this.snippetRepository.create({ language, text });
    return this.snippetRepository.save(snippet);
  }

  async updateSnippet(snippet: Snippet): Promise<Snippet> {
    return this.snippetRepository.save(snippet);
  }

  async removeSnippets(snippetIds: string[]): Promise<string[]> {
    const snippets = await this.snippetRepository.find({ where: { snippetId: In(snippetIds) } });
    const removedIds = snippets.map(snippet => snippet.id);
    await this.snippetRepository.remove(snippets);
    return removedIds;
  }
}
