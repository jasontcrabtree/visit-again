import { getServerSession } from 'next-auth/next';
import { authOptions } from './../auth/[...nextauth]';
import prisma from '../../../lib/prisma';

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);
  const dataAsJson = JSON.parse(req.body);

  const existingWatchListEntry = await prisma.watchList.findFirst({
    where: {
      User: {
        email: session?.user?.email,
      },
      entryId: dataAsJson.entryId,
    },
  });

  if (!existingWatchListEntry) {
    const newWatchlistEntry = await prisma.watchList.create({
      data: {
        Entry: {
          connect: {
            id: dataAsJson.entryId,
          },
        },
        User: {
          connect: {
            email: session?.user?.email,
          },
        },
      },
    });

    return res.status(200).json(newWatchlistEntry);
  }

  return res
    .status(409)
    .json({ Status: 'User entry watchlist already exists' });
};
