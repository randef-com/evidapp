import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvidCardComponent } from './card.component';

@NgModule({
    declarations: [
        EvidCardComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        EvidCardComponent
    ]
})
export class EvidCardModule
{
}
