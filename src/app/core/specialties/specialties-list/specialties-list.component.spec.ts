import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpecialtiesListComponent } from './specialties-list.component';

describe('SpecialtiesListComponent', () => {
  let component: SpecialtiesListComponent;
  let fixture: ComponentFixture<SpecialtiesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpecialtiesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SpecialtiesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
