// import { getServerSession } from 'next-auth/next';
// import { authOptions } from './../auth/[...nextauth]';
import prisma from '../../../lib/prisma';

export default async (req, res) => {
  //   const session = await getServerSession(req, res, authOptions);

  switch (req.query.method) {
    case 'random':
      const randomEntries: { id: string }[] =
        await prisma.$queryRaw`SELECT * FROM "Entry" ORDER BY RANDOM() LIMIT 10;`;

      const randomEntryIds = randomEntries.map(entry => entry.id);

      const randomEntriesById = await prisma.entry.findMany({
        where: {
          id: {
            in: randomEntryIds,
          },
        },
        include: {
          photos: {},
        },
      });

      return res.status(200).json(randomEntriesById);

    default:
  }

  return res.status(404);
};
