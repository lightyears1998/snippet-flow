import {
  FieldResolver, Root, Resolver, Query, Arg, ID
} from "type-graphql";
import { Inject } from "typedi";

import { Post } from "../../entity";
import { NodeService, PostService } from "../../service";

@Resolver(() => Post)
export class PostResolver {
  @Inject()
  private nodeService!: NodeService

  @Inject()
  private postService!: PostService

  @FieldResolver(() => ID)
  id(@Root() post: Post): string {
    return this.nodeService.getIdForNode(Post, post.postId);
  }

  @Query(() => Post, { nullable: true })
  post(@Arg("postId") postId: string): Promise<Post | undefined> {
    return this.postService.findPostByPostId(postId);
  }
}
