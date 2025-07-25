import { ComponentFixture, TestBed } from '@angular/core/testing';

import  ModalGroupComponent  from './modal-group.component';

describe('ModalGroupComponent', () => {
  let component: ModalGroupComponent;
  let fixture: ComponentFixture<ModalGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ModalGroupComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
