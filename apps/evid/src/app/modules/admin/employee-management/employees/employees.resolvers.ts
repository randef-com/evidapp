import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import {EmployeesService} from "./employees.service";
import {IEmployee} from "../../../../../../../../libs/api-interfaces/src/lib/employee.interface";

@Injectable({
    providedIn: 'root'
})
export class EmployeesResolver implements Resolve<any>
{

    constructor(
        private _employeesService: EmployeesService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEmployee[]>
    {
        return this._employeesService.getEmployees();
    }
}

@Injectable({
    providedIn: 'root'
})
export class EmployeesEmployeeResolver implements Resolve<any>
{

    constructor(
        private _employeesService: EmployeesService,
        private _router: Router
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<IEmployee>
    {
        return this._employeesService.getEmployeeById(+route.paramMap.get('id'))
                   .pipe(
                       catchError((error) => {
                           console.error(error);
                           const parentUrl = state.url.split('/').slice(0, -1).join('/');
                           this._router.navigateByUrl(parentUrl);
                           return throwError(error);
                       })
                   );
    }
}
