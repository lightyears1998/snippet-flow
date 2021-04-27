import { Service } from "typedi";
import { InjectRepository } from "typeorm-typedi-extensions";
import bcrypt from "bcrypt";

import { User } from "../entity";
import { UserRepository } from "../repo";

@Service()
export class UserService {
  @InjectRepository()
  private readonly userRepository!: UserRepository

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
