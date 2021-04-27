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

  async removeSnippets(snippetId: string[]): Promise<string[]> {
    console.log(snippetId);
    const snippets = await this.snippetRepository.find({ where: { snippetId: In(snippetId) } });
    const removedId = snippets.map(snippet => snippet.id);
    await this.snippetRepository.remove(snippets);
    return removedId;
  }
}
