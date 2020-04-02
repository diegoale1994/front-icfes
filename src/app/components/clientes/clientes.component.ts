import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { Cliente } from 'src/app/models/cliente';
import swal from 'sweetalert2';
import { ClienteService } from './../../services/cliente.service';

@Component({
  selector: 'app-clientes',
  templateUrl: './clientes.component.html',
  styleUrls: ['./clientes.component.css']
})
export class ClientesComponent implements OnInit, OnDestroy {

  private subscriptions = new Subscription();
  clientes: Cliente[] = [];

  constructor(private clienteService: ClienteService) {
    this.clienteService.recargarListadoClientes.subscribe(() => this.obtenerListadoClientes())
  }

  ngOnInit() {
    this.obtenerListadoClientes();
  }

  obtenerListadoClientes(): void {
    let sub = this.clienteService.ObtenerListadoClientes().subscribe((response: Cliente[]) => {
      this.clientes = response;
    });
    this.subscriptions.add(sub);
  }

  eliminarCliente(cliente:Cliente) { 

    swal.fire({
      title: 'Esta seguro?',
      text: `Esta seguro que desea eliminar a ${cliente.nombre} ?`,
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.value) {
        this.clienteService.eliminarCliente(cliente.id).subscribe(
          () => {
            this.clientes = this.clientes.filter(cli => cli !== cliente);
            swal.fire(
              'Eliminado!',
              'Cliente eliminado',
              'success'
            )
          }
        )
      }
    })
  }
  
  ngOnDestroy = () => this.subscriptions.unsubscribe();

}
