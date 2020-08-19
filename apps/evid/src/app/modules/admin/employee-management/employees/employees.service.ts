import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import {IEmployee} from "../../../../../../../../libs/api-interfaces/src/lib/employee.interface";

@Injectable({
    providedIn: 'root'
})
export class EmployeesService
{
    private _employee: BehaviorSubject<IEmployee | null>;
    private _employees: BehaviorSubject<IEmployee[] | null>;

    constructor(
        private _httpClient: HttpClient
    )
    {
        this._employee = new BehaviorSubject(null);
        this._employees = new BehaviorSubject(null);
    }

    get employee$(): Observable<IEmployee>
    {
        return this._employee.asObservable();
    }

    get employees$(): Observable<IEmployee[]>
    {
        return this._employees.asObservable();
    }

    getEmployees(): Observable<IEmployee[]>
    {
        return this._httpClient.get<IEmployee[]>('api/employees').pipe(
            tap((employees) => {
                this._employees.next(employees);
            })
        );
    }

    searchEmployees(query: string): Observable<IEmployee[] | null>
    {
        return this._httpClient.get<IEmployee[] | null>('api/employees', {
            params: {search: query}
        }).pipe(
            tap((employees) => {
                this._employees.next(employees);
            })
        );
    }


    getEmployeeById(id: number): Observable<IEmployee>
    {
        return this._employees.pipe(
            take(1),
            map((employees) => {

                const employee = employees.find(item => item.id === id) || null;
                this._employee.next(employee);
                return employee;
            }),
            switchMap((contact) => {

                if ( !contact )
                {
                    return throwError('Could not found employee with id of ' + id + '!');
                }

                return of(contact);
            })
        );
    }

    createEmployee(): Observable<IEmployee>
    {
        return this.employees$.pipe(
            take(1),
            switchMap((employees) => this._httpClient.put<IEmployee>('api/apps/contacts/contact', {}).pipe(
                map((newEmployee) => {

                    this._employees.next([newEmployee, ...employees]);
                    return newEmployee;
                })
            ))
        );
    }

    updateEmployee(id: number, employee: IEmployee): Observable<IEmployee>
    {
        return this.employees$.pipe(
            take(1),
            switchMap(employees => this._httpClient.patch<IEmployee>(`api/employee/${id}`, {
                employee
            }).pipe(
                map((updatedEmployee) => {
                    const index = employees.findIndex(item => item.id === id);
                    employees[index] = updatedEmployee;
                    this._employees.next(employees);
                    return updatedEmployee;
                }),
                switchMap(updatedEmployee => this.employee$.pipe(
                    take(1),
                    filter(item => item && item.id === id),
                    tap(() => {

                        this._employee.next(updatedEmployee);
                        return updatedEmployee;
                    })
                ))
            ))
        );
    }

    deleteEmployee(id: number): Observable<boolean>
    {
        return this.employees$.pipe(
            take(1),
            switchMap(employees => this._httpClient.delete(`api/employees/${id}`).pipe(
                map((isDeleted: boolean) => {

                    const index = employees.findIndex(item => item.id === id);
                    employees.splice(index, 1);

                    this._employees.next(employees);
                    return isDeleted;
                })
            ))
        );
    }

    uploadAvatar(id: number, avatar: File): Observable<IEmployee>
    {
        return this.employees$.pipe(
            take(1),
            switchMap(employees => this._httpClient.post<IEmployee>(`api/employees/${id}/avatar`, {
                avatar
            }, {
                headers: {
                    'Content-Type': avatar.type
                }
            }).pipe(
                map((updatedEmployee: IEmployee) => {

                    const index = employees.findIndex(item => item.id === id);

                    employees[index] = updatedEmployee;
                    this._employees.next(employees);

                    return updatedEmployee;
                }),
                switchMap(updatedEmployee => this.employee$.pipe(
                    take(1),
                    filter(item => item && item.id === id),
                    tap(() => {

                        this._employee.next(updatedEmployee);
                        return updatedEmployee;
                    })
                ))
            ))
        );
    }
}
