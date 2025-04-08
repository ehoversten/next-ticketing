import React from 'react';
import { createClient } from '@/utils/supabase/server';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../components/ui/card"

// type TicketPageProps = {
//   id: string;
// }

// function TicketPage({ params: TicketPageProps }) {
async function TicketPage({ params }) {

    const { id } = await params;
    const supabase = await createClient();
    const { data: ticket, error } = await supabase
                                            .from('tickets')
                                            .select()
                                            .eq('id', id)
                                            .single();
    console.log(ticket);

    if(error) {
        console.log("Error: ", error);
    }

  return (
    <div className='flex justify-center'>
      <Card className='w-1/2 m-8'>
        <CardHeader>
          <CardTitle>Title: { ticket?.category }</CardTitle>
          <CardDescription>ID number: { ticket.id }</CardDescription>
        </CardHeader>
        <CardContent>
          <p>Issue: { ticket.issue }</p>
        </CardContent>
        <CardContent>
          <p>Tags: { ticket.tags }</p>
        </CardContent>
        <CardFooter className='flex justify-around'>
          <p>Status: { ticket.status }</p>
          <button className='bg-amber-500 py-3 px-5 rounded-lg' onClick={() => console.log("Delete")}>Delete</button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default TicketPage