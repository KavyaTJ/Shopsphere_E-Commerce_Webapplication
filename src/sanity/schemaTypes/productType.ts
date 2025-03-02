import { TrolleyIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const productType = defineType({
    name: 'product',
    title: 'Products',
    type: 'document',
    icon:TrolleyIcon,
    fields: [
        defineField({
            name:'name',
            title:'Product Name',
            type:'string',
            validation:Rule=>Rule.required()
        }),
        defineField({
            name:'image',
            title:'Product Image',
            type:'image',
            options:{
                hotspot:true,}
        }),
        defineField({
            name:'description',
            title:'Product Description',
            type:'blockContent',
        }),
        defineField({
            name:'price',
            title:'Product Price',
            type:'number',
            validation:Rule=>Rule.required().min(0)
        }),
        defineField({
            name:'categories',
            title:'Categories',
            type:'array',
            of:[{type:'reference',to:[{type:'category'}]}]
        }),
        defineField({
            name:'stock',
            title:'Product Stock',
            type:'number',
            validation:Rule=>Rule.required().min(0)
        }),
   
    ],
    preview:{
        select:{
            title:'name',
            media:'image',
            price:'price'
        },
        prepare(selection){
            const {title,media,price} = selection;
            return{
                title,
                media,
                price:`$${price}`
            }
        }
    }
})