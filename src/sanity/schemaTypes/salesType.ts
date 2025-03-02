import { TagIcon } from "@sanity/icons";
import { defineField, defineType } from "sanity";

export const salesType = defineType({
    name: 'sale',
    title: 'Sale',
    type: 'document',
    icon: TagIcon,
    fields: [
        defineField({
            name: 'title',
            type: 'string',
            title: 'Title',}),
            defineField({
                name:'description',
                type:'text',
                title:'Description',
            }),
        defineField({
            name:'discountAmount',
            type:'number',
            title:'Discount Amount',
            description:'The amount of discount applied to the sale'
        }),
        defineField({   
            name:'couponCode',
            type:'string',
            title:'Coupon Code',

        }),
        defineField({
            name:'validuntil',
            type:'datetime',
            title:'Valid Until',
        
        }),
        defineField({
            name:'validFrom',
            type:'datetime',
            title:'Valid From',
            
        }),
        defineField({
            name:'isActive',
            type:'boolean',
            title:'Is Active',
            description:'Toggle to activate/deactivate the sale',
            initialValue:true
        })

    ],
    preview: {
        select: {
            title: 'title',
            discountAmount: 'discountAmount',
            couponCode: 'couponCode',
            validFrom: 'validFrom',
            validuntil: 'validuntil',
            isActive: 'isActive'
        },
        prepare(selection) {
            const { title, discountAmount, couponCode, isActive } = selection;
            const status = isActive ? 'Active' : 'Inactive';
            return {
                title: title,
                subtitle: `${discountAmount}% off-code: ${couponCode} $ ${status}`
            }
        }
    }
});