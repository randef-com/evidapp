import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'employees',
    templateUrl    : './employees.component.html',
    styleUrls      : ['./employees.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesComponent
{
    constructor()
    {
    }
}
