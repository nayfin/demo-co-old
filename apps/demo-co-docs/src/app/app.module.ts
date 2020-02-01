import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormFieldsModule } from '@demo-co/form-fields';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from '@tft/core';
import { UiImportsModule } from '@tft/ui-imports';
import { AppRoutingModule } from './app.routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    FormFieldsModule,
    BrowserAnimationsModule,
    CoreModule,
    UiImportsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
