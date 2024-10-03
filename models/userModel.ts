import jwt from 'jsonwebtoken';
import { env } from '../config/env';

export type UserWithoutSensitiveInfo = {
  id: number;
  username: string;
  email: string;
};

class User {
  id: number;
  username: string;
  password: string;
  email: string;

  constructor(id: number, username: string, password: string, email: string) {
    this.id = id;
    this.username = username;
    this.password = password;
    this.email = email;
  }

  withoutSensitiveInfo(): UserWithoutSensitiveInfo {
    return {
      id: this.id,
      username: this.username,
      email: this.email,
    };
  }
}

/**
 * Module Pattern (Singleton) to keep track of the same db: User[] object
 */
export const userModel = (() => {
  const db: User[] = [];
  let currentId = 1;

  function createUser(
    username: string,
    password: string,
    email: string
  ): UserWithoutSensitiveInfo {
    const newUser = new User(currentId++, username, password, email);
    db.push(newUser);
    return newUser.withoutSensitiveInfo();
  }

  function getUserById(id: number): UserWithoutSensitiveInfo | null {
    return db.find((user) => user.id === id)?.withoutSensitiveInfo() ?? null;
  }

  function loginUser(
    username: string,
    password: string
  ): { success: true; token: string } | { success: false; token: null } {
    const userToLogin = db.find((user) => user.username === username);

    if (!userToLogin || userToLogin.password !== password) {
      return { success: false, token: null };
    }

    return {
      success: true,
      token: jwt.sign(
        {
          id: userToLogin.id,
          email: userToLogin.email,
          username: userToLogin.username,
        },
        env.JWT_SECRET
      ),
    };
  }

  return { createUser, getUserById, loginUser };
})();
