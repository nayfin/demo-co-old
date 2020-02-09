import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StarBorderComponent } from './star-border/star-border.component';

@NgModule({
  imports: [CommonModule],
  declarations: [StarBorderComponent],
  exports: [StarBorderComponent]
})
export class BordersModule {}
