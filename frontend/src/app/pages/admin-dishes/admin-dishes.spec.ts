import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminDishes } from './admin-dishes';

describe('AdminDishes', () => {
  let component: AdminDishes;
  let fixture: ComponentFixture<AdminDishes>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AdminDishes]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AdminDishes);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
