import { CustomersService } from './../../customers.service';
import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Customer } from 'src/app/Customer';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css'],
})
export class CustomersComponent implements OnInit {
  formulario: any;
  tituloFormulario: string;
  customers: Customer[];
  razaoSocial: string;
  id: string;

  visibilidadeTabela: boolean = true;
  visibilidadeFormulario: boolean = false;

  modalRef: BsModalRef;

  constructor(private customersService: CustomersService,
    private modalService: BsModalService) {}

  ngOnInit(): void {
    this.customersService.GetAll().subscribe((result) => {
      this.customers = result;
    });
  }

  ExibirFormularioCadastro(): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;
    this.tituloFormulario = 'Novo Cliente';
    this.formulario = new FormGroup({
      razaoSocial: new FormControl(null),
      nomeFantasia: new FormControl(null),
      cpfcnpj: new FormControl(null),
    });
  }

  ExibirFormularioAtualizacao(id: number): void {
    this.visibilidadeTabela = false;
    this.visibilidadeFormulario = true;

    this.customersService.GetById(id).subscribe((result) => {
      this.tituloFormulario = `Atualizar ${result.nomeFantasia}`;

      this.formulario = new FormGroup({
        id: new FormControl(result.id),
        razaoSocial: new FormControl(result.razaoSocial),
        nomeFantasia: new FormControl(result.nomeFantasia),
        cpfcnpj: new FormControl(result.cpfcnpj),
      });
    });
  }

  EnviarFormulario(): void {
    const customer: Customer = this.formulario.value;

    if (customer.id > 0) {
      this.customersService.PutCustomer(customer).subscribe((result) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Cliente atualizado com sucesso');
        this.customersService.GetAll().subscribe((data) => {
          this.customers = data;
        });
      });
    } else {
      this.customersService.PostCustomer(customer).subscribe((result) => {
        this.visibilidadeFormulario = false;
        this.visibilidadeTabela = true;
        alert('Cliente inserido com sucesso');
        this.customersService.GetAll().subscribe((data) => {
          this.customers = data;
        });
      });
    }
  }

  Voltar(): void {
    this.visibilidadeTabela = true;
    this.visibilidadeFormulario = false;
  }

  ExibirConfirmacaoExclusao(id: string, razaoSocial: string, conteudoModal: TemplateRef<any>): void {
    this.modalRef = this.modalService.show(conteudoModal);
    this.id = id;
    this.razaoSocial = razaoSocial;
  }

  DeleteCustomer(id){
    this.customersService.DeleteCustomer(id).subscribe(result => {
      this.modalRef.hide();
      alert('Cliente excluído com sucesso');
      this.customersService.GetAll().subscribe(data => {
        this.customers = data;
      });
    });
  }
}
