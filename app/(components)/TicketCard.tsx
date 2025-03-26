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
  return (
    <div className="ticket-card">
        <h5>Ticket ID: {data.id}</h5>
        <h3>Category: {data.category}</h3>
        <h3>Issue Description: {data.issue}</h3>
        <div className='ticket-tags'>
            <h3>Tags: </h3>
            { data.tags.map((tag: string, index: number) => (<h2 key={index}>{tag}</h2>)) }
        </div>
        <h5>Status: {data.status}</h5>
        <h5>Claimed: {data.claimed}</h5>
        {/* <p>Created: {created_at.toISOString()}</p> */}
    </div>
  )
}

export default TicketCard;