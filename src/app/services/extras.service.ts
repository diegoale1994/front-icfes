import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ExtrasService {

  llenarEdades(edadInicial: number, edadFinal: number): Array<number> {
    const edades =  []
    for (let index = edadInicial; index <= edadFinal; index++) {
      edades.push(index);
    }
    return edades;
  }
}
