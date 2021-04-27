import {
  Arg, ID, Query, Resolver
} from "type-graphql";
import { Inject } from "typedi";

import { Node } from "../entity/Node";
import { NodeService } from "../service/NodeService";

@Resolver()
export class NodeResolver {
  @Inject()
  nodeService!: NodeService

  @Query(() => Node, { nullable: true })
  async node(
    @Arg("id", () => ID) id: string
  ): Promise<Node | undefined> {
    return this.nodeService.getNodeById(id);
  }
}
