import {
  createUnionType, Field, ObjectType
} from "type-graphql";
import {
  Column, Entity, PrimaryGeneratedColumn
} from "typeorm";

import { Node } from "./Node";
import { Snippet } from "./Snippet";

export const PostChildrenUnion = createUnionType({ name: "PostChildren", types: () => [Post, Snippet] as const });

@ObjectType({ description: "组合", implements: Node })
@Entity()
export class Post extends Node {
  @Field()
  @PrimaryGeneratedColumn("increment")
  postId!: string

  @Field()
  @Column()
  headline!: string

  @Column("text", { default: "[]" })
  childrenIdsJSONString!: string

  @Field(() => [PostChildrenUnion])
  children?: Array<typeof PostChildrenUnion>
}
