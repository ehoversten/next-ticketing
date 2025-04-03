'use client'

import React from 'react';
import { string, z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form";

import { createClient } from '@/utils/supabase/client';


import { Button } from "./ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form"
import { Input } from "./ui/input"
import { Textarea } from './ui/textarea';
import { redirect } from 'next/navigation';

type FormValues = {
  category: string;
  issue: string;
  tags: string[];
  status: string;
}


const formSchema = z.object({
  category: z.string().min(2).max(50),
  tags: z.array(string()),
  issue: z.string().min(2),
  status: z.string().min(2)
})

function TicketForm() {
// const TicketForm = async () => {

const form = useForm<FormValues>( { defaultValues: { status: 'submitted' }});
// const form = useForm();
const { register, control, handleSubmit, formState: { errors, isSubmitting } } = form;
// const { name, ref, onChange, onBlur } = register("category");

const onSubmit: SubmitHandler<FormValues> = async (data) => {
  const supabase = await createClient();
  console.log("Submitted: ", data);
      try {
        const { error } = await supabase.from('tickets').insert(data);
        if(error) {
          console.log(error);
        }
        
      } catch (error) {
        console.log(error);
      }

    }

    // console.log("Register: ", register);
    // console.log("Name: ", name);
    // console.log("Ref: ", ref);

  return (
    <div className='form-container w-4xl place-self-center content-center md:w-2xl sm:w-sm xs:w-20'>
      <Form {...form} >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-gray-300 border-2 border-amber-600 p-8 rounded-3xl shadow-2xl">
          <FormField
            control={control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category:</FormLabel>
                <FormControl>
                  {/* <Input placeholder="select category" name={name} ref={ref} onChange={onChange} onBlur={onBlur}/> */}
                  <Input 
                    {...register("category", { required: "Category is required"})}
                    placeholder="select category" 
                    className='bg-white'
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Tags:</FormLabel>
                <FormControl>
                  <Input 
                    {...register("tags", { required: "At least one tag name is required"})}
                    placeholder="add tags" 
                    className='bg-white'
                    />
                </FormControl>
                <FormDescription>
                  Tags help to assist with ticket resolution
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="issue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Issue Description:</FormLabel>
                <FormControl>
                  <Textarea 
                    {...register("issue", { required: "Issue description is required"})}
                    placeholder="add description" 
                    className='bg-white'
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Status:</FormLabel>
                <FormControl>
                  <Input 
                    {...register("status")}
                    placeholder="Submitted" 
                    className='bg-white'
                    />
                </FormControl>
                <FormDescription>
                  Status will default to SUBMITTED
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant='outline' className='w-full text-black border-2 border-amber-600 shadow-2xl hover:bg-amber-600'>Submit</Button>
          {/* <button type="submit" className='w-full bg-amber-500 text-black shadow-2xl'>Submit</button> */}
        </form>
      </Form>
    
    </div>
  )
}

export default TicketForm