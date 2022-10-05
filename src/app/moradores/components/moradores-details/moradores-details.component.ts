import { OkDialogComponent } from './../../../shared/components/ok-dialog/ok-dialog.component';
import { MatDialog } from '@angular/material/dialog';
import { MoradoresService } from '../../service/moradores.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-moradores-details',
  templateUrl: './moradores-details.component.html',
  styleUrls: ['./moradores-details.component.scss']
})
export class MoradoresDetailsComponent implements OnInit {

  constructor(
    private service: MoradoresService,
    private route: ActivatedRoute,
    private router: Router,
    private form: FormBuilder,
    public dialog: MatDialog
  ) { }

  aptoList: { idApto: number; numApto: number }[] = [];
  isEdit = false;
  id!: number;

  moradoresForm = this.form.group({
    idApto: [null, [Validators.required]],
    nome: [null, [Validators.required]],
    rg: [null, [Validators.required]],
    cpf: [null, [Validators.required]],
    tel1: [null, [Validators.required]],
    tel2: [null],
    email: [null, [Validators.required]],
    contatoEmergencia: [null],
    telEmergencia: [null],
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
      (response) => {
        this.aptoList = response;
      }
    )

    if (this.isEdit) {
      this.patch();
    }
  }

  patch() {
    this.service.getById(this.id).subscribe({
      next: (response) => {
        this.moradoresForm.patchValue(response);
        console.log(response);
      }
    });
  }

  changePage(x: string) {
    this.router.navigate([x])
  }

  create() {
    const data = this.moradoresForm.value;
    this.service.create(data).subscribe({
      next: () => {
        this.okDialog("Morador adicionado com sucesso!");
        this.router.navigate(["./moradores"]);
      },
      error: () => {
        this.okDialog("O morador não pode ser adicionado.");
      },
    })
  }

  update() {
    const data = this.moradoresForm.value;
    this.service.update(data, this.id).subscribe({
      next: () => {
        this.okDialog("Registro atualizado com sucesso!");
        this.router.navigate(["./moradores"]);
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
