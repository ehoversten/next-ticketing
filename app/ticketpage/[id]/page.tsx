import React from 'react';
import { createClient } from '@/utils/supabase/server';


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
                                            .eq('id', id);
    console.log(ticket);

    if(error) {
        console.log("Error: ", error);
    }

  return (
    <>
        <div>TicketPage: ID -  { id }</div>
        <p>{ JSON.stringify(ticket)}</p>
    </>
  )
}

export default TicketPage