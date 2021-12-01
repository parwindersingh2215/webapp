import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerOrders } from 'src/app/model/customer.order';
import { CustomerOrderService } from 'src/app/services/customer-order.service';

@Component({
  selector: 'app-addorder',
  templateUrl: './addorder.component.html',
  styleUrls: ['./addorder.component.css'],
})
export class AddorderComponent implements OnInit {



  orderForm: FormGroup;
  formHeading: string = '';
  btntext: string = 'Save';
  responseMessage: string = '';


/**
 *
 * @param formbuilder
 * @param orderservice
 */
  constructor(
    private formbuilder: FormBuilder,
    private orderservice: CustomerOrderService
  ) {


    this.orderForm = this.formbuilder.group({
      customername: this.formbuilder.control('', [Validators.required]),
      mobileno: this.formbuilder.control('', [
        Validators.required,

        Validators.pattern('^((\\+91-?)|0)?[0-9]{10}$'),
      ]),
      productname: this.formbuilder.control('', [Validators.required]),
      price: this.formbuilder.control('', [Validators.required]),
      qty: this.formbuilder.control('', [Validators.required]),
      id:this.formbuilder.control('0'),
       orderdate:this.formbuilder.control(new Date().toISOString())
    });

    this.formHeading = 'Add Order';
  }

  /**
   * Properties (Formcontrols)
   */
  get customername() {
    return this.orderForm.get('customername');
  }
  get mobileno() {
    return this.orderForm.get('mobileno');
  }
  get productname() {
    return this.orderForm.get('productname');
  }
  get price() {
    return this.orderForm.get('price');
  }
  get qty() {
    return this.orderForm.get('qty');
  }
  get orderdate(){
    return this.orderForm.get('orderdate');
  }
/**
 *in this function we check if history.state not null
 them we make this form as edit form else create form
 */
  ngOnInit(): void {
    if (history.state.orderdata != null) {
      this.formHeading = 'Edit Order Details';
      this.btntext = 'Update';
      let orderData = history.state.orderdata as CustomerOrders;
      this.orderForm.patchValue({
        customername: orderData.customername,
        mobileno: orderData.mobileno,
        productname: orderData.productname,
        price: orderData.price,
        qty: orderData.qty,
        id:orderData.id,
        orderdate:orderData.orderdate,
      });
    } else {
      this.formHeading = 'Add Order';
      this.btntext = 'Save';
    }
  }


  SaveNewOrder() {
    //  console.log(this.orderForm.value);

    if (this.btntext == 'Save') {

      this.orderservice.saveOrder(this.orderForm.value).subscribe((data) => {
        if (data != null) {
          this.responseMessage = 'Order Saved Successfully';
          this.orderForm.reset();
        }
      });
    } else {

      this.orderservice.updateCustomerOrder(this.orderForm.value).subscribe((data) => {
        if (data != null) {
          this.responseMessage = 'Order Udated Successfully';
          this.orderForm.reset();
        }
      });
    }
  }
}
