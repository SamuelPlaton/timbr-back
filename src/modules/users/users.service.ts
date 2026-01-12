import { Injectable } from '@nestjs/common';
import { UsersApi } from './users.api';
import { User } from '../../entities';

@Injectable()
export class UsersService {
  constructor(private usersApi: UsersApi) {}

  async findOne(filters: object = {}): Promise<User | null> {
    return this.usersApi.findOne(filters);
  }

  async findOneWithRelations(
    filters: object = {},
    relations: string[] = [],
  ): Promise<User | null> {
    return this.usersApi.findOneWithRelations(filters, relations);
  }

  async findOneOrFail(filters: object = {}): Promise<User> {
    return this.usersApi.findOneOrFail(filters);
  }

  async findMany(filters: object = {}): Promise<User[]> {
    return this.usersApi.findMany(filters);
  }

  async create(params: Partial<User>): Promise<User> {
    return this.usersApi.create(params);
  }

  async update(user: User, params: Partial<User>): Promise<User> {
    return this.usersApi.update(user, params);
  }

  async delete(id: string): Promise<void> {
    return this.usersApi.delete(id);
  }
}
