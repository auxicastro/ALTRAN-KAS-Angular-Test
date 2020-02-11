import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RenderTemperatureComponent } from './render-temperature.component';

describe('RenderTemperatureComponent', () => {
  let component: RenderTemperatureComponent;
  let fixture: ComponentFixture<RenderTemperatureComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RenderTemperatureComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RenderTemperatureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
