import {createParamDecorator, ExecutionContext} from "@nestjs/common";
import {Employee} from "../../employees/employee.entity";

export const GetUser = createParamDecorator((data, ctx: ExecutionContext): Employee => {
  const req = ctx.switchToHttp().getRequest();
  return req.user;
});
