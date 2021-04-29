import {
  Query, Resolver, Ctx, Arg, Int, Authorized, FieldResolver, Root, ID
} from "type-graphql";
import { Inject } from "typedi";

import { User } from "../../entity";
import { AppUserContext } from "../../context";
import { UsersConnection } from "../../type";
import { NodeService } from "../../service/NodeService";
import { UserService } from "../../service";

@Resolver(() => User)
export class UserResolver {
  @Inject()
  private readonly nodeService!: NodeService

  @Inject()
  private readonly userService!: UserService

  @FieldResolver(() => ID)
  id(@Root() user: User): string {
    return this.nodeService.getIdForNode(User, user.userId);
  }

  @Authorized()
  @Query(() => User, { description: "查询用户信息；若用户未登录，将返回 `CLIENT_NOT_LOGIN` 异常。" })
  async me(@Ctx() ctx: AppUserContext): Promise<User | undefined> {
    return ctx.getSessionUser();
  }

  @Query(() => Boolean)
  async usernameAvailability(@Arg("username") username: string): Promise<boolean> {
    return (await this.userService.userRepository.findByUsername(username)) !== undefined;
  }

  @Query(() => User, { nullable: true })
  async user(@Arg("userId") userId: string): Promise<User | undefined> {
    return this.userService.findUserByUserId(userId);
  }

  @Authorized()
  @Query(() => UsersConnection, {
    complexity: ({ args, childComplexity }) => {
      return 1 + childComplexity * (args.take ?? 0);
    },
    description: "查询用户列表"
  })
  async users(
    @Arg("skip", () => Int, { nullable: true, defaultValue: 0 }) skip: number,
    @Arg("take", () => Int, { nullable: true, defaultValue: 20 }) take: number
  ): Promise<UsersConnection> {
    const { users, total } = await this.userService.listUsers(skip, take);

    return {
      nodes: users,
      pageInfo: {
        skip, take, total
      }
    };
  }
}
