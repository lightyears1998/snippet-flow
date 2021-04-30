import { Field, ObjectType } from "type-graphql";

import { Snippet } from "../../../entity";
import { OffsetBasedPageInfo } from "../../PageInfo/type";
import { OffsetBasedConnection } from "../../Connection";

@ObjectType()
export class SnippetsConnection implements OffsetBasedConnection {
  @Field(() => [Snippet])
  nodes!: Snippet[]

  @Field(() => OffsetBasedPageInfo)
  pageInfo!: OffsetBasedPageInfo
}
