import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]';
import prisma from '../../lib/prisma';

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  const dataAsJson = JSON.parse(req.body);

  const data = {
    entryName: dataAsJson.entryName,
    recommended: dataAsJson.recommended === 'true',
    rating: dataAsJson.rating,
    entryDate: new Date(),
    description: dataAsJson.description,
    photos: {
      create: {
        url: dataAsJson.photoURL,
        fileName: dataAsJson.fileName,
        alternateText: dataAsJson.alternateText,
      },
    },
    User: {
      connect: {
        email: session?.user?.email,
      },
    },
    // type: {
    //   connectOrCreate: {
    //     create: {
    //       name: 'Dinner',
    //     },
    //   },
    // },
    // place: {
    //   connectOrCreate: {
    //     create: {
    //       name: dataAsJson.place,
    //       address: dataAsJson.region,
    //       createdAt: new Date(),
    //     },
    //   },
    // },
  };

  const newEntry = await prisma.entry.create({ data });

  return res.status(200).json(newEntry);
};
