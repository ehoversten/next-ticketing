'use client';

import { createClient } from '@/utils/supabase/client';
import { redirect } from 'next/navigation';
import { useEffect } from 'react';
import { SubmitHandler, useForm } from 'react-hook-form';


type FormFields = {
    title: string;
}

const CategoryForm = () => {

    const { register, handleSubmit, reset, formState: { errors, isSubmitSuccessful } } = useForm<FormFields>()

    const submitForm: SubmitHandler<FormFields> = async (formData) => {

        console.log("Form Data: ", formData);

        try {
            const supabase = await createClient();
            const { error, data } = await supabase.from('categories').insert(formData);
            if(error) {
                console.log("Submission Error: ", error);
            }

            redirect('/categories');
        } catch (err) {
            console.log("Error submitting: ", err)
        }

    }

    useEffect(() => {
        if(isSubmitSuccessful) {
          reset()
        }
      }, [isSubmitSuccessful, reset])


  return (
    <div>
        <h2>Category Form</h2>
        <form onSubmit={handleSubmit(submitForm)}>
            <label htmlFor="title">Category Title</label>
            <input {...register("title", { required: "Title is required" })} type="text" id="title" name="title" placeholder="Enter Title"/>
            { errors.title && <div className='text-red-500'>{errors.title.message}</div> }
            <button className=''>Submit</button>
        </form>
    </div>
  )
}

export default CategoryForm