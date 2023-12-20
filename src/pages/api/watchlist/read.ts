import { getServerSession } from 'next-auth/next';
import { authOptions } from './../auth/[...nextauth]';
import prisma from '../../../lib/prisma';

export default async (req, res) => {
  const session = await getServerSession(req, res, authOptions);

  const userWatchlist = await prisma.watchList.findMany({
    where: {
      User: {
        email: session?.user?.email,
      },
    },
    orderBy: {
      createdAt: 'desc',
    },
    select: {
      id: true,
      Entry: {
        include: {
          photos: true,
        },
      },
    },
  });

  return res.status(200).json(userWatchlist);
};
