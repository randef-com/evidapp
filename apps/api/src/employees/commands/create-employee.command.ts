import { Console, Command } from 'nestjs-console';
import {EmployeesService} from "../employees.service";

@Console()
export class CreateEmployeeCommand {

  constructor(private readonly employeesService: EmployeesService) {
  }

  @Command({
    command: 'create:employee',
    description: 'Creates employee',
  })
  async createUser(): Promise<void> {

    const inquirer = require('inquirer');
    await inquirer
      .prompt([
        {
          type: 'input',
          name: 'firstName',
          message: "Employee's first name",
        },
        {
          type: 'input',
          name: 'lastName',
          message: "Employee's last name",
        },
        {
          type: 'input',
          name: 'email',
          message: "Employee's email",
        },
        {
          type: 'password',
          message: 'Enter a masked password',
          name: 'password',
          mask: '*',
        },
        {
          type: 'checkbox',
          message: 'Select roles',
          name: 'roles',
          choices: [
            {
              name: 'employee',
            },
            {
              name: 'admin',
            },
        ]},

      ])
      .then(async (answers) =>
      {
        await this.employeesService.create(answers).then(res => {
          console.log(`Employee has been created!`)
          console.log(res);
        })
      });
  }
}
