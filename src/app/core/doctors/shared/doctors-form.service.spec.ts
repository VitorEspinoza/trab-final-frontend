import { TestBed } from '@angular/core/testing';

import { DoctorsFormService } from './doctors-form.service';

describe('DoctorsFormService', () => {
  let service: DoctorsFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DoctorsFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
