import {
  Field, ID, ObjectType
} from "type-graphql";
import {
  Column, Entity, PrimaryGeneratedColumn
} from "typeorm";

import { Node } from "./Node";

@ObjectType({ description: "片段", implements: Node })
@Entity()
export class Snippet extends Node {
  @Field(() => ID)
  @PrimaryGeneratedColumn("increment")
  snippetId!: string

  @Field()
  @Column()
  language!: string

  @Field()
  @Column("longtext")
  text!: string
}
