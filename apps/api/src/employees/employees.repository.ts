import {EntityRepository, Repository} from "typeorm";
import {Employee} from "./employee.entity";
import {GetEmployeesFilterDto} from "./dto/get-employees-filter.dto";

@EntityRepository(Employee)
export class EmployeesRepository extends Repository<Employee> {
  async getAllFiltered(
    filterDto: GetEmployeesFilterDto
  ): Promise<Employee[]> {
    const { search } = filterDto;
    const query = this.createQueryBuilder('employee');
    query.leftJoinAndSelect("employee.employments", "employments")
    query.leftJoinAndSelect("employments.job", "job")
    query.leftJoinAndSelect("employments.company", "company")

    if (search) {
      query.andWhere('(employee.firstName LIKE :search OR' +
        ' employee.lastName LIKE :search OR employee.email LIKE :search)', { search: `%${search}%` });
    }

    return await query.getMany();
  }
}
