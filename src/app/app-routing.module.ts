import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddorderComponent } from './components/addorder/addorder.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { OrdersComponent } from './components/orders/orders.component';

const routes: Routes = [
  { path: '', component: OrdersComponent },

    { path: 'neworder', component: AddorderComponent },
  { path: 'vieworders', component: OrdersComponent },
  {path: '404', component: NotFoundComponent},
  {path: '**', redirectTo: '/404'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
