import { TestBed } from '@angular/core/testing';

import { AssociatesFormService } from './associates-form.service';

describe('AssociatesFormService', () => {
  let service: AssociatesFormService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AssociatesFormService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
