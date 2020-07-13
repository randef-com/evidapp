import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { JobsService } from './jobs.service';
import { Job } from './jobs.types';

@Injectable({
    providedIn: 'root'
})
export class JobsResolver implements Resolve<any>
{

    constructor(
        private _jobsService: JobsService
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Job[]>
    {
        return this._jobsService.getJobs();
    }
}

@Injectable({
    providedIn: 'root'
})
export class JobsJobResolver implements Resolve<any>
{

    constructor(
        private _jobsService: JobsService,
        private _router: Router
    ) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Job>
    {
        return this._jobsService.getJobById(+route.paramMap.get('id'))
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

