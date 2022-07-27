import { now } from 'next-auth/client/_utils';
import { getSession } from 'next-auth/react';
import prisma from '../../lib/prisma';

export default async (req, res) => {
  console.log(req.body);

  const values = req.body;

  const { entryName } = values;
  const { recommended } = values;
  const { rating } = values;
  const { photoURL } = values;
  const { photoALT } = values;
  const { place } = values;
  const { region } = values;
  // const { entryDate } = values;

  const entryDate = new Date();

  const session = await getSession({ req });

  const newEntry = await prisma.entry.create({
    data: {
      entryName: entryName,
      entryDate: entryDate,
      recommended: recommended,
      rating: rating,
      photos: {
        createMany: {
          data: {
            fileName: photoALT,
            url: photoURL,
            alternateText: photoALT,
          },
        },
      },
      User: {
        connect: {
          email: session?.user?.email,
        },
      },
      type: {
        connectOrCreate: {
          create: {
            name: 'Dinner',
            iconURL: photoURL,
            iconAlt: photoALT,
          },
          where: {
            id: '7b9fd9bc-269e-4238-8da0-073237b26fd4',
          },
        },
      },
      place: {
        connectOrCreate: {
          create: {
            name: place,
            address: region,
            createdAt: entryDate,
          },
          where: {
            id: 'e782b29c-c2db-416b-89f2-c569ec926771',
          },
        },
      },
    },
  });

  return res.status(200).json(newEntry);
};
