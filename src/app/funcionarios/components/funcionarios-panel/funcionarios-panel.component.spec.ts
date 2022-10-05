import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FuncionariosPanelComponent } from './funcionarios-panel.component';

describe('FuncionariosPanelComponent', () => {
  let component: FuncionariosPanelComponent;
  let fixture: ComponentFixture<FuncionariosPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FuncionariosPanelComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FuncionariosPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
