import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import {EvidHorizontalNavigationBasicItemComponent} from "./horizontal/components/basic/basic.component";
import {EvidHorizontalNavigationBranchItemComponent} from "./horizontal/components/branch/branch.component";
import {EvidHorizontalNavigationDividerItemComponent} from "./horizontal/components/divider/divider.component";
import {EvidHorizontalNavigationSpacerItemComponent} from "./horizontal/components/spacer/spacer.component";
import {EvidHorizontalNavigationComponent} from "./horizontal/horizontal.component";
import {EvidVerticalNavigationAsideItemComponent} from "./vertical/components/aside/aside.component";
import {EvidVerticalNavigationBasicItemComponent} from "./vertical/components/basic/basic.component";
import {EvidVerticalNavigationCollapsableItemComponent} from "./vertical/components/collapsable/collapsable.component";
import {EvidVerticalNavigationDividerItemComponent} from "./vertical/components/divider/divider.component";
import {EvidVerticalNavigationGroupItemComponent} from "./vertical/components/group/group.component";
import {EvidVerticalNavigationSpacerItemComponent} from "./vertical/components/spacer/spacer.component";
import {EvidVerticalNavigationComponent} from "./vertical/vertical.component";
import {EvidScrollbarModule} from "../../directives/scrollbar";


@NgModule({
    declarations: [
        EvidHorizontalNavigationBasicItemComponent,
        EvidHorizontalNavigationBranchItemComponent,
        EvidHorizontalNavigationDividerItemComponent,
        EvidHorizontalNavigationSpacerItemComponent,
        EvidHorizontalNavigationComponent,
        EvidVerticalNavigationAsideItemComponent,
        EvidVerticalNavigationBasicItemComponent,
        EvidVerticalNavigationCollapsableItemComponent,
        EvidVerticalNavigationDividerItemComponent,
        EvidVerticalNavigationGroupItemComponent,
        EvidVerticalNavigationSpacerItemComponent,
        EvidVerticalNavigationComponent
    ],
    imports     : [
        CommonModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        MatTooltipModule,
        EvidScrollbarModule
    ],
    exports     : [
        EvidHorizontalNavigationComponent,
        EvidVerticalNavigationComponent
    ]
})
export class EvidNavigationModule
{
}
