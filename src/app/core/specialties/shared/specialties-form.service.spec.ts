import { TestBed } from '@angular/core/testing';

import { SpecialtiesFormService } from './specialties-form.service';

describe('SpecialtiesFormService', () => {
  let service: SpecialtiesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SpecialtiesFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
