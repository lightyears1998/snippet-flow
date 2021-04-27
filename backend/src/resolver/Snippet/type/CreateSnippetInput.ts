import { Field, InputType } from "type-graphql";

import { Snippet } from "../../../entity";

@InputType()
export class CreateSnippetInput implements Partial<Snippet> {
  @Field()
  language!: string

  @Field()
  text!: string
}
