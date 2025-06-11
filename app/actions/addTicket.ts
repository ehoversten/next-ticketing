'use server';

import { Prisma, PrismaClient } from "@prisma/client";


const prisma = new PrismaClient();

type FormValues = {
  category: string;
  issue: string;
  tags: string[];
  status: string;
}

export default async function addTicket(formData: FormValues) {
    // const title = formData.get('category');

    console.log("form data: ", formData);

    try {
        await prisma.ticket.create({
            data: {
                id: "495a9c0d-50bb-438f-a8de-b144afe24cf9",
                category: formData.category,
                issue: formData.issue,
                tags: formData.tags,
                status: formData.status
                
            }
        })
        console.log("success");

    } catch (error) {
        console.error(error);
    }
}