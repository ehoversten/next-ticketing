'use server'

import { redirect } from "next/navigation";
import { createClient } from '@/utils/supabase/server';

export async function deleteTicket(formData: FormData) {
    const supabase = await createClient();

    const ticketId = formData.get('ticket-id');
    const id = parseInt(ticketId)
    // console.log("Ticket: ", ticketId);
    // console.log("type: ", typeof ticketId);
    // const data = {
    //      id: formData.get('ticket-id') as string
    // }

    const { data, error } = await supabase
                                .from('tickets')
                                .delete()
                                // .match({ id: ticketId })
                                // .match({ id: ticketId, userId: user.id})
                                .eq('id', id)
                                .select()
                                // .single();
    console.log("data: ", data);

    if(error) {
        console.log("DB error: ", error);
        redirect('/error')
    }
    redirect('/ticketpage')
}