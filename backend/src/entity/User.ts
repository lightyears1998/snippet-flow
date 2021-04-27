import {
  Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, Unique, UpdateDateColumn
} from "typeorm";
import {
  Field, ID, ObjectType
} from "type-graphql";

@ObjectType({ description: "用户" })
@Entity()
@Unique("UNIQUE_username", ["username"])
export class User {
  @Field(() => ID)
  @PrimaryGeneratedColumn("increment")
  userId!: string

  @Field({ description: "用户名" })
  @Column()
  username!: string

  @Column()
  passwordHash!: string

  @Field(() => Date, { description: "用户注册日期" })
  @CreateDateColumn()
  createdAt!: Date

  @Field(() => Date, { description: "用户资料更新日期" })
  @UpdateDateColumn()
  updatedAt!: Date
}
