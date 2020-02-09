import { Component, OnInit, ContentChild, AfterContentInit, ElementRef } from '@angular/core';

 /**
  * @example
  * <example-url>https://stackblitz.com/github/nayfin/tft-documentation</example-url>
  */
@Component({
  selector: 'dco-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  someValue: string;
  constructor() { }

  ngOnInit() { }
}
