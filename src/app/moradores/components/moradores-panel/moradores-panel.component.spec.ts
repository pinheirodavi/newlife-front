import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MoradoresPanelComponent } from './moradores-panel.component';

describe('MoradoresPanelComponent', () => {
  let component: MoradoresPanelComponent;
  let fixture: ComponentFixture<MoradoresPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MoradoresPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MoradoresPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
