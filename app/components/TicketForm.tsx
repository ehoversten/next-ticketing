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
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input"
import { Textarea } from '@/components/ui/textarea';
import { redirect } from 'next/navigation';

type FormValues = {
  category: string;
  issue: string;
  tags: string;
  status: string;
}

// const formSchema = z.object({
//   category: z.string().min(2).max(50),
//   tags: z.array(string()),
//   issue: z.string().min(2),
//   status: z.string().min(2)
// })

// const TicketForm = async () => {
  function TicketForm({ catData } ) {

  const categoryData = catData;
    
  const form = useForm<FormValues>( { defaultValues: { category: '', tags: '', issue: '', status: 'submitted' }});
  // const form = useForm();
  const { register, control, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = form;
  // const { name, ref, onChange, onBlur } = register("category");

  const onSubmit: SubmitHandler<FormValues> = async (info) => {
    try {
      const supabase = await createClient();
      console.log("Submitted: ", info);

      const allTags = info.tags.split(', ');
      console.log("tags: ", allTags);

      const newTicket = {
        category: info.category, 
        issues: info.issue,
        // tags: allTags,
        status: info.status,
        user_id: 
      }
      console.log("Tickee: ", newTicket);

      const { error, data } = await supabase.from('tickets').insert(newTicket);
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
          {/* <FormField
            control={control}
            name="category"
            render={({ field }) => (
              <FormItem>
                { JSON.stringify(field) }
                <FormLabel>Category:</FormLabel>
                <FormControl>
                  <Input 
                    {...register("category", { required: "Category is required"})}
                    placeholder="select category" 
                    className='bg-white'
                    />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          /> */}
          <FormField
            control={form.control}
            name="category"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified category to add" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    { categoryData ? categoryData?.map((item: any) => (
                      <SelectItem key={item.id} value={item.title}>{item.title}</SelectItem>

                    )) : (<div>No Dice</div>)}
                  </SelectContent>
                </Select>
                {/* <FormDescription>
                  You can manage email addresses in your{" "}
                  <Link href="/examples/forms">email settings</Link>.
                </FormDescription> */}
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Add Tags: </FormLabel>
                <FormControl>
                  <Input 
                    {...register("tags", { required: "At least one tag name is required"})}
                    placeholder="add tags" 
                    className='bg-white'
                    />
                </FormControl>
                <FormDescription>
                  Tags help to assist with ticket resolution, please seperate each tag with a comma.
                </FormDescription>
                {/* <FormDescription>
                  Tags help to assist with ticket resolution
                </FormDescription> */}
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
                    <StatusSelect status={field.status} />
                </FormControl>
                <FormDescription>
                  Status will default to NEW
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit" variant='outline' className='w-full text-black border-2 border-amber-600 shadow-2xl hover:bg-amber-600'>Submit</Button>
        </form>
      </Form>
    
    </div>
  )
}

export default TicketForm