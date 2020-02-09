import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StarBorderComponent } from './star-border.component';

describe('StarBorderComponent', () => {
  let component: StarBorderComponent;
  let fixture: ComponentFixture<StarBorderComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StarBorderComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StarBorderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
