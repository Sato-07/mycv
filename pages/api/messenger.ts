// pages/api/messages.ts
///import { PrismaClient } from '@prisma/client';
import { NextApiRequest, NextApiResponse } from 'next';

//const prisma = new PrismaClient();

export default async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    try {
      const { sentence, sender } = req.body; // Ensure that 'sentence' and 'sender' are in your request body

      // Save the message using Prisma
      const savedMessage = await prisma.message.create({
        data: {
          text: sentence, // Assuming you want to save the 'sentence' as 'text'
          sender, // Assuming 'sender' is already defined in the request body
        },
      });

      res.status(200).json(savedMessage);
    } catch (error) {
      console.error('Error saving the message:', error);
      res.status(500).json({ error: 'An error occurred while saving the message.' });
    }
  } else {
    res.status(405).end();
  }
};