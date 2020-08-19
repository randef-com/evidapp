import { Route } from '@angular/router';
import {EmployeesComponent} from "./employees.component";
import {EmployeesListComponent} from "./list/list.component";
import {EmployeesEmployeeResolver, EmployeesResolver} from "./employees.resolvers";
import {EmployeesDetailsComponent} from "./details/details.component";
import {CanDeactivateEmployeesDetails} from "./employees.guards";


export const employeesRoutes: Route[] = [
    {
        path     : '',
        component: EmployeesComponent,
        children : [
            {
                path     : '',
                component: EmployeesListComponent,
                resolve  : {
                    tasks    : EmployeesResolver,
                },
                children : [
                    {
                        path         : ':id',
                        component    : EmployeesDetailsComponent,
                        resolve      : {
                            task     : EmployeesEmployeeResolver
                        },
                        canDeactivate: [CanDeactivateEmployeesDetails]
                    }
                ]
            }
        ]
    }
];
