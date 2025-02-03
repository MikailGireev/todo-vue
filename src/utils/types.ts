export interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export interface User {
  token: string;
  user: {
    id: number;
    username: string;
    password: string;
  };
}
