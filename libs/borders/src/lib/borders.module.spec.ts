import { async, TestBed } from '@angular/core/testing';
import { BordersModule } from './borders.module';

describe('BordersModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [BordersModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(BordersModule).toBeDefined();
  });
});
