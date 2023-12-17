
import { getServerSession } from 'next-auth/next';
import { authOptions } from './auth/[...nextauth]'
import prisma from '../../lib/prisma';

export default async (req, res) => {

  // console.log('req', req.body);


  console.log('reqNAME', req.body.entryName)

  const { entryName, recommended, rating, photoURL, photoALT, place, region } = req.body;
  // const { entryDate } = values;

  const transformedData = JSON.parse(JSON.stringify(req.body));

  console.log('transformedData', transformedData)

  const entryDate = new Date();
  const session = await getServerSession(req, res, authOptions)

  const data = {
    entryName: transformedData.entryName,
    entryDate: entryDate,
    recommended: recommended === "on" ? true : false,
    rating: rating,
    // photos: {
    //   createMany: {
    //     data: {
    //       fileName: photoALT,
    //       url: photoURL,
    //       alternateText: photoALT,
    //     },
    //   },
    // },
    User: {
      connect: {
        email: session?.user?.email,
      }
    },
    // type: {
    //   connectOrCreate: {
    //     create: {
    //       name: 'Dinner',
    //       // iconURL: photoURL,
    //       // iconAlt: photoALT,
    //     },
    //     where: {
    //       id: '',
    //     },
    //   },
    // },
    // place: {
    //   connectOrCreate: {
    //     create: {
    //       name: place,
    //       address: region,
    //       createdAt: entryDate,
    //     },
    //     where: {
    //       id: '',
    //     },
    //   },
    // },
  };

  const newEntry = await prisma.entry.create({ data });

  return res.status(200).json(newEntry);
};
