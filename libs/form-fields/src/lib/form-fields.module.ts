import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { InputComponent } from './input/input.component';
import { BordersModule } from '@demo-co/borders';

@NgModule({
  imports: [
    CommonModule,
    BordersModule
  ],
  declarations: [InputComponent],
  exports: [InputComponent]
})
export class FormFieldsModule {}
