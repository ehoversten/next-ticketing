'use client';

import React, { useState } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';
import { createClient } from '@/utils/supabase/client';

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
import StatusSelect from './StatusSelect';
// import { redirect } from 'next/navigation';
// import { revalidatePath } from 'next/cache';

type UpdateFormProps = {
  ticket: {
    id: string;
    category: string;
    issue: string;
    // tags: string[];
    status: string;
  }
}

type FormValues = {
    category: string;
    issue: string;
    // tags: string[];
    status: string;
  }

function UpdateForm({ticket}: UpdateFormProps) {

    const [showModal, setShowModal] = useState(false);
    // const [formData, setFormData] = useState({
    //     id: ticket.id,
    //     category: ticket.category,
    //     issue: ticket.issue,
    //     tags: ticket.tags,
    //     status: ticket.status,
    //     // priority: ticket.priority
    // });
    // const { category, issue, tags, status } = params;

    const form = useForm<FormValues>({ defaultValues: { category: ticket.category, issue: ticket.issue, /*tags: [...ticket.tags],*/ status: ticket.status }});

    const { handleSubmit, control, register } = form;

    const onSubmit: SubmitHandler<FormValues> = async (info) => {

        console.log("Info: ", info);
        console.log("Ticket: ", ticket.id);


        try {
            const supabase = await createClient();

            const { error, data } = await supabase.from('tickets').update({ category: info.category, issue: info.issue, /*tags: info.tags,*/ status: info.status }).eq('id', ticket.id).single();

            if(error) {
                console.log("error: ", error);
            }

            console.log("Updated: ", data);
            setShowModal(false);
            // redirect('/ticketpage');
        } catch (error) {
            console.log("error: ", error);
        }


    }

    // const handleChange = (e) => {
    //     setFormData({...formData, [e.target.name]: e.target.value})
    // } 

  return (

    <div className='form-container w-4xl place-self-center content-center md:w-2xl sm:w-sm xs:w-20'>
        <Button variant="destructive" onClick={() => setShowModal(true)}>Edit Ticket</Button>
    { showModal && (
      <Form {...form} >
        <span className="close text-red text-xl leading-none hover:text-red-300 cursor-pointer float-right" onClick={() => setShowModal(false)}>&times;</span>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-gray-300 border-2 border-amber-600 p-8 rounded-3xl shadow-2xl">
          <FormField
            control={control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category:</FormLabel>
                <FormControl>
                  <Input 
                    {...register("category", { required: "Category is required"})}
                    placeholder="select category" 
                    className='bg-white'
                    />
                    {/* <Input placeholder="category" {...field} className='bg-white'/> */}
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* <FormField
            control={control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Tags:</FormLabel>
                <FormControl>
                    <Input placeholder="tags.0" {...field} className='bg-white'/>
                </FormControl>
                <FormDescription>
                  Tags help to assist with ticket resolution
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          /> */}
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
                <FormLabel>Update Status:</FormLabel>
                <FormControl>
                    <StatusSelect status={ticket.status} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant='outline' className='w-full text-black border-2 border-amber-600 shadow-2xl hover:bg-amber-600'>Submit</Button>
        </form>
      </Form>
    )}
    </div>
  )
}

export default UpdateForm