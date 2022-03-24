import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  private PCT_VAL_BAU: number = 0;
  private PCT_VAL_CLI: number = 0;
  private PCT_VAL_MEC: number = 0;
  private PCT_EXT_PARCEIRO: number = 0;
  private PCT_EXT_BOOSTER: number = 0;
  private PCT_EXT_ALIANCA: number = 0;
  private VAL_TOTAL: number = 0;
  private VLR_BAU_ANTERIOR: number = 0;
  private PASSAPORTE_ANTERIOR: number = 0;

  constructor() { }

  calcForm = new FormGroup({
    Sequencia: new FormControl('Sequencia'),
    Passaporte: new FormControl('Passaporte'),
    ValorTotal: new FormControl('ValorTotal'),
    Parceria: new FormControl('Parceria'),
    Booster: new FormControl('Booster'),
    ValorBau: new FormControl('ValorBau'),
    ValorCliente: new FormControl('ValorCliente'),
    ValorMecanico: new FormControl('ValorMecanico'),
  });

  ngOnInit() {
    this.LimparCampos();
  }

  CalcularValores() {
    this.PCT_VAL_BAU = 35
    this.PCT_VAL_CLI = 35
    this.PCT_VAL_MEC = 30
    this.PCT_EXT_PARCEIRO = 5
    this.PCT_EXT_BOOSTER = 5
    this.PCT_EXT_ALIANCA = 15
    this.VAL_TOTAL = Number(this.calcForm.controls['ValorTotal'].value)
    var parceria = this.calcForm.controls['Parceria'].value
    var booster = this.calcForm.controls['Booster'].value

    if (parceria == 1) {
      this.PCT_VAL_MEC -= this.PCT_EXT_PARCEIRO;
      this.PCT_VAL_CLI += this.PCT_EXT_PARCEIRO;
    }
    else if (parceria == 2) {
      this.PCT_VAL_MEC -= this.PCT_EXT_ALIANCA;
      this.PCT_VAL_CLI += this.PCT_EXT_ALIANCA;
    }

    if (booster) {
      this.PCT_VAL_BAU -= this.PCT_EXT_BOOSTER
      this.PCT_VAL_MEC += this.PCT_EXT_BOOSTER
    }

    this.calcForm.controls['ValorBau'].setValue(Number((this.VAL_TOTAL / 100) * this.PCT_VAL_BAU))
    this.calcForm.controls['ValorCliente'].setValue(Number((this.VAL_TOTAL / 100) * this.PCT_VAL_CLI))
    this.calcForm.controls['ValorMecanico'].setValue(Number((this.VAL_TOTAL / 100) * this.PCT_VAL_MEC))
    this.VAL_TOTAL = 0
    this.PCT_VAL_BAU = 0
    this.PCT_VAL_MEC = 0
    this.PCT_VAL_CLI = 0

    var Texto = ''

    if (booster) {
      if (Number(this.calcForm.controls['Sequencia'].value) > 0) {
        Texto = '**Nº:**' + Number(this.calcForm.controls['Sequencia'].value)
      }
      else {
        Texto = '**Nº:**'
      }
      Texto += '\n**Passaporte:**' + Number(this.calcForm.controls['Passaporte'].value)
      Texto += '\n**Valor Baú:**' + Number(this.calcForm.controls['ValorBau'].value)
      Texto += '\n**Valor Cliente:**' + Number(this.calcForm.controls['ValorCliente'].value)
      Texto += '\n***Valor Mecânico:***' + Number(this.calcForm.controls['ValorMecanico'].value)
      Texto += '\n**Valor Total:**' + Number(this.calcForm.controls['ValorTotal'].value)
    }
    else {
      if (Number(this.calcForm.controls['Sequencia'].value) > 0) {
        Texto = '**Nº:**' + Number(this.calcForm.controls['Sequencia'].value)
      }
      else {
        Texto = '**Nº:**'
      }
      Texto += '\n**Passaporte: **' + Number(this.calcForm.controls['Passaporte'].value)
      Texto += '\n**Valor Baú: **' + Number(this.calcForm.controls['ValorBau'].value)
      Texto += '\n**Valor Cliente: **' + Number(this.calcForm.controls['ValorCliente'].value)
      Texto += '\n**Valor Mecânico: **' + Number(this.calcForm.controls['ValorMecanico'].value)
      Texto += '\n**Valor Total: **' + Number(this.calcForm.controls['ValorTotal'].value)
    }

    const selBox = document.createElement('textarea');
    selBox.style.position = 'fixed';
    selBox.style.left = '0';
    selBox.style.top = '0';
    selBox.style.opacity = '0';
    selBox.value = Texto;
    document.body.appendChild(selBox);
    selBox.focus();
    selBox.select();
    document.execCommand('copy');
    document.body.removeChild(selBox);
    this.calcForm.controls['Sequencia'].setValue(Number(this.calcForm.controls['Sequencia'].value) + 1)
    this.PASSAPORTE_ANTERIOR= Number(this.calcForm.controls['Passaporte'].value)
    this.VLR_BAU_ANTERIOR = Number(this.calcForm.controls['ValorBau'].value)
  }

  LimparCampos() {
    this.calcForm.controls['ValorBau'].disable();
    this.calcForm.controls['ValorBau'].setValue('Baú');
    this.calcForm.controls['ValorCliente'].disable();
    this.calcForm.controls['ValorCliente'].setValue('Cliente');
    this.calcForm.controls['ValorMecanico'].disable();
    this.calcForm.controls['ValorMecanico'].setValue('Mecânico');
    this.calcForm.controls['Booster'].setValue(false);
    this.calcForm.controls['Passaporte'].setValue('');
    this.calcForm.controls['Sequencia'].setValue('');
    this.calcForm.controls['ValorTotal'].setValue('');
    this.calcForm.controls['Parceria'].setValue(0);
  }

}
