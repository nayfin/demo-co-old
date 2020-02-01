import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormFieldsDemoRoutingModule } from './form-fields-demo-routing.module';
import { InputDemoComponent } from './input-demo/input-demo.component';


@NgModule({
  declarations: [InputDemoComponent],
  imports: [
    CommonModule,
    FormFieldsDemoRoutingModule
  ]
})
export class FormFieldsDemoModule { }
