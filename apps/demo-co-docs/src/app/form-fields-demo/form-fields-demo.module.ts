import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormFieldsDemoRoutingModule } from './form-fields-demo-routing.module';
import { InputDemoComponent } from './input-demo/input-demo.component';
import { FormFieldsModule } from '@demo-co/form-fields';


@NgModule({
  declarations: [InputDemoComponent],
  imports: [
    CommonModule,
    FormFieldsModule,
    FormFieldsDemoRoutingModule
  ]
})
export class FormFieldsDemoModule { }
