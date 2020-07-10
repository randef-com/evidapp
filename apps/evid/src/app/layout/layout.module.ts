import { NgModule } from '@angular/core';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTooltipModule } from '@angular/material/tooltip';
import {EmptyLayoutModule} from "./layouts/empty/empty.module";
import {CenteredLayoutModule} from "./layouts/horizontal/centered/centered.module";
import {EnterpriseLayoutModule} from "./layouts/horizontal/enterprise/enterprise.module";
import {MaterialLayoutModule} from "./layouts/horizontal/material/material.module";
import {ModernLayoutModule} from "./layouts/horizontal/modern/modern.module";
import {BasicLayoutModule} from "./layouts/vertical/basic/basic.module";
import {ClassicLayoutModule} from "./layouts/vertical/classic/classic.module";
import {ClassyLayoutModule} from "./layouts/vertical/classy/classy.module";
import {CompactLayoutModule} from "./layouts/vertical/compact/compact.module";
import {DenseLayoutModule} from "./layouts/vertical/dense/dense.module";
import {FuturisticLayoutModule} from "./layouts/vertical/futuristic/futuristic.module";
import {ThinLayoutModule} from "./layouts/vertical/thin/thin.module";
import {LayoutComponent} from "./layout.component";
import {EvidDrawerModule} from "../../@evid/components/drawer";
import {SharedModule} from "../shared/shared.module";


const modules = [
    // Empty
    EmptyLayoutModule,

    // Horizontal navigation
    CenteredLayoutModule,
    EnterpriseLayoutModule,
    MaterialLayoutModule,
    ModernLayoutModule,

    // Vertical navigation
    BasicLayoutModule,
    ClassicLayoutModule,
    ClassyLayoutModule,
    CompactLayoutModule,
    DenseLayoutModule,
    FuturisticLayoutModule,
    ThinLayoutModule
];

@NgModule({
    declarations: [
        LayoutComponent
    ],
    imports     : [
        MatCheckboxModule,
        MatIconModule,
        MatRadioModule,
        MatSlideToggleModule,
        MatTooltipModule,
        EvidDrawerModule,
        SharedModule,
        ...modules
    ],
    exports     : [
        ...modules
    ]
})
export class LayoutModule
{
}
