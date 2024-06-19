import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtiesSelectComponent } from './specialties-select.component';

describe('SpecialtiesSelectComponent', () => {
  let component: SpecialtiesSelectComponent;
  let fixture: ComponentFixture<SpecialtiesSelectComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialtiesSelectComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecialtiesSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
