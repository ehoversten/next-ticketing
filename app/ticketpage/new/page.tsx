'use client'

import React from 'react';
import { string, z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

import { createClient } from '@/utils/supabase/server';

import { Button } from "../../components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form"
import { Input } from "../../components/ui/input"


const formSchema = z.object({
  category: z.string().min(2).max(50),
  tags: z.array(string()),
  issue: z.string().min(2),
  satus: z.string().min(2)
})

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