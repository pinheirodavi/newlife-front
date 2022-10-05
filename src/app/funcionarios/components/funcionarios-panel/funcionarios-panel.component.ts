import { OkDialogComponent } from './../../../shared/components/ok-dialog/ok-dialog.component';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { debounceTime } from 'rxjs';

import { ConfirmationDialogComponent } from './../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { FuncionariosService } from './../../service/funcionarios.service';

@Component({
  selector: 'app-funcionarios-panel',
  templateUrl: './funcionarios-panel.component.html',
  styleUrls: ['./funcionarios-panel.component.scss']
})
export class FuncionariosPanelComponent implements OnInit {

  constructor(private service: FuncionariosService,
    private form: FormBuilder,
    public dialog: MatDialog
  ) { }


  filterControl = new FormControl('');
  totalLength!: number;
  pageSize = 5;
  page = 0;

  dataTable = new MatTableDataSource();
  displayedColumns = ['numApto', 'nome', 'rg', 'cpf', 'tel1', 'tel2', 'obs', 'action'];

  funcionariosForm = this.form.group({
    numApto: [null, [Validators.required]],
    nome: [null, [Validators.required]],
    rg: [null, [Validators.required]],
    cpf: [null, [Validators.required]],
    tel1: [null, [Validators.required]],
    tel2: [null],
    obs: [null],
  })

  pageChange(pageEvent: PageEvent) {
    this.service.findAllPaginated(pageEvent, this.filterControl.value).subscribe({
      next: (response) => {
        this.dataTable.data = response.content;
        this.totalLength = response.totalElements;
        this.pageSize = response.size;
        this.page = pageEvent.pageIndex;
      },
      error: () => console.log("Erro ao carregar!")
    })
  }

  ngOnInit(): void {
    this.filterControl.valueChanges.pipe(debounceTime(500)).subscribe(query => {
      this.service.findAllPaginated({
        pageIndex: this.page,
        pageSize: this.pageSize,
        length: this.totalLength,
      },
        query).subscribe(response => {
          this.dataTable.data = response.content;
        });
    })

    this.pageChange({
      pageIndex: this.page,
      pageSize: this.pageSize,
      length: this.totalLength,
    });
  }

  delete(id: any) {
    this.service.delete(id).subscribe({
      next: () => {
        this.okDialog("Registro excluído com sucesso!")
        this.pageChange({
          pageIndex: this.page,
          pageSize: this.pageSize,
          length: this.totalLength,
        });
      },
      error: () => {
        this.okDialog("O registro não pôde ser excluído.");
      }
    });
  }

  openDialog(id: number) {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, { data: "Deseja Excluir o Funcionario?" });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id);
      }
    }
    );
  }

  okDialog(msg: any) {
    this.dialog.open(OkDialogComponent,
      { data: msg }
    )
  }
}
