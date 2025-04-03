// 'use client'

import React from 'react';
// import { Button } from "../../components/ui/button"

import TicketForm from '@/app/components/TicketForm';


async function NewTicket() {
    //const supabase = await createClient()

    // const { error } = await supabase.from('tickets')
    //     .insert({ category: 1, tags: ['Mordor'], issue: '', status: 'SUBMITTED' });

    // if(error) {
    //     console.log(error);
    // }


  return (
    // <div className='h-screen flex flex-col justify-center items-center'>
    <div className='h-screen w-full flex flex-col'>
      <div className='text-6xl font-bold text-center m-5'>New Ticket</div>
      <TicketForm />
    </div>
  )
}

export default NewTicket