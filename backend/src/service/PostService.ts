import { Service } from "typedi";
import { In, Repository } from "typeorm";
import { InjectRepository } from "typeorm-typedi-extensions";

import { Post } from "../entity";

@Service()
export class PostService {
  @InjectRepository(Post)
  readonly postRepository!: Repository<Post>

  async findPostByPostId(postId: string): Promise<Post | undefined> {
    return this.postRepository.findOne({ where: { postId } });
  }

  async listPosts(skip: number, take: number): Promise<{ posts: Post[], total: number }> {
    const posts = await this.postRepository.find({ skip, take });
    const total = await this.postRepository.count();
    return { posts, total };
  }

  async loadPost(postId: string): Promise<Post> {
    return this.postRepository.findOneOrFail({ where: { postId } });
  }

  async createPost(headline: string, childrenIdsJSONString: string): Promise<Post> {
    const post = this.postRepository.create({ headline, childrenIdsJSONString });
    return this.postRepository.save(post);
  }

  async updatePost(post: Post): Promise<Post> {
    return this.postRepository.save(post);
  }

  async removePosts(postIds: string[]): Promise<string[]> {
    const posts = await this.postRepository.find({ where: { postId: In(postIds) } });
    const removedIds = posts.map(post => post.postId);
    await this.postRepository.remove(posts);
    return removedIds;
  }
}
