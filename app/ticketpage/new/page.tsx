import React from 'react';

import { createClient } from '@/utils/supabase/server';

async function NewTicket() {
    //const supabase = await createClient()

    // const { error } = await supabase.from('tickets')
    //     .insert({ category: 1, tags: ['Mordor'], issue: '', status: 'SUBMITTED' });

    // if(error) {
    //     console.log(error);
    // }


  return (
    <div>NewTicket</div>
  )
}

export default NewTicket