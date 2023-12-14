
import { getServerSession } from 'next-auth/next';
import { authOptions } from '../api/auth/[...nextauth]'
import prisma from '../../lib/prisma';

export default async (req, res) => {

  const { entryName, recommended, rating, photoURL, photoALT, place, region } = req.body;
  // const { entryDate } = values;

  const entryDate = new Date();

  // const session = await getSession({ req });

  const session = await getServerSession(req, res, authOptions)

  console.log('session', session)

  const data = {
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
        email: session.user.email,
      }
    },
    type: {
      connectOrCreate: {
        create: {
          name: 'Dinner',
          iconURL: photoURL,
          iconAlt: photoALT,
        },
        where: {
          id: '',
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
          id: '',
        },
      },
    },
  };

  const newEntry = await prisma.entry.create({ data });

  return res.status(200).json(newEntry);

  // return res.status(200).json({ session: { session } })
};
