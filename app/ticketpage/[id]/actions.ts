'use server'

import { redirect } from "next/navigation";
import { createClient } from '@/utils/supabase/server';

export async function delete(formData: FormData) {
    const supabase = await createClient();



    const { error } = await supabase
                                .from('tickets')
                                .select()
                                .eq('id', id)
                                .single();
}