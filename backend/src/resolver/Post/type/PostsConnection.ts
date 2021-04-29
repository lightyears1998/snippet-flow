import { Field, ObjectType } from "type-graphql";

import { Post } from "../../../entity";
import { OffsetBasedPageInfo } from "../../PageInfo/type";
import { OffsetBasedConnection } from "../../Connection";

@ObjectType()
export class PostsConnection implements OffsetBasedConnection {
  @Field(() => [Post])
  nodes!: Post[]

  @Field(() => OffsetBasedPageInfo)
  pageInfo!: OffsetBasedPageInfo
}
