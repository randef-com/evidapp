import {EntityRepository, Repository} from "typeorm";
import {User} from "./user.entity";
import {GetUsersFilterDto} from "./dto/get-users-filter.dto";

@EntityRepository(User)
export class UsersRepository extends Repository<User> {
  async getAllFiltered(
    filterDto: GetUsersFilterDto
  ): Promise<User[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('company');

    if (search) {
      query.andWhere('(user.firstName LIKE :search OR' +
        ' user.lastName LIKE :search OR user.email LIKE :search)', { search: `%${search}%` });
    }

    return await query.getMany();
  }
}
