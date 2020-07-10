import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import {EvidMessageComponent} from "./message.component";

@NgModule({
    declarations: [
        EvidMessageComponent
    ],
    imports     : [
        CommonModule,
        MatButtonModule,
        MatIconModule
    ],
    exports     : [
        EvidMessageComponent
    ]
})
export class EvidMessageModule
{
}
