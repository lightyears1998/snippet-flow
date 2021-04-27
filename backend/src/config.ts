import path from "path";

import config from "config";

const getConfig = <T>(configPath: string, defaultValue?: T): T => {
  try {
    return config.get<T>(configPath);
  } catch (err) {
    if (typeof defaultValue !== "undefined") {
      return defaultValue;
    }
    throw err;
  }
};

// APP
export const APP_VAR_DIR = path.join(process.cwd(), "./var");

export const APP_SECRET = getConfig<string | null>("app.secret", null);
export const APP_HOST = getConfig("app.host", "localhost");
export const APP_PORT = getConfig("app.port", 4000);
export const APP_PROXY = getConfig("app.proxy", false);
export const APP_SESSION_KEY = getConfig("app.session.key", "app");
export const APP_AUTHORIZATION_CODE = getConfig("app.authenticationCode", "15f2b25e-cef1-4e85-8191-61c20e9bdadf");

// 复杂度限制
export const QUERY_COMPLEXITY_LIMIT = getConfig("query.complexity-limit", 65535);

// Redis
export const REDIS_HOST = getConfig("redis.host", "localhost");
export const REDIS_PORT = getConfig("redis.port", 6379);
export const REDIS_PASSWORD = getConfig("redis.password", "");

// 数据库
export const MYSQL_HOST = getConfig("mysql.host", "localhost");
export const MYSQL_PORT = getConfig("mysql.port", 5432);
export const MYSQL_USERNAME = getConfig("mysql.username", "user");
export const MYSQL_PASSWORD = getConfig("mysql.password", "pa$$w0rd");
export const MYSQL_DATABASE = getConfig("mysql.database", "database");
