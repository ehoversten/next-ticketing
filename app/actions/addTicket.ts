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
        await prisma.tickets.create({
            data: {
                ...formData
            }
        })
        console.log("success");

    } catch (error) {
        console.error(error);
    }
}