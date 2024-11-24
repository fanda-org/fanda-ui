import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FandaUiComponent } from './fanda-ui.component';

describe('FandaUiComponent', () => {
  let component: FandaUiComponent;
  let fixture: ComponentFixture<FandaUiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FandaUiComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FandaUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
