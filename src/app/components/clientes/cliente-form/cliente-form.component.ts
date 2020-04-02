import { Component, OnInit, OnDestroy } from '@angular/core';
import { Cliente } from 'src/app/models/cliente';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ExtrasService } from 'src/app/services/extras.service';
import { ClienteService } from 'src/app/services/cliente.service';
import { Subscription } from 'rxjs';
import swal from'sweetalert2';

@Component({
  selector: 'app-cliente-form',
  templateUrl: './cliente-form.component.html',
  styleUrls: ['./cliente-form.component.css']
})
export class ClienteFormComponent implements OnInit, OnDestroy {

  cliente: Cliente = new Cliente();
  edades: Array<number> = [];
  private subscriptions = new Subscription();

  constructor(private activatedRoute: ActivatedRoute, 
              private extrasService: ExtrasService,
              private clienteService: ClienteService,
              private router: Router) { }

  ngOnInit() {

    this.activatedRoute.params.subscribe((params: Params) => {
      (params.id) && this.cargarCliente(params.id);
    });

    this.edades = this.extrasService.llenarEdades(18, 50);
  }

  cargarCliente(idCliente: number) {
    let sub = this.clienteService.obtenerCliente(idCliente).subscribe((cliente:Cliente) => {
      this.cliente = cliente;
    }, e => {
      this.router.navigate(['']);
      swal.fire('No encontrado!',`el usuario que intenta editar no se encuentra`,'warning');
    });
    this.subscriptions.add(sub);
  }

  crearCliente() {
    this.clienteService.guardarCliente(this.cliente).subscribe((cliente:Cliente) => {
      this.clienteService.recargarListadoClientes.next();
      this.router.navigate(['']);
      swal.fire('Creado!',`${cliente.nombre} creado con exito`,'success');
    });
  }

  actualizarCliente() {
    this.clienteService.actualizarCliente(this.cliente).subscribe((cliente:Cliente) => {
      this.clienteService.recargarListadoClientes.next();
      this.router.navigate(['']);
      swal.fire('Actualizado!',`${cliente.nombre} actualizado con exito`,'success');
    });
  }

  validarSoloNumeros(event: KeyboardEvent) {
    const charCode = (event.which) ? event.which : event.keyCode;
    return (charCode > 31 && (charCode < 48 || charCode > 57)) ? false : true;
  }

  ngOnDestroy = () => this.subscriptions.unsubscribe();

}
