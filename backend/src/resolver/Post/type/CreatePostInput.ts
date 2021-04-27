import { Field, InputType } from "type-graphql";

import { Post } from "../../../entity";

@InputType()
export class CreatePostInput implements Partial<Post> {
  @Field()
  headline!: string

  @Field()
  childrenIds!: string
}
