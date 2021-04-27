import { ApolloError } from "apollo-server-errors";
import { Inject, Service } from "typedi";

import { Node } from "../entity";
import { base64Decode, base64Encode } from "../utils";

import { UserService } from "./UserService";

@Service()
export class NodeService {
  @Inject()
  private readonly userService!: UserService

  getIdForNode<T extends Node>(entityClass: new () => T, entityId: string): string {
    return base64Encode(`${entityClass.name}_${entityId}`);
  }

  async getNodeById(id: string): Promise<Node | undefined> {
    const decodedId = base64Decode(id);
    const seperatorIndex = decodedId.indexOf("_");
    const [nodeType, nodeId] = [decodedId.substr(0, seperatorIndex), decodedId.substr(seperatorIndex + 1)];

    switch (nodeType) {
      case "User": {
        return this.userService.findUserByUserId(nodeId);
      }

      default: throw new ApolloError("未实现相应类型的 getNodeById 方法。", "GET_NODE_BY_ID_UNIMPLEMENTED");
    }
  }
}
