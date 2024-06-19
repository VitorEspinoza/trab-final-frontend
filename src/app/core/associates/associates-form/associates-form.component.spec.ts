import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatesFormComponent } from './associates-form.component';

describe('AssociatesFormComponent', () => {
  let component: AssociatesFormComponent;
  let fixture: ComponentFixture<AssociatesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociatesFormComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AssociatesFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
