import {Injectable, NotFoundException} from '@nestjs/common';


@Injectable()
export class EmploymentsExportService {
  //
  //
  // public async create(dto: CreateEmploymentDto): Promise<Employment> {
  //
  //   const user = await this.usersService.findById(dto.userId);
  //   const company = await this.companiesService.findById(dto.companyId);
  //   const job = await this.jobsService.findById(dto.jobId);
  //
  //   return this.repository.save({
  //     ...dto,
  //     user,
  //     company,
  //     job
  //   });
  //
  // }
  //
  // public async update(id: number, newValue: CreateEmploymentDto): Promise<Employment> {
  //   const user = await this.findById(id);
  //   if (!user.id) {
  //     throw new NotFoundException();
  //   }
  //   await this.repository.update(id, newValue);
  //   return await this.repository.findOne(id);
  // }
  //
  // public async delete(id: number): Promise<DeleteResult> {
  //   return await this.repository.delete(id);
  // }
}
