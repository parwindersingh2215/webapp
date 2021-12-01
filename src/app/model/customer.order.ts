import { OrderHistory } from "./order.history";

export interface CustomerOrders{

        id:number;
        customername:string;
        mobileno:string;
        productname:string;
        qty:number;
        price:number;
        orderdate:Date;
        status:string;
        orderHistories:Array<OrderHistory>;




}
