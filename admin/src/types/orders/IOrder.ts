import { IOrderProduct } from './IOrderProduct';
import { IOrderStatusHistory } from "./IOrderStatusHistory";
import { IProfileAddress } from './IProfileAddress';
import { IProfilePayment } from './IProfilePayment';
export interface IOrder {
    id: number;
    date: string;
    orderProducts: IOrderProduct[];
    address: IProfileAddress;
    payment: IProfilePayment;
    statusHistories: IOrderStatusHistory[];
    comment: string;
    phone: string;
}