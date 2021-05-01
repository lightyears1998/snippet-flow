import {
  ConfigKey, getConfig, saveConfig
} from "./config";

export class User {
  userId: string
  username: string
}

export function getUser(): User {
  return getConfig(ConfigKey.USER) as User;
}

export function setUser(user: User): void {
  saveConfig(ConfigKey.USER, user);
}

export function logout(): void {
  saveConfig(ConfigKey.USER, null);
  window.location.reload();
}
