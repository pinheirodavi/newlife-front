import { OkDialogComponent } from './../../../shared/components/ok-dialog/ok-dialog.component';
import { ConfirmationDialogComponent } from './../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime } from 'rxjs';
import { PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { VeiculosService } from './../../service/veiculos.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-veiculos-panel',
  templateUrl: './veiculos-panel.component.html',
  styleUrls: ['./veiculos-panel.component.scss']
})
export class VeiculosPanelComponent implements OnInit {

  constructor(private service: VeiculosService,
    private form: FormBuilder,
    public dialog: MatDialog
  ) { }

  filterControl = new FormControl('');
  totalLength!: number;
  pageSize = 5;
  page = 0;

  dataTable = new MatTableDataSource();
  displayedColumns = ['numApto', 'placa', 'marca', 'modelo', 'cor', 'action'];

  veiculosForm = this.form.group({
    numApto: [null, [Validators.required]],
    placa: [null, [Validators.required]],
    marca: [null, [Validators.required]],
    modelo: [null, [Validators.required]],
    cor: [null, [Validators.required]],
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
