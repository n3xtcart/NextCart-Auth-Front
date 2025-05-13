import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuShowUsersComponent } from './main-menu-show-users.component';

describe('MainMenuShowUsersComponent', () => {
  let component: MainMenuShowUsersComponent;
  let fixture: ComponentFixture<MainMenuShowUsersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainMenuShowUsersComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainMenuShowUsersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
