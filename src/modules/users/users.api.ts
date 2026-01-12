import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities';
import { QueryBuilder } from '../utils';

@Injectable()
export class UsersApi {
  constructor(
    @InjectRepository(User)
    private readonly repository: Repository<User>,
  ) {}

  public async findOne(filters: object = {}): Promise<User | null> {
    return new QueryBuilder<User>(this.repository, 'user')
      .withFilters(filters)
      .findOne();
  }

  public async findOneWithRelations(
    filters: object = {},
    relations: string[] = [],
  ): Promise<User | null> {
    return new QueryBuilder<User>(this.repository, 'user')
      .withFilters(filters)
      .withRelations(relations)
      .findOne();
  }

  public async findOneOrFail(filters: object = {}): Promise<User> {
    return new QueryBuilder<User>(this.repository, 'user')
      .withFilters(filters)
      .findOneOrFail();
  }

  public async findMany(filters: object = {}): Promise<User[]> {
    return new QueryBuilder<User>(this.repository, 'user')
      .withFilters(filters)
      .getMany();
  }

  public async create(params: Partial<User>): Promise<User> {
    const user = this.repository.create(params);
    return await this.repository.save(user);
  }

  public async update(user: User, params: Partial<User>): Promise<User> {
    Object.assign(user, params);
    return await this.repository.save(user);
  }

  public async delete(id: string): Promise<void> {
    await this.repository.softDelete(id);
  }
}
