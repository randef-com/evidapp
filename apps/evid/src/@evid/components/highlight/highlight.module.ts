import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {EvidHighlightComponent} from "./highlight.component";

@NgModule({
    declarations   : [
        EvidHighlightComponent
    ],
    imports        : [
        CommonModule
    ],
    exports        : [
        EvidHighlightComponent
    ],
    entryComponents: [
        EvidHighlightComponent
    ]
})
export class EvidHighlightModule
{
}
