import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VisitantesPanelComponent } from './visitantes-panel.component';

describe('VisitantesPanelComponent', () => {
  let component: VisitantesPanelComponent;
  let fixture: ComponentFixture<VisitantesPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VisitantesPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VisitantesPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
