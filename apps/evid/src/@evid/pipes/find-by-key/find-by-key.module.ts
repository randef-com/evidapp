import { NgModule } from '@angular/core';
import { EvidFindByKeyPipe } from './find-by-key.pipe';

@NgModule({
    declarations: [
        EvidFindByKeyPipe
    ],
    exports     : [
        EvidFindByKeyPipe
    ]
})
export class EvidFindByKeyPipeModule
{
}
