import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainMenuShowGroupsComponent } from './main-menu-show-groups.component';

describe('MainMenuShowGroupsComponent', () => {
  let component: MainMenuShowGroupsComponent;
  let fixture: ComponentFixture<MainMenuShowGroupsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MainMenuShowGroupsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainMenuShowGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
