import { IProductType } from "../productTypes/IProductType";
import { IProduct } from "../products/IProduct";

export interface IPromotion {
    id: number;
    name: string;
    description: string;
    discount: number;
    products:IProduct[];
    productTypes:IProductType[]
}