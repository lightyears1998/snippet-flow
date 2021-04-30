import {
  Field, ID, InterfaceType
} from "type-graphql";
import { CreateDateColumn, UpdateDateColumn } from "typeorm";

@InterfaceType()
export abstract class Node {
  @Field(() => ID)
  id!: string

  @CreateDateColumn()
  createdAt!: Date

  @UpdateDateColumn()
  updatedAt!: Date
}
