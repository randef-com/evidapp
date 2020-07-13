import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, Renderer2, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Job } from '../jobs.types';
import { JobsListComponent } from '../list/list.component';
import { JobsService } from '../jobs.service';

@Component({
    selector       : 'jobs-details',
    templateUrl    : './details.component.html',
    styleUrls      : ['./details.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobsDetailsComponent implements OnInit, OnDestroy
{
    editMode: boolean;
    job: Job;
    jobForm: FormGroup;
    jobs: Job[];

    // Private
    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any>;


    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _jobsListComponent: JobsListComponent,
        private _jobsService: JobsService,
        private _formBuilder: FormBuilder,
        private _renderer2: Renderer2,
        private _router: Router,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef
    )
    {
        // Set the private defaults
        this._unsubscribeAll = new Subject();

        // Set the defaults
        this.editMode = false;
    }

    ngOnInit(): void
    {
        // Open the drawer
        this._jobsListComponent.matDrawer.open();

        // Create the job form
        this.jobForm = this._formBuilder.group({
            id          : [''],
            name        : ['', [Validators.required]],
        });

        // Get the jobs
        this._jobsService.jobs$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((jobs: Job[]) => {
                this.jobs = jobs;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the job
        this._jobsService.job$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((job: Job) => {

                // Get the job
                this.job = job;


                // Patch values to the form
                this.jobForm.patchValue(job);

                // Setup the emails form array
                const emailFormGroups = [];

                // Toggle the edit mode off
                this.toggleEditMode(false);

                // Mark for check
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
        return this._jobsListComponent.matDrawer.close();
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

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Update the job
     */
    updateJob(): void
    {
        // Get the job object
        const job = this.jobForm.getRawValue();


        // Update the job on the server
        this._jobsService.updateJob(job).subscribe(() => {

            // Toggle the edit mode off
            this.toggleEditMode(false);
        });
    }

    deleteJob(): void
    {
        // Get the current job's id
        const id = this.job.id;

        // Get the next/previous job's id
        const currentJobIndex = this.jobs.findIndex(item => item.id === id);
        const nextJobIndex = currentJobIndex + ((currentJobIndex === (this.jobs.length - 1)) ? -1 : 1);
        const nextJobId = (this.jobs.length === 1 && this.jobs[0].id === id) ? null : this.jobs[nextJobIndex].id;

        // Delete the job
        this._jobsService.deleteJob(id)
            .subscribe((isDeleted) => {

                // Return if the job wasn't deleted...
                if ( !isDeleted )
                {
                    return;
                }

                // Get the current activated route
                let route = this._activatedRoute;
                while ( route.firstChild )
                {
                    route = route.firstChild;
                }

                // Navigate to the next job if available
                if ( nextJobId )
                {
                    this._router.navigate(['../', nextJobId], {relativeTo: route});
                }
                // Otherwise, navigate to the parent
                else
                {
                    this._router.navigate(['../'], {relativeTo: route});
                }

                // Toggle the edit mode off
                this.toggleEditMode(false);
            });

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
