import { Field, InputType } from "type-graphql";

import { Post } from "../../../entity";

@InputType()
export class UpdatePostInput implements Partial<Post> {
  @Field()
  postId!: string

  @Field()
  headline!: string

  @Field()
  childrenIds!: string
}
