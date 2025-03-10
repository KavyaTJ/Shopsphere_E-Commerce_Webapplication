'use server'

import { BasketItem } from "@/store/store";

export type Metadata={
    orderNumber:string;
    customerName:string;
    customerEmail:string;
    clerkUserId:string
}


export type groupedBasketItem ={
    product:BasketItem['product']
    quantity:number
}

export async function createCheckoutSession(items:groupedBasketItem[],metadata:Metadata) {
    try {
        const itemsWithoutPrice = items.filter((item)=>!item.product.price)
        if(itemsWithoutPrice.length>0){
            throw new Error("Some items do not have a price")
        }
    } catch (error) {
        console.error("Error creating checkout sssion:",error);
        
    }
    
}