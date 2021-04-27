import { Field, ObjectType } from "type-graphql";
import {
  Column, Entity, PrimaryGeneratedColumn
} from "typeorm";

import { Node } from "./Node";
import { Snippet } from "./Snippet";

@ObjectType({ description: "组合", implements: Node })
@Entity()
export class Post extends Node {
  @Field()
  @PrimaryGeneratedColumn("increment")
  postId!: string

  @Field()
  @Column()
  headline!: string

  @Column("simple-json")
  childrenIds!: string

  @Field(() => [Post, Snippet])
  children?: Array<Post | Snippet>
}
