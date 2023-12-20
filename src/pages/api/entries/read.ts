import prisma from '../../../lib/prisma';

export default async (req, res) => {
  switch (req.query.method) {
    case 'random':
      const randomEntries: { id: string }[] =
        await prisma.$queryRaw`SELECT * FROM "Entry" WHERE "entryName" IS NOT NULL ORDER BY RANDOM() LIMIT 12;`;

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
