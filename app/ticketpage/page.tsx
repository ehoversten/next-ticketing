import React, { useState } from 'react';

import { createClient } from '@/utils/supabase/server'


// type Ticket = {
//   id: string;
//   category: string;
//   tags: [string];
//   issue: string;
//   status: string;
//   claimed: boolean;
// }

async function Tickets() {
  // const [allTickets, setAllTickets] = useState<Ticket[] | null>(null);

  const supabase = await createClient();
  //console.log(supabase);

  const { data: tickets, error } = await supabase.from('tickets').select('');
  
  console.log(tickets);

  if(error) {
    console.log("Error: ", error);
  }

  return (
    <>
      <div>Tickets Page</div>

      { tickets ? (
        tickets.map((ticket) => (
          <p key={ticket.id}>Ticket: { JSON.stringify(ticket) }</p>
        )
      )) : (
        <h2>No Tickets...</h2>
      )}
    </>
  )
}

export default Tickets;