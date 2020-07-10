import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EvidDrawerComponent } from './drawer.component';

@NgModule({
    declarations: [
        EvidDrawerComponent
    ],
    imports     : [
        CommonModule
    ],
    exports     : [
        EvidDrawerComponent
    ]
})
export class EvidDrawerModule
{
}
