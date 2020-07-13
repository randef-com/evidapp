import { Route } from '@angular/router';
import { CanDeactivateJobsDetails } from './jobs.guards';
import { JobsJobResolver,  JobsResolver, } from './jobs.resolvers';
import { JobsComponent } from './jobs.component';
import { JobsListComponent } from './list/list.component';
import { JobsDetailsComponent } from './details/details.component';

export const jobsRoutes: Route[] = [
    {
        path     : '',
        component: JobsComponent,
        children : [
            {
                path     : '',
                component: JobsListComponent,
                resolve  : {
                    jobs    : JobsResolver,
                },
                children : [
                    {
                        path         : ':id',
                        component    : JobsDetailsComponent,
                        resolve      : {
                            job     : JobsJobResolver,
                        },
                        canDeactivate: [CanDeactivateJobsDetails]
                    }
                ]
            }
        ]
    }
];
