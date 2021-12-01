import { Injectable } from '@angular/core';
import { Observable, observable } from 'rxjs';
import {  HttpInterceptor,  HttpEvent,  HttpRequest,  HttpHandler,  HttpEventType,} from '@angular/common/http';
import { CustomerOrderService } from './services/customer-order.service';
import { tap } from 'rxjs';
@Injectable()
export class LoaderIntercepter implements HttpInterceptor {
  constructor(private orderService: CustomerOrderService) {}

  intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      tap(event=> {
        this.orderService.loader.next(true);
        if (event.type == HttpEventType.Response) {
          if (event.status == 200) {
            this.orderService.loader.next(false);
          }
        }
      })
    )
  }
}
