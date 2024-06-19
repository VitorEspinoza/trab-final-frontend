import { TestBed } from '@angular/core/testing';
import { UnitsFormService } from './units-form.service';


describe('UnitsFormService', () => {
  let service: UnitsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UnitsFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
