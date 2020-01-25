import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormFieldsModule } from '@demo-co/form-fields';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormFieldsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
