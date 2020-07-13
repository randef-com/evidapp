import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Job } from './jobs.types';

@Injectable({
    providedIn: 'root'
})
export class JobsService
{

    private _job: BehaviorSubject<Job | null>;
    private _jobs: BehaviorSubject<Job[] | null>;

    constructor(
        private _httpClient: HttpClient
    )
    {
        this._job = new BehaviorSubject(null);
        this._jobs = new BehaviorSubject(null);
    }

    get job$(): Observable<Job>
    {
        return this._job.asObservable();
    }

    get jobs$(): Observable<Job[]>
    {
        return this._jobs.asObservable();
    }

    getJobs(sortField: string = 'name', sortDirection: 'asc' | 'desc' | '' = 'asc'): Observable<Job[]>
    {
        return this._httpClient.get<Job[]>('api/jobs', {
            params: {
                sortField,
                sortDirection
            }
        }).pipe(
            tap((jobs) => {
                this._jobs.next(jobs);
            })
        );
    }

    searchJobs(query: string): Observable<Job[] | null>
    {
        return this._httpClient.get<Job[] | null>('api/jobs', {
            params: {
              search: query
            }
        }).pipe(
            tap((jobs) => {
                this._jobs.next(jobs);
            })
        );
    }

    getJobById(id: number): Observable<Job>
    {
        return this._jobs.pipe(
            take(1),
            map((jobs) => {

                const job = jobs.find(item => item.id === id) || null;
                this._job.next(job);
                return job;
            }),
            switchMap((job) => {

                if ( !job )
                {
                    return throwError('Could not find job with id of ' + id + '!');
                }

                return of(job);
            })
        );
    }

    createJob(): Observable<Job>
    {
        return this.jobs$.pipe(
            take(1),
            switchMap((jobs) => this._httpClient.post<Job>('api/jobs', {}).pipe(
                map((newJob) => {

                    this._jobs.next([newJob, ...jobs]);
                    return newJob;
                })
            ))
        );
    }

    updateJob(job: Job): Observable<Job>
    {
        return this.jobs$.pipe(
            take(1),
            switchMap(jobs => this._httpClient.put<Job>('api/jobs/' + job.id, job).pipe(
                map((updatedJob) => {

                    const index = jobs.findIndex(item => item.id === job.id);
                    jobs[index] = updatedJob;
                    this._jobs.next(jobs);
                    return updatedJob;
                }),
                switchMap(updatedJob => this.job$.pipe(
                    take(1),
                    filter(item => item && item.id === job.id),
                    tap(() => {
                        this._job.next(updatedJob);
                        return updatedJob;
                    })
                ))
            ))
        );
    }

    deleteJob(id: number): Observable<boolean>
    {
        return this.jobs$.pipe(
            take(1),
            switchMap(jobs => this._httpClient.delete('api/jobs/' + id).pipe(
                map((isDeleted: boolean) => {

                    const index = jobs.findIndex(item => item.id === id);
                    jobs.splice(index, 1);
                    this._jobs.next(jobs);
                    return isDeleted;
                })
            ))
        );
    }
}
