import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { MatDrawer } from '@angular/material/sidenav';
import { fromEvent, Observable, Subject } from 'rxjs';
import { filter, switchMap, takeUntil } from 'rxjs/operators';
import { Job } from '../jobs.types';
import { JobsService } from '../jobs.service';
import {EvidMediaWatcherService} from "../../../../../../@evid/services/media-watcher";

@Component({
    selector       : 'jobs-list',
    templateUrl    : './list.component.html',
    styleUrls      : ['./list.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobsListComponent implements OnInit, OnDestroy
{
    jobs$: Observable<Job[]>;
    jobsCount: number;
    jobsTableColumns: string[];
    countries: Job[];
    drawerMode: 'side' | 'over';
    searchInputControl: FormControl;
    selectedJob: Job;

    @ViewChild('matDrawer', {static: true})
    matDrawer: MatDrawer;

    private _unsubscribeAll: Subject<any>;

    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _jobsService: JobsService,
        @Inject(DOCUMENT) private _document: any,
        private _router: Router,
        private _evidMediaWatcherService: EvidMediaWatcherService
    )
    {

        this._unsubscribeAll = new Subject();
        this.jobsCount = 0;
        this.jobsTableColumns = ['name'];
        this.searchInputControl = new FormControl();
    }

    ngOnInit(): void
    {
        // Get the jobs
        this.jobs$ = this._jobsService.jobs$;
        this._jobsService.jobs$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((jobs: Job[]) => {

                this.jobsCount = jobs.length;
                this._changeDetectorRef.markForCheck();
            });

        this._jobsService.job$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((job: Job) => {

                this.selectedJob = job;
                this._changeDetectorRef.markForCheck();
            });

        this.searchInputControl.valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                switchMap((query) => {

                    if(query === ""){
                      return this._jobsService.getJobs();
                    }

                    return this._jobsService.searchJobs(query);
                })
            )
            .subscribe();

        this._evidMediaWatcherService.onMediaQueryChange$('(min-width: 1440px)')
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((state) => {

                this.drawerMode = state.matches ? 'side' : 'over';
                this._changeDetectorRef.markForCheck();
            });

        fromEvent(this._document, 'keydown')
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter<KeyboardEvent>((event) => {
                    return (event.ctrlKey === true || event.metaKey) // Ctrl or Cmd
                        && (event.key === '/'); // '/'
                })
            )
            .subscribe(() => {
                this.createJob();
            });
    }

    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    goToJob(id: number): void
    {
        let route = this._activatedRoute;
        while ( route.firstChild )
        {
            route = route.firstChild;
        }

        this._router.navigate(['../', id], {relativeTo: route});

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    onBackdropClicked(): void
    {
        let route = this._activatedRoute;
        while ( route.firstChild )
        {
            route = route.firstChild;
        }
        this._router.navigate(['../'], {relativeTo: route});
        this._changeDetectorRef.markForCheck();
    }

    createJob(): void
    {
        // Create the job
        this._jobsService.createJob().subscribe((newJob) => {

            // Go to new job
            this.goToJob(newJob.id);
        });
    }

    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }
}
