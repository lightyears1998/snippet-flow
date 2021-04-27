import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import bcrypt from "bcrypt";

import { User } from "../entity";
import { UserRepository } from "../repo";

@Service()
export class UserService {
  @InjectRepository()
  readonly userRepository!: UserRepository

  async findUserByUserId(userId: string): Promise<User | undefined> {
    return this.userRepository.findOne({ userId });
  }

  async listUsers(skip: number, take: number): Promise<{ users: User[], total: number }> {
    const users = await this.userRepository.find({ skip, take });
    const total = await this.userRepository.count();
    return { users, total };
  }

  async createUser(username: string, password: string): Promise<User> {
    const user = this.userRepository.create({ username, passwordHash: await this.hashPassword(password) });
    return this.userRepository.save(user);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, await bcrypt.genSalt());
  }

  async matchUserPassword(user: User, password: string): Promise<boolean> {
    return bcrypt.compare(password, user.passwordHash);
  }

  async updateUserPassword(user: User, password: string): Promise<void> {
    const passwordHash = await bcrypt.hash(password, await bcrypt.genSalt());
    user.passwordHash = passwordHash;
    await this.userRepository.save(user);
  }
}
