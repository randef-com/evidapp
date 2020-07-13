import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
    selector       : 'jobs',
    templateUrl    : './jobs.component.html',
    styleUrls      : ['./jobs.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class JobsComponent
{
    /**
     * Constructor
     */
    constructor()
    {
    }
}
