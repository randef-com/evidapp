import { NgModule } from '@angular/core';
import { EvidScrollbarDirective } from './scrollbar.directive';

@NgModule({
    declarations: [
        EvidScrollbarDirective
    ],
    exports     : [
        EvidScrollbarDirective
    ]
})
export class EvidScrollbarModule
{
}
