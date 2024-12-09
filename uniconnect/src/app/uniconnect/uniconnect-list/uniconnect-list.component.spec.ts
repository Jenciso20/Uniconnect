import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniconnectListComponent } from './uniconnect-list.component';

describe('UniconnectListComponent', () => {
  let component: UniconnectListComponent;
  let fixture: ComponentFixture<UniconnectListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UniconnectListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniconnectListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
