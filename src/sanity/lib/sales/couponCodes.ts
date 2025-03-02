export const COUPON_CODES = {
    BFRIDAY:'BFRIDAY',
    NEWYEAR:'NEWYEAR',
    DIWALI:'DIWALI'
} as const;
export type CouponCode = keyof typeof COUPON_CODES;