import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuShowRolesComponent } from './main-menu-show-roles.component';

describe('MainMenuShowRolesComponent', () => {
  let component: MainMenuShowRolesComponent;
  let fixture: ComponentFixture<MainMenuShowRolesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainMenuShowRolesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainMenuShowRolesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
