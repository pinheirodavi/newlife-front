import { OkDialogComponent } from './../../../shared/components/ok-dialog/ok-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { VisitantesService } from '../../service/visitantes.service';

@Component({
  selector: 'app-visitantes-details',
  templateUrl: './visitantes-details.component.html',
  styleUrls: ['./visitantes-details.component.scss']
})
export class VisitantesDetailsComponent implements OnInit {

  constructor(private service : VisitantesService,
    private route : ActivatedRoute,
    private router : Router,
    private form : FormBuilder,
    public dialog: MatDialog) { }

  aptoList: { idApto: number; numApto: number }[] = [];
  isEdit = false;
  id!: number;

  visitantesForm = this.form.group({
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
        this.visitantesForm.patchValue(response);
        console.log(response);
      }
    });
  }

  changePage(x: string) {
    this.router.navigate([x])
  }

  create() {
    const data = this.visitantesForm.value;
    this.service.create(data).subscribe({
      next: () => {
        this.okDialog("Visitante adicionado com sucesso!");
        this.router.navigate(["./visitantes"]);
      },
      error: () => {
        console.log(data);
        this.okDialog("O visitante não pode ser adicionado.");
      },
    })
  }

  update() {
    const data = this.visitantesForm.value;
    this.service.update(data, this.id).subscribe({
      next: () => {
        this.okDialog("Registro atualizado com sucesso!");
        this.router.navigate(["./visitantes"]);
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
