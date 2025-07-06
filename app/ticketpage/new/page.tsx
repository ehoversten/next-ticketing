// 'use client'
'use server';

import React from 'react';
import { createClient } from '@/utils/supabase/server';
// import { Button } from "../../components/ui/button"

import TicketForm from '@/app/components/TicketForm';


async function NewTicket() {
  //const supabase = await createClient()
  
    const getCategories = async () => {
      try {
        const supabase = await createClient();
        const categories = await supabase.from('categories').select();
        console.log("Category: ", categories);
        return categories.data;
        
      } catch (error) {
        console.log("error category: ", error)
        
      }
    }

    const categoryData = await getCategories();

  return (
    // <div className='h-screen flex flex-col justify-center items-center'>
    <div className='h-screen w-full flex flex-col'>
      <div className='text-6xl font-bold text-center m-5'>New Ticket</div>
      <TicketForm catData={categoryData}/>
    </div>
  )
}

export default NewTicket