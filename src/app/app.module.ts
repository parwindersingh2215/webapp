import { HttpClientModule,HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule } from '@angular/forms';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { OrdersComponent } from './components/orders/orders.component';
import { LoaderComponent } from './components/loader/loader.component';
import { AddorderComponent } from './components/addorder/addorder.component';
import { LoaderIntercepter } from './loader-intercepter';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OrderhistoryComponent } from './components/orderhistory/orderhistory.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
@NgModule({
  declarations: [
    AppComponent,

    OrdersComponent,
     LoaderComponent,
     AddorderComponent,
     OrderhistoryComponent,
     NotFoundComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgbModule
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS,useClass: LoaderIntercepter,multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
