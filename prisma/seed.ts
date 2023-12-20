import { PrismaClient } from '@prisma/client';
import seedData from './updated_fake_data_with_correct_structure.json';

const prisma = new PrismaClient();

async function main() {
  const { users, entries, photos } = seedData;

  // Seed Users
  for (const user of users) {
    await prisma.user.upsert({
      where: { id: user.id },
      update: {},
      create: user,
    });
  }

  // Seed Entries
  for (const entry of entries) {
    const { userId, photos: entryPhotoIds, ...restOfEntryData } = entry;

    await prisma.entry.create({
      data: {
        ...restOfEntryData,
        User: { connect: { id: userId } },
        photos: {
          create: entryPhotoIds
            .map(photoId => {
              const photoData = photos.find(photo => photo.id === photoId);
              if (photoData) {
                const { entryId, ...photoDataWithoutEntryId } = photoData; // Remove 'entryId' from photo data
                return photoDataWithoutEntryId;
              }
              return null;
            })
            .filter(photo => photo !== null),
        },
      },
    });
  }

  // Additional seeding logic for other models (if any)
}

main()
  .catch(e => {
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
