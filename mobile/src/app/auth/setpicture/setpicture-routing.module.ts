import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SetpicturePage } from './setpicture.page';

const routes: Routes = [
  {
    path: '',
    component: SetpicturePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SetpicturePageRoutingModule {}
