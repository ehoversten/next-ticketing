import React from 'react';
import TicketCard from '../(components)/TicketCard';

import { createClient } from '@/utils/supabase/server'


// type Ticket = {
//   id: string;
//   category: string;
//   tags: [string];
//   issue: string;
//   status: string;
//   claimed: boolean;
//   created_at: Date;
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
          <TicketCard data={ticket} key={ticket.id}/>
        )
      )) : (
        <h2>No Tickets...</h2>
      )}
    </>
  )
}

export default Tickets;