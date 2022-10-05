import { OkDialogComponent } from './../../../shared/components/ok-dialog/ok-dialog.component';
import { ConfirmationDialogComponent } from './../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { PageEvent } from '@angular/material/paginator';
import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MoradoresService } from '../../service/moradores.service';
import { debounceTime } from 'rxjs';
import * as fs from 'file-saver';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENSION = '.xlsx';

@Component({
  selector: 'app-moradores-panel',
  templateUrl: './moradores-panel.component.html',
  styleUrls: ['./moradores-panel.component.scss']
})
export class MoradoresPanelComponent implements OnInit {

  fileForm = this.form.group({
    file: ['',Validators.required],
  })

  constructor(
    private service: MoradoresService,
    private form: FormBuilder,
    public dialog: MatDialog
  ) { }

  filterControl = new FormControl('');
  totalLength!: number;
  pageSize = 5;
  page = 0;

  dataTable = new MatTableDataSource();
  displayedColumns = ['numApto', 'nome', 'rg', 'cpf', 'email', 'tel1', 'tel2', 'contatoEmergencia', 'telEmergencia', 'obs', 'action'];

  moradoresForm = this.form.group({
    numApto: [null, [Validators.required]],
    nome: [null, [Validators.required]],
    rg: [null, [Validators.required]],
    cpf: [null, [Validators.required]],
    email: [null, [Validators.required]],
    tel1: [null, [Validators.required]],
    tel2: [null],
    contatoEmergencia: [null],
    telEmergencia: [null],
    obs: [null],
  })

  pageChange(pageEvent: PageEvent) {
    this.service
      .findAllPaginated(pageEvent, this.filterControl.value)
      .subscribe({
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

  downloadAllRequests(query?: string | null){
    this.service.findAllList(query).subscribe( response => {
      import("xlsx").then(xlsx => {
        const header:any[][] = [[
            'Apto',
            'Morador',
            'RG',
            'CPF',
            'Tel. 1',
            'Tel. 2',
            'Èmail',
            'Contato Emergencia',
            'Tel. Emergência',
            'Obs.',
        ]];
        let ws: any = xlsx.utils.book_new();
        xlsx.utils.sheet_add_aoa(ws,header);
        xlsx.utils.sheet_add_json(
          ws,
          response,
          {
            header: [
              'idApto',
              'morador',
              'rg',
              'cpf',
              'tel1',
              'tel2',
              'email',
              'contatoEmergencia',
              'telEmergencia',
              'obs',
            ],skipHeader: true,origin: 'A2'});
        const workbook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
        ws['!cols'] = [{wpx: 100},{wpx: 100},{wpx: 100},{wpx: 100},{wpx: 100},{wpx: 100},{wpx: 100},{wpx: 100},{wpx: 100},{wpx: 100}]
        const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
        this.saveAsExcelFile(excelBuffer, "newlife-moradores");
      });
    });
  }

  //   downloadAllRequests(query?: string){
  //   this.service.findAllAptos().subscribe( response => {
  //     import("xlsx").then(xlsx => {
  //       const header:any[][] = [[
  //         'idApto',
  //         'numApto',
  //       ]];
  //       let ws: any = xlsx.utils.book_new();
  //       xlsx.utils.sheet_add_aoa(ws,header);
  //       xlsx.utils.sheet_add_json(
  //         ws,
  //         response,
  //         {
  //           header: [
  //             'idApto',
  //             'numApto'
  //           ],skipHeader: true,origin: 'A2'});
  //       const workbook = { Sheets: { 'data': ws }, SheetNames: ['data'] };
  //       ws['!cols'] = [{wpx: 100},{wpx: 100}]
  //       const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
  //       this.saveAsExcelFile(excelBuffer, "newlife_apartamentos");
  //     });
  //   });
  // }

  exportExcel(){
    if(this.filterControl.value != ''){
       this.downloadAllRequests(this.filterControl.value);
    } else{
       this.downloadAllRequests();
    }
}

  saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    fs.saveAs(
      data,
      fileName + EXCEL_EXTENSION
    );
  }

  file: any;

  loadFile(event: any){
    if(event.target.files && event.target.files[0]){
      this.file =event.target.files[0];
      this.fileForm.patchValue({
        file: this.file.name
      })
    }
  }

  importFile(){
    this.fileForm.reset();
    this.service.importMorador(this.file).subscribe(
      (success)=>{
        this.file = null;
        this.okDialog('Importação concluída!');
        this.ngOnInit();
      },
      (error)=>{
        if(error.error.status===400){
          this.okDialog("Falha")
        }
        this.file =null;
        this.ngOnInit();
      },()=>{}
    );
  }
}
