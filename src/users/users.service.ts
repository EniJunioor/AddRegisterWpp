import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  nome: string;
  pis: string;
  empresa: string;
  geo: boolean;
  mestre: boolean;
}

@Injectable()
export class UsersService {
  private users: User[] = [];
  private idCounter = 1;

  create(user: Omit<User, 'id'>): User {
    const newUser = { id: this.idCounter++, ...user };
    this.users.push(newUser);
    return newUser;
  }

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find(user => user.id === id);
  }
}
