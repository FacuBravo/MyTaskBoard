import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnAddTaskComponent } from './btn-add-task.component';

describe('BtnAddTaskComponent', () => {
  let component: BtnAddTaskComponent;
  let fixture: ComponentFixture<BtnAddTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BtnAddTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnAddTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
