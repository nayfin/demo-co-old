import { async, TestBed } from '@angular/core/testing';
import { FormFieldsModule } from './form-fields.module';

describe('FormFieldsModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [FormFieldsModule]
    }).compileComponents();
  }));

  it('should create', () => {
    expect(FormFieldsModule).toBeDefined();
  });
});
