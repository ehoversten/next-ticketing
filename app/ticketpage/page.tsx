//'use client'

import React from 'react';
import TicketCard from '../components/TicketCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import { createClient } from '@/utils/supabase/server'
import { redirect } from 'next/navigation';
import Link from 'next/link';


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
  // const router = useRouter();
  const supabase = await createClient();
  //console.log(supabase);

  const { data: tickets, error } = await supabase.from('tickets').select('');
  
  // console.log(tickets);

  if(error) {
    console.log("Error: ", error);
  }

  const navigate = () => {
    //redirect('/ticketpage/new')
  }

  return (
    <>
      <div className="ticket-new flex justify-between p-5">
        <FontAwesomeIcon icon={faTicket} className='h-15'/>
        <div className='title text-6xl'>Tickets Page</div>
        <Link href={'/ticketpage/new'} className='bg-amber-600 p-4 m-2 rounded-md text-xl'>New Ticket</Link>
      </div>
      <div className="ticket-wrapper flex justify-center">
        { tickets ? (
          tickets.map((ticket) => (
            <TicketCard data={ticket} key={ticket.id} />
          )
        )) : (
          <h2>No Tickets...</h2>
        )}
      </div>
    </>
  )
}

export default Tickets;