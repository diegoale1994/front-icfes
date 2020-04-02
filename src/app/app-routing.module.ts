import { ClienteFormComponent } from './components/clientes/cliente-form/cliente-form.component';
import { ClientesComponent } from './components/clientes/clientes.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CarouselComponent } from './components/carousel/carousel.component';


const routes: Routes = [
  {
    path: '', component: ClientesComponent, children: [
      { path: 'nuevo', component: ClienteFormComponent },
      { path: 'edicion/:id', component: ClienteFormComponent },
      { path: 'carousel', component: CarouselComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
