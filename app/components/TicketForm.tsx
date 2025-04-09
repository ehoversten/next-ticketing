'use client'

import React, { useEffect } from 'react';
// import { string, z } from 'zod';
// import { zodResolver } from "@hookform/resolvers/zod"
import { SubmitHandler, useForm } from "react-hook-form";

import { createClient } from '@/utils/supabase/client';
import StatusSelect from './StatusSelect';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea';
import { redirect } from 'next/navigation';

type FormValues = {
  category: string;
  issue: string;
  tags: string[];
  status: string;
}

// const formSchema = z.object({
//   category: z.string().min(2).max(50),
//   tags: z.array(string()),
//   issue: z.string().min(2),
//   status: z.string().min(2)
// })

function TicketForm() {

const form = useForm<FormValues>( { defaultValues: { category: '', tags: [''], issue: '', status: 'submitted' }});
// const form = useForm();
const { register, control, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = form;
// const { name, ref, onChange, onBlur } = register("category");

const onSubmit: SubmitHandler<FormValues> = async (info) => {
  const supabase = await createClient();
  console.log("Submitted: ", info);

    try {
      const { error, data } = await supabase.from('tickets').insert(info);
      if(error) {
        console.log(error);
      }
      console.log("success: ", data);

      redirect('/ticketpage')
    } catch (error) {
      console.log(error);
    }

  }

  useEffect(() => {
    if(isSubmitSuccessful) {
      reset()
    }
  }, [isSubmitSuccessful, reset])

  return (
    <div className='form-container w-4xl place-self-center content-center md:w-2xl sm:w-sm xs:w-20'>
      <Form {...form} >
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-gray-300 border-2 border-amber-600 p-8 rounded-3xl shadow-2xl">
          <FormField
            control={control}
            name="category"
            render={({ field }) => (
              <FormItem>
                { JSON.stringify(field) }
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
                    {...register("tags.0", { required: "At least one tag name is required"})}
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
                  {/* <Input 
                    {...register("status")}
                    placeholder="Submitted" 
                    className='bg-white'
                    /> */}
                    <StatusSelect status={field.status} />
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