import React from 'react'
import CategoryForm from '../components/CategoryForm'
import { createClient } from '@/utils/supabase/client'
import { faTicket } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Link } from 'lucide-react';

async function Category() {

    const supabase = await createClient();
    const { error, data: categories } = await supabase.from('categories').select('');

    console.log("data: ", categories);

    if(error) {
        console.log("Error: ", error);
    }

  return (
    <div>
        <CategoryForm />
        <div className="ticket-new flex justify-between p-5">
            <FontAwesomeIcon icon={faTicket} className='h-15'/>
            <div className='title text-6xl'>Category Page</div>
            <Link href={'/ticketpage'} className='bg-amber-600 p-4 m-2 rounded-md text-xl'>New Ticket</Link>
            </div>
            <div className="ticket-wrapper flex-col justify-center">
            { categories ? (
                categories.map((category) => (
                    <h2 className='' key={category.id}>{category.title}</h2>
                )
            )) : (
                <h2>No Categories...</h2>
            )}
        </div>
    </div>
  )
}

export default Category