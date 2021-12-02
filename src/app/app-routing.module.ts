import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {DumbComponent} from './components/dumb/dumb.component';

const routes: Routes = [
  {path: '', component: DumbComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
