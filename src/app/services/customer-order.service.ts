import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CustomerOrders } from '../model/customer.order';
import { BehaviorSubject } from 'rxjs';
import { OrderHistory } from '../model/order.history';

@Injectable({
  providedIn: 'root',
})
export class CustomerOrderService {
  /**
   * this is a base url is to send httprequest
   * also change portno accordingly
   */
  baseUrl: string = 'https://localhost:44338/api/';

  /**
   * concatenate CustomerOrder controllername to base url
   */
  url = this.baseUrl + 'CustomerOrder';

  /**
   * concatenate OrderHistory controllername to base url
   */
  url2 = this.baseUrl + 'OrderHistory';

  loader = new BehaviorSubject<boolean>(false);

  /**
   * instantiate  HttpClient in contructor
   * to send httprequest
   * @param httpclt
   */
  constructor(private httpclt: HttpClient) {}

  /**
   * get all customers orders
   * @returns Observable
   */
  getOrders() {
    return this.httpclt.get<CustomerOrders[]>(this.url);
  }
  /**
   * create new order
   * @param customerOrder
   * @returns Observable
   */
  saveOrder(customerOrder: CustomerOrders) {
    return this.httpclt.post<CustomerOrders>(this.url, customerOrder);
  }

  /**
   * Update Order details
   * @param customerOrder
   * @returns Observable
   */
  updateCustomerOrder(customerOrder: CustomerOrders) {
    return this.httpclt.put<CustomerOrders>(
      this.url + '?OrderId=' + customerOrder.id,
      customerOrder
    );
  }

  updateOrder(customerOrder: CustomerOrders) {
    return this.httpclt.put<CustomerOrders>(
      this.url + '/' + customerOrder.id,
      customerOrder
    );
  }

  /**
   *  update order status as 'Deleted' or mark as deleted
   * @param customerOrder
   * @returns Observable
   */
  updateOrderStatus(customerOrder: CustomerOrders) {
    const params = new HttpParams().set('OrderId', customerOrder.id);
    return this.httpclt.delete<CustomerOrders>(this.url, { params });
  }
  /**
   *
   * Save Order History
   * @param orderHistory
   * @returns Observable
   */
  saveOrderHistory(orderHistory: OrderHistory) {
    return this.httpclt.post<OrderHistory>(this.url2, orderHistory);
  }
}
