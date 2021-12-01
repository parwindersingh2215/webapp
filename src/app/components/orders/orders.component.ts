import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CustomerOrders } from 'src/app/model/customer.order';
import { CustomerOrderService } from 'src/app/services/customer-order.service';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { OrderHistory } from 'src/app/model/order.history';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.css'],
})
export class OrdersComponent implements OnInit {

  customerorders: CustomerOrders[] = [];
  historyForm: FormGroup;
  orderHistory: OrderHistory[] = [];

  responseMessage: any;
  /**
   *
  instantiate  following
   * @param orderService
   * @param router
   * @param modalService
   * @param formbuilder
   */
  constructor(
    private orderService: CustomerOrderService,
    private router: Router,
    private modalService: NgbModal,
    private formbuilder: FormBuilder
  ) {
    this.historyForm = this.formbuilder.group({
      orderStatus: this.formbuilder.control('', [Validators.required]),
      orderId: this.formbuilder.control(''),
    });
  }

  /**
   *  Delete Order function
   */
  deleteOrder(customerorder: CustomerOrders) {
    if (confirm('Are you Sure to Delete ?')) {
      customerorder.status = 'Deleted';
      this.orderService.updateOrderStatus(customerorder).subscribe((data) => {
        if (data.status == 'Deleted') {
          this.getAllOrders();
        }
      });
    }
  }

  get orderStatus() {
    return this.historyForm.get('orderStatus');
  }
  get orderId() {
    return this.historyForm.get('orderId');
  }

  /**
   *  redirect to edit order page with order data(object)
   */
  editOrder(customerOrder: CustomerOrders) {
    console.log(customerOrder);
    this.router.navigate(['/neworder'], {
      state: { orderdata: customerOrder },
    });
  }

  /**
   * get All Orders
   */
  getAllOrders(){
    this.orderService.getOrders().subscribe((data) => {
      this.customerorders = data;
    });
  }
  ngOnInit(): void {
    this.getAllOrders();
  }

  /**
   * Code For Modal Pop Start
   */
  closeModal: string = '';
  modalReference: any;
  /**
   * Show Modal pop with order history
   * @param customerOrderHistory
   * @param content
   */
  showModal(customerOrderHistory: CustomerOrders, content: any) {
    //alert(customerOrderHistory)
    this.responseMessage = '';
    this.orderHistory = customerOrderHistory.orderHistories;
    this.historyForm = this.formbuilder.group({
      orderStatus: this.formbuilder.control('', [Validators.required]),
      orderId: this.formbuilder.control(this.orderHistory[0].orderId),
    });

    this.modalReference = this.modalService.open(content);

    this.modalReference.result.then(
      (res: any) => {
        this.closeModal = `Closed with: ${res}`;
      },
      (res: any) => {
        this.closeModal = `Dismissed ${this.getDismissReason(res)}`;
      }
    );
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

/**
 * Manage Order History (to add order status)
 */

  updateOrderHistory() {
    console.log(this.historyForm.value);
    this.orderService
      .saveOrderHistory(this.historyForm.value)
      .subscribe((data) => {
        if (data != null) {
          this.responseMessage = 'Order History Saved Successfully';
          this.getAllOrders();
          setTimeout(() => {
            this.modalReference.close();
          }, 700);
        }
      });
  }
}
