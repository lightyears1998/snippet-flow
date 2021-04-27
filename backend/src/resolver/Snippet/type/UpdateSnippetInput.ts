import { Field, InputType } from "type-graphql";

import { Snippet } from "../../../entity";

@InputType()
export class UpdateSnippetInput implements Partial<Snippet> {
  @Field()
  snippetId!: string

  @Field()
  language!: string

  @Field()
  text!: string
}
