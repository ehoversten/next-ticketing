import React from 'react';
import { createClient } from '@/utils/supabase/server';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge"
import DeleteBtn from '@/app/components/DeleteBtn';

import UpdateForm from '@/app/components/UpdateForm';

// type TicketPageProps = {
//   id: string;
// }

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
        <CardContent>
          <p>Status: <Badge className='p-2'>{ticket.status}</Badge></p>
        </CardContent>
        <CardFooter className='flex justify-around'>
          <UpdateForm ticket={ticket}/>
          <DeleteBtn id={ticket.id} />
        </CardFooter>
      </Card>
    </div>
  )
}

export default TicketPage