import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [
  { path: '', redirectTo: 'fields', pathMatch: 'full'},
  {
    path: 'fields',
    loadChildren: () => import('./form-fields-demo/form-fields-demo.module').then(m => m.FormFieldsDemoModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
