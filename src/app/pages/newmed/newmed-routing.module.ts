import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { NewmedPage } from './newmed.page';

const routes: Routes = [
  {
    path: '',
    component: NewmedPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class NewmedPageRoutingModule {}
