import { NgModule } from '@angular/core';
import { EvidAutogrowDirective } from './autogrow.directive';

@NgModule({
    declarations: [
        EvidAutogrowDirective
    ],
    exports     : [
        EvidAutogrowDirective
    ]
})
export class EvidAutogrowModule
{
}
