import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InputDemoComponent } from './input-demo/input-demo.component';


const routes: Routes = [
  {
    path: '', redirectTo: 'input', pathMatch: 'full'
  },
  {
    path: 'input', component: InputDemoComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormFieldsDemoRoutingModule { }
