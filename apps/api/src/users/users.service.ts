import {Injectable, HttpException, HttpStatus, NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeleteResult } from 'typeorm';
import {User} from "./user.entity";
import {CreateUserDto} from "./dto/create-user.dto";
import {GetUsersFilterDto} from "./dto/get-users-filter.dto";
import {UsersRepository} from "./users.repository";
import {EntityNotFoundError} from "typeorm/error/EntityNotFoundError";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UsersRepository)
    private readonly userRepository: UsersRepository,
  ) {}

  public async findAll(filters: GetUsersFilterDto): Promise<User[]> {
    return await this.userRepository.getAllFiltered(filters);
  }

  public async findByEmail(userEmail: string): Promise<User | null> {
    return await this.userRepository.findOne({ email: userEmail });
  }

  public async findById(id: number): Promise<User> {
    try{
      return await this.userRepository.findOneOrFail(id);
    } catch (ex) {
      if (ex instanceof EntityNotFoundError) {
        throw new NotFoundException(`User with ID: ${id} doesn't exist.`);
      }
      throw ex;
    }
  }

  public async create(user: CreateUserDto): Promise<User> {
    return await this.userRepository.save(user);
  }

  public async update(id: number, dto: CreateUserDto): Promise<User> {
    const user = await this.findById(id);
    const updated = Object.assign(user, dto);
    return await this.userRepository.save(updated);
  }


  public async delete(id: number): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }

  public async register(userDto: CreateUserDto): Promise<User> {
    const { email } = userDto;
    let user = await this.userRepository.findOne({ where: { email } });
    if (user) {
      throw new HttpException(
        'User already exists',
        HttpStatus.BAD_REQUEST,
      );
    }
    user = await this.userRepository.create(userDto);
    return await this.userRepository.save(user);
  }
}
