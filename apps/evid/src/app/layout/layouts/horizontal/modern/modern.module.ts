import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import {ModernLayoutComponent} from "./modern.component";
import {EvidNavigationModule} from "../../../../../@evid/components/navigation";
import {SearchModule} from "../../../common/search/search.module";
import {ShortcutsModule} from "../../../common/shortcuts/shortcuts.module";
import {SharedModule} from "../../../../shared/shared.module";
import {UserModule} from "../../../common/user/user.module";

@NgModule({
    declarations: [
        ModernLayoutComponent
    ],
    imports     : [
        HttpClientModule,
        RouterModule,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatMenuModule,
        EvidNavigationModule,
        SearchModule,
        ShortcutsModule,
        UserModule,
        SharedModule
    ],
    exports     : [
        ModernLayoutComponent
    ]
})
export class ModernLayoutModule
{
}
