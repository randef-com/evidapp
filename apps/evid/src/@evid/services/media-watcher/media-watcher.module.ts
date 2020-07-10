import { NgModule } from '@angular/core';
import { EvidMediaWatcherService } from './media-watcher.service';

@NgModule({
    providers: [
        EvidMediaWatcherService
    ]
})
export class EvidMediaWatcherModule
{
    /**
     * Constructor
     *
     * @param {EvidMediaWatcherService} _evidMediaWatcherService
     */
    constructor(
        private _evidMediaWatcherService: EvidMediaWatcherService
    )
    {
    }
}
