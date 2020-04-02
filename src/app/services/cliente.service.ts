import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Services } from './services.service';
import { Cliente } from '../models/cliente';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class ClienteService extends Services {

  public recargarListadoClientes: Subject<any> = new Subject();

  constructor(private http:HttpClient) {
    super();
  }

  ObtenerListadoClientes(): Observable<Cliente[]> {
    return this.http.get<Cliente[]>(`${this.backendUrl}/clientes`);
  }

  obtenerCliente(id: number): Observable<Cliente> {
    return this.http.get<Cliente>(`${this.backendUrl}/clientes/${id}`);
  }

  guardarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.post<Cliente>(`${this.backendUrl}/clientes`, cliente);
  }

  actualizarCliente(cliente: Cliente): Observable<Cliente> {
    return this.http.put<Cliente>(`${this.backendUrl}/clientes`, cliente);
  }

  eliminarCliente(id: number): Observable<Cliente> {
    return this.http.delete<Cliente>(`${this.backendUrl}/clientes/${id}`);
  }
}
