'use client'

import { redirect, useRouter } from 'next/navigation';
import React from 'react';

type TicketProps = {
    data: {
        id: string;
        created_at: Date;
        issue: string;
        tags: string[];
        claimed: boolean;
        category: string;
        status: string;
        user_id: string;
    }
}

const TicketCard = ({ data }: TicketProps) => {

    const router = useRouter();
  return (
    <div className="ticket-card w-50% bg-sky-500 m-5 p-5 rounded-lg hover:bg-sky-700">
        <h5>Ticket ID: {data.id}</h5>
        <h3>Category: {data.category}</h3>
        <h3>Issue Description: {data.issue}</h3>
        <div className='ticket-tags flex'>
            <h3>Tags: </h3>
            { data.tags.map((tag: string, index: number) => (<h2 key={index} className='bg-sky-800 p-2 m-2 rounded-md'>{tag}</h2>)) }
        </div>
        <h5>Status: {data.status}</h5>
        <h5>Claimed: {data.claimed}</h5>
        {/* <p>Created: {created_at.toISOString()}</p> */}
        <button className='bg-amber-600 p-2 m-2 rounded-md hover:bg-amber-700'
            onClick={() => router.push(`/ticketpage/${data.id}`)}>Details</button>
    </div>
  )
}

export default TicketCard;