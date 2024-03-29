import {
  Resolver, Arg, FieldResolver, Authorized, ID
} from "type-graphql";
import { Inject } from "typedi";

import { Post } from "../../entity";
import { PostService } from "../../service";

import {
  CreatePostInput, PostMutations, UpdatePostInput
} from "./type";

@Resolver(() => PostMutations)
export class PostMutationsResolver {
  @Inject()
  private readonly postService!: PostService

  @Authorized()
  @FieldResolver(() => Post, { description: "创建组合" })
  async create(
    @Arg("input") { headline, childrenIds }: CreatePostInput
  ): Promise<Post> {
    return this.postService.createPost(headline, JSON.stringify(childrenIds));
  }

  @Authorized()
  @FieldResolver(() => Post, { description: "修改组合" })
  async update(
    @Arg("input") input: UpdatePostInput
  ): Promise<Post> {
    const { postId } = input;
    const post = await this.postService.loadPost(postId);
    post.headline = input.headline;
    post.childrenIdsJSONString = JSON.stringify(input.childrenIds);
    return this.postService.updatePost(post);
  }

  @Authorized()
  @FieldResolver(() => [ID], { description: "删除组合" })
  async delete(
    @Arg("postId", () => [ID]) id: string[]
  ): Promise<string[]> {
    return this.postService.removePosts(id);
  }
}
