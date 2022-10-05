import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculosPanelComponent } from './veiculos-panel.component';

describe('VeiculosPanelComponent', () => {
  let component: VeiculosPanelComponent;
  let fixture: ComponentFixture<VeiculosPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeiculosPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeiculosPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
