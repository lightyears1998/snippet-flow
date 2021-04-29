import {
  FieldResolver, Root, Resolver, Query, Arg, ID, Int, ResolverInterface
} from "type-graphql";
import { Inject } from "typedi";

import { Post, PostChildrenUnion } from "../../entity";
import { NodeService, PostService } from "../../service";
import { PostsConnection } from "../../type";

@Resolver(() => Post)
export class PostResolver implements ResolverInterface<Post> {
  @Inject()
  private nodeService!: NodeService

  @Inject()
  private postService!: PostService

  @FieldResolver(() => ID)
  id(@Root() post: Post): string {
    return this.nodeService.getIdForNode(Post, post.postId);
  }

  @FieldResolver(() => PostChildrenUnion)
  async children(@Root() post: Post): Promise<Array<typeof PostChildrenUnion>> {
    const childrenIds = JSON.parse(post.childrenIds || "[]") as string[];
    console.log(childrenIds);
    return [];
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("postId") postId: string): Promise<Post | undefined> {
    return this.postService.findPostByPostId(postId);
  }

  @Query(() => PostsConnection, { description: "列出组合。" })
  async posts(
    @Arg("skip", () => Int, { nullable: true, defaultValue: 0 }) skip: number,
    @Arg("take", () => Int, { nullable: true, defaultValue: 20 }) take: number
  ): Promise<PostsConnection> {
    const { posts, total } = await this.postService.listPosts(skip, take);

    return {
      nodes: posts,
      pageInfo: {
        skip, take, total
      }
    };
  }
}
