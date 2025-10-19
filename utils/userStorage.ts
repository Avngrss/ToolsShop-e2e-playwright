// utils/userStorage.ts
import * as fs from "fs";
import * as path from "path";
import { User } from "../types/User";

const USER_DATA_PATH = path.resolve(__dirname, "../test-data/user.json");

export const saveUser = (user: Pick<User, "email" | "password">): void => {
  fs.writeFileSync(USER_DATA_PATH, JSON.stringify(user, null, 2), "utf-8");
};

export const loadUser = (): Pick<User, "email" | "password"> => {
  if (!fs.existsSync(USER_DATA_PATH)) {
    throw new Error(
      `No user data found at ${USER_DATA_PATH}. Run registration test first.`
    );
  }
  const data = fs.readFileSync(USER_DATA_PATH, "utf-8");
  return JSON.parse(data);
};
