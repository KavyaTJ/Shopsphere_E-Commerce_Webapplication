import { getMyOrders } from '@/sanity/lib/orders/getMyOrders';
import { auth } from '@clerk/nextjs/server'
import { redirect } from 'next/navigation';
import React from 'react'

async function Orders() {
    const { userId } = await auth();
    if(!userId) {
        return redirect('/')
    }
    const orders =await getMyOrders(userId);
  return (
    <div>
      
    </div>
  )
}

export default Orders
