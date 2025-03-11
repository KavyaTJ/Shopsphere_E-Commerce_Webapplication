'use server'

import { imageUrl } from "@/lib/imageUrl";
import stripe from "@/lib/stripe";
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
        //Search for existing customer by email
        const customer = await stripe.customers.list({
            email:metadata.customerEmail,
            limit:1   
        })

        let customerId:string | undefined
        if(customer.data.length>0){
            customerId=customer.data[0].id
        }
      

        const session= await stripe.checkout.sessions.create({
            customer:customerId,
            customer_creation:customerId? undefined:'always',
            customer_email:!customerId ?metadata.customerEmail:undefined,
            metadata,
            mode:'payment',
            allow_promotion_codes:true,
            success_url: `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_BASE_URL}/success?session_id={CHECKOUT_SESSION_ID}&orderNumber=${metadata.orderNumber}`,
            cancel_url: `${process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : process.env.NEXT_PUBLIC_BASE_URL}/basket`,
            line_items:items.map((item)=>({
                price_data:{
                    currency:'gbp',
                    unit_amount:Math.floor(item.product.price!*100),
                    product_data:{
                        name:item.product.name || 'Product',
                        description:`Product ID: ${item.product._id}`,
                        metadata:{
                            id:item.product._id
                        },
                        images:item.product.image ?[imageUrl(item.product.image).url()]:undefined
                    },
                },
                quantity:item.quantity
            })),
        });
        return session.url


    } catch (error) {
        console.error("Error creating checkout sssion:",error);
        
    }
    
}