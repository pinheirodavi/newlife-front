import { MatDialog } from '@angular/material/dialog';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { VeiculosService } from './../../service/veiculos.service';
import { Component, OnInit } from '@angular/core';
import { OkDialogComponent } from 'src/app/shared/components/ok-dialog/ok-dialog.component';

@Component({
  selector: 'app-veiculos-details',
  templateUrl: './veiculos-details.component.html',
  styleUrls: ['./veiculos-details.component.scss']
})
export class VeiculosDetailsComponent implements OnInit {

  constructor(private service: VeiculosService,
    private route : ActivatedRoute,
    private router : Router,
    private form : FormBuilder,
    public dialog: MatDialog) { }

    aptoList: { idApto: number; numApto: number }[] = [];
  isEdit = false;
  id!: number;

  veiculosForm = this.form.group({
    idApto: [null, [Validators.required]],
    placa: [null, [Validators.required]],
    marca: [null, [Validators.required]],
    modelo: [null, [Validators.required]],
    cor: [null, [Validators.required]],
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
        this.veiculosForm.patchValue(response);
        console.log(response);
      }
    });
  }

  changePage(x: string) {
    this.router.navigate([x])
  }

  create() {
    const data = this.veiculosForm.value;
    this.service.create(data).subscribe({
      next: () => {
        this.okDialog("Veículo adicionado com sucesso!");
        this.router.navigate(["./veiculos"]);
      },
      error: () => {
        console.log(data);
        this.okDialog("O veículo não pode ser adicionado.");
      },
    })
  }

  update() {
    const data = this.veiculosForm.value;
    this.service.update(data, this.id).subscribe({
      next: () => {
        this.okDialog("Registro atualizado com sucesso!");
        this.router.navigate(["./veiculos"]);
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
