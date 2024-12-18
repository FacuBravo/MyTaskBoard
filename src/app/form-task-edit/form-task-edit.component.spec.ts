import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormTaskEditComponent } from './form-task-edit.component';

describe('FormTaskEditComponent', () => {
  let component: FormTaskEditComponent;
  let fixture: ComponentFixture<FormTaskEditComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormTaskEditComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormTaskEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
