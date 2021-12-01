import { Component, OnInit } from '@angular/core';
import { CustomerOrderService } from 'src/app/services/customer-order.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css'],
})
export class LoaderComponent implements OnInit {
  // loader:Boolean=false;
  loader:any;
  constructor(private orderService: CustomerOrderService) {
    this.orderService.loader.subscribe((res) => {
      this.loader = res;
    });
  }

  ngOnInit(): void {}
}
