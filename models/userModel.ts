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
}

export const userModel = (() => {
  const db: User[] = [];
  let currentId = 1;

  function createUser(username: string, password: string, email: string): User {
    const newUser = new User(currentId++, username, password, email);
    db.push(newUser);
    return newUser;
  }

  function getUserById(id: number): User | null {
    return db.find((user) => user.id === id) ?? null;
  }

  return { createUser, getUserById };
})();
