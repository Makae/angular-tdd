import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SmartComponent} from './smart/smart.component';
import {DumbComponent} from './dumb/dumb.component';

const routes: Routes = [
  {path: '', component: DumbComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
