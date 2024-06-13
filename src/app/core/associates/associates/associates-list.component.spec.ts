import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AssociatesListComponent } from './associates-list.component';

describe('AssociatesListComponent', () => {
  let component: AssociatesListComponent;
  let fixture: ComponentFixture<AssociatesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AssociatesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AssociatesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
