import { BasketIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

export const orderType = defineType({
    name: 'order',
    title: 'Orders',
    type: 'document',
    icon:BasketIcon,
    fields:[
     defineField({
            name:'orderNumber',
            title:'Order Number',
            type:'string',
            validation:Rule=>Rule.required()
        }),
        defineField({
            name:'stripeCheckoutSessionId',
            title:'stripe Checkout Session Id',
            type:'string',
            validation:Rule=>Rule.required()
        }),
        defineField({
            name:'stripecusromerId',
            title:'stripe Customer Id',
            type:'string',
            validation:Rule=>Rule.required()   
        }),
        defineField({
            name:'customerName',
            title:'Customer Name',
            type:'string',
            validation:Rule=>Rule.required()

        }),
        defineField({
            name:'email',
            title:'Customer Email',
            type:'string',
            validation:Rule=>Rule.required()
        }),
        defineField({
            name:'stripePaymentIntentId',
            title:'stripe Payment Intent Id',
            type:'string',
            validation:Rule=>Rule.required()
        }) ,
        defineField({
            name:'products',
            title:'Products',
            type:'array',
            of:[defineArrayMember({
                type:'object',
                fields:[
                    defineField({
                        name:'product',
                        title:'Product bought',
                        type:'reference',
                        to:[{type:'product'}],
                        validation:Rule=>Rule.required()
                    }),
                    defineField({
                        name:'quantity',
                        title:'Quantity',
                        type:'number',
                        validation:Rule=>Rule.required().min(0)
                    })
        
                ],
                preview:{
                    select:{
                        product:'product.name',
                        quantity:'quantity',
                        image:'product.image',
                        price:'product.price',
                        currency:'product.currency'
                    },
                    prepare(select){
                       return{
                            title:`${select.product} x ${select.quantity}`,
                            subtitle:`${select.price}${select.quantity}`,
                            media:select.image
                       } 
                    }
                }
            })]
        }),
        defineField({
            name:'total',
            title:'Total',
            type:'number',
            validation:Rule=>Rule.required().min(0)
        }),
        defineField({
            name:'currency',
            title:'Currency',
            type:'string',
            validation:Rule=>Rule.required()
        }),
        defineField({
            name:'amountDiscount',
            title:'Amount Discount',
            type:'number',
            validation:Rule=>Rule.required().min(0)
        }),
        defineField({
            name:'status',
            title:'Status',
            type:'string',
            options:{
                list:[{title:'Pending',value:'pending'},
                   { title:'Paid',value:'paid'},
                   { title:'Shipped',value:'shipped'},
                    {title:'Delivered',value:'delivered'},
                    {title:'Cancelled',value:'cancelled'}
                ],}

            
            }),
            defineField({
                name:'orderDate',
                title:'Order Date',
                type:'datetime',
                validation:Rule=>Rule.required()
            }),
               
            ],
            preview:{
                select:{
                    name:'customerName',
                    amount:'TotalPrice',
                    currency:'currency',
                    orderId:'orderNumber',
                    email:'email'
               
                },
                prepare(select){
                    const orderIdSnippet=`${select.orderId.slice(0,5)}...${select.orderId.slice(-5)}`
                    return{
                        title:`${select.name} - ${orderIdSnippet}`,
                        subtitle:`${select.amount}${select.currency},${select.email}`,
                        media:BasketIcon
                    }
                }
            }
        })
 