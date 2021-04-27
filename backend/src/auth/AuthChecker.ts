import { ApolloError } from "apollo-server";
import { AuthChecker } from "type-graphql";

import { AppUserContext } from "../context";

export const authChecker: AuthChecker<AppUserContext> = async ({ context: ctx }, roles) => {
  const user = ctx.getSessionUser();

  if (!user) {
    throw new ApolloError("用户未登录或登录已过期。", "CLIENT_NOT_LOGIN");
  }

  if (roles.length === 0) {
    return true;
  }

  throw new ApolloError("鉴权中间件异常。", "MALFUNCTION_AUTH_MIDDLEWARE");
};
