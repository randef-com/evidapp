import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector       : 'work-export',
  templateUrl    : './work-export.component.html',
  styleUrls      : ['./work-export.component.scss'],
  encapsulation  : ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class WorkExportComponent
{
  constructor()
  {
  }
}
