import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MAT_DATE_FORMATS, MatRippleModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDividerModule } from '@angular/material/divider';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import * as moment from 'moment';
import {EvidAutogrowModule} from "../../../../../@evid/directives/autogrow";
import {EvidFindByKeyPipeModule} from "../../../../../@evid/pipes/find-by-key";
import {SharedModule} from "../../../../shared/shared.module";
import {WorkExportComponent} from "./work-export.component";
import {CalendarComponent} from "./calendar/calendar.component";
import {employeesRoutes} from "./employees.routing";

@NgModule({
  declarations: [
    EmployeesComponent,
    EmployeesListComponent,
    EmployeesDetailsComponent,
  ],
  imports     : [
    RouterModule.forChild(employeesRoutes),
    MatButtonModule,
    MatCheckboxModule,
    MatDatepickerModule,
    MatDividerModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatMenuModule,
    MatMomentDateModule,
    MatProgressBarModule,
    MatRadioModule,
    MatRippleModule,
    MatSelectModule,
    MatSidenavModule,
    MatTableModule,
    MatTooltipModule,
    EvidAutogrowModule,
    EvidFindByKeyPipeModule,
    SharedModule
  ],
  providers   : [
    {
      provide : MAT_DATE_FORMATS,
      useValue: {
        parse  : {
          dateInput: moment.ISO_8601
        },
        display: {
          dateInput         : 'LL',
          monthYearLabel    : 'MMM YYYY',
          dateA11yLabel     : 'LL',
          monthYearA11yLabel: 'MMMM YYYY'
        }
      }
    }
  ]
})
export class EmployeesModule
{
}
