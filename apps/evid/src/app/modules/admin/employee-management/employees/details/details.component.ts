import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import {IEmployee} from "../../../../../../../../../libs/api-interfaces/src/lib/employee.interface";
import {EmployeesService} from "../employees.service";
import {EmployeesListComponent} from "../list/list.component";

@Component({
    selector       : 'employees-details',
    templateUrl    : './details.component.html',
    styleUrls      : ['./details.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class EmployeesDetailsComponent implements OnInit, OnDestroy
{
    editMode: boolean;
    employee: IEmployee;
    employeeForm: FormGroup;
    employees: IEmployee[];

    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any>;

    @ViewChild('avatar')
    private _avatar: ElementRef;

    @ViewChild('avatarFileInput')
    private _avatarFileInput: ElementRef;

    @ViewChild('tagsPanel')
    private _tagsPanel: TemplateRef<any>;

    @ViewChild('tagsPanelOrigin')
    private _tagsPanelOrigin: ElementRef;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _employeesListComponent: EmployeesListComponent,
        private _employeesService: EmployeesService,
        private _formBuilder: FormBuilder,
        private _renderer2: Renderer2,
        private _router: Router,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef
    )
    {
        this._unsubscribeAll = new Subject();
        this.editMode = false;
    }

    ngOnInit(): void
    {
        this._employeesListComponent.matDrawer.open();

        this.employeeForm = this._formBuilder.group({
            avatar      : [null],
            firstName   : ['', [Validators.required]],
            lastName    : ['', [Validators.required]],
            email: ['', [Validators.email, Validators.required]],
            employments      : this._formBuilder.array([]),

        });

        this._employeesService.employees$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((employees: IEmployee[]) => {
                this.employees = employees;
                this._changeDetectorRef.markForCheck();
            });

        this._employeesService.employee$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((employee: IEmployee) => {

                this.employee = employee;

                (this.employeeForm.get('emails') as FormArray).clear();
                (this.employeeForm.get('phoneNumbers') as FormArray).clear();

                console.log(employee);
                console.log(this.employeeForm)
                this.employeeForm.patchValue(employee);

                const employmentFormGroups = [];

                if ( employee.employments.length > 0 )
                {
                    employee.employments.forEach((employment) => {

                        employmentFormGroups.push(
                            this._formBuilder.group({
                                workload: [employment.workload],
                                companyName: [employment.company.name]
                            })
                        );
                    });
                }
                else
                {
                    employmentFormGroups.push(
                        this._formBuilder.group({
                            workload: [''],
                            companyName: [''],
                        })
                    );
                }

                employmentFormGroups.forEach((employmentFormGroup) => {
                    (this.employeeForm.get('emails') as FormArray).push(employmentFormGroup);
                });


                this.toggleEditMode(false);
                this._changeDetectorRef.markForCheck();
            });

    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

        // Dispose the overlays if they are still on the DOM
        if ( this._tagsPanelOverlayRef )
        {
            this._tagsPanelOverlayRef.dispose();
        }
    }


    closeDrawer(): Promise<MatDrawerToggleResult>
    {
        return this._employeesListComponent.matDrawer.close();
    }

    toggleEditMode(editMode: boolean | null = null): void
    {
        if ( editMode === null )
        {
            this.editMode = !this.editMode;
        }
        else
        {
            this.editMode = editMode;
        }

        this._changeDetectorRef.markForCheck();
    }

    updateEmployee(): void
    {
        const employee = this.employeeForm.getRawValue();
        this._employeesService.updateEmployee(employee.id, employee).subscribe(() => {

            this.toggleEditMode(false);
        });
    }

    deleteEmployee(): void
    {
        const id = this.employee.id;

        const currentEmployeeIndex = this.employees.findIndex(item => item.id === id);
        const nextEmployeeIndex = currentEmployeeIndex + ((currentEmployeeIndex === (this.employees.length - 1)) ? -1 : 1);
        const nextEmployeeId = (this.employees.length === 1 && this.employees[0].id === id) ? null : this.employees[nextEmployeeIndex].id;

        this._employeesService.deleteEmployee(id)
            .subscribe((isDeleted) => {

                if ( !isDeleted )
                {
                    return;
                }

                let route = this._activatedRoute;
                while ( route.firstChild )
                {
                    route = route.firstChild;
                }

                if ( nextEmployeeId )
                {
                    this._router.navigate(['../', nextEmployeeId], {relativeTo: route});
                }
                else
                {
                    this._router.navigate(['../'], {relativeTo: route});
                }

                this.toggleEditMode(false);
            });

        this._changeDetectorRef.markForCheck();
    }


    uploadAvatar(fileList: FileList): void
    {
        if ( !fileList.length )
        {
            return;
        }

        const allowedTypes = ['image/jpeg', 'image/png'];
        const file = fileList[0];

        if ( !allowedTypes.includes(file.type) )
        {
            return;
        }

        this._employeesService.uploadAvatar(this.employee.id, file).subscribe();
    }

    removeAvatar(): void
    {
        const avatarFormControl = this.employeeForm.get('avatar');

        avatarFormControl.setValue(null);

        this._avatarFileInput.nativeElement.value = null;

        this.employee.avatar = null;
    }


    addEmploymentGroup(): void
    {
        const emailFormGroup = this._formBuilder.group({
            workload: [''],
            companyName: [''],
        });

        (this.employeeForm.get('employments') as FormArray).push(emailFormGroup);
        this._changeDetectorRef.markForCheck();
    }


    removeEmploymentGroup(index: number): void
    {
        const employmentsFormArray = this.employeeForm.get('employments') as FormArray;
        employmentsFormArray.removeAt(index);
        this._changeDetectorRef.markForCheck();
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
