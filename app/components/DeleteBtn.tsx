'use client';

import React from 'react';
import { deleteTicket } from '../actions/delete';


type DeleteProps = {
    id: string;
}

const handleSubmit = (e) => {
  e.preventDefault();
  // console.log(e.target.children[0].value)
  console.log(`Delete ID: ${e.target.children[0].value}`);
} 

function DeleteBtn( params: DeleteProps ) {
  return (
    <div className='bg-amber-500 p-3 rounded-lg'>
        {/* <form  onSubmit={handleSubmit}> */}
        <form action={deleteTicket}>
            <input type="hidden" name='ticket-id' id={params.id} value={params.id}/>
            <button type='submit'>Remove</button>
        </form>
    </div>
  )
}

export default DeleteBtn;