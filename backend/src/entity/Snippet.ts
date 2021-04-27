import { ObjectType } from "type-graphql";
import {
  Column, Entity, PrimaryGeneratedColumn
} from "typeorm";

import { Node } from "./Node";

@ObjectType({ description: "片段", implements: Node })
@Entity()
export class Snippet extends Node {
  @PrimaryGeneratedColumn("increment")
  snippetId!: string

  @Column()
  language!: string

  @Column()
  text!: string
}
