import { OffsetBasedPageInfo } from "./PageInfo/type/OffsetBasedPageInfo";

export interface OffsetBasedConnection {
  nodes: Array<unknown>
  pageInfo: OffsetBasedPageInfo
}
