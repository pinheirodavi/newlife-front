import { OkDialogComponent } from './../../../shared/components/ok-dialog/ok-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from './../../../shared/components/confirmation-dialog/confirmation-dialog.component';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FuncionariosService } from './../../service/funcionarios.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-funcionarios-details',
  templateUrl: './funcionarios-details.component.html',
  styleUrls: ['./funcionarios-details.component.scss']
})
export class FuncionariosDetailsComponent implements OnInit {

  constructor(
    private service : FuncionariosService,
    private route : ActivatedRoute,
    private router : Router,
    private form : FormBuilder,
    public dialog: MatDialog
  ) { }

  aptoList: { idApto: number; numApto: number }[] = [];
  isEdit = false;
  id!: number;

  funcionariosForm = this.form.group({
    idApto: [null, [Validators.required]],
    nome: [null, [Validators.required]],
    rg: [null, [Validators.required]],
    cpf: [null, [Validators.required]],
    tel1: [null, [Validators.required]],
    tel2: [null],
    obs: [null],
  })

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (params) => {
        this.isEdit = params['id'] !== 'new';
        this.id = params['id'];
      },
    });

    this.service.findAllAptos().subscribe(
      (response)=>{
        this.aptoList=response;
      }
    )

    if (this.isEdit) {
      this.patch();
    }
  }

  patch() {
    this.service.getById(this.id).subscribe({
      next: (response) =>{
        this.funcionariosForm.patchValue(response);
        console.log(response);
      }
    });
  }

  changePage(x: string) {
    this.router.navigate([x])
  }

  create() {
    const data = this.funcionariosForm.value;
    this.service.create(data).subscribe({
      next: () => {
        this.okDialog("Funcionário adicionado com sucesso!");
        this.router.navigate(["./funcionarios"]);
      },
      error: () => {
        console.log(data);
        this.okDialog("O funcionário não pode ser adicionado.");
      },
    })
  }

  update() {
    const data = this.funcionariosForm.value;
    this.service.update(data, this.id).subscribe({
      next: () => {
        this.okDialog("Registro atualizado com sucesso!");
        this.router.navigate(["./funcionarios"]);
      },
      error: () => {
        this.okDialog("O registro não pôde ser atualizado.");
      }
    })
  }

  okDialog(msg: any) {
    this.dialog.open(OkDialogComponent,
      { data: msg }
    )
  }
}
