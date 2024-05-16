import { IProduct } from "../products/IProduct";

export interface IOrderProduct {
    id: number;
    product: IProduct;
    salePrice: number;
    amount: number;
}