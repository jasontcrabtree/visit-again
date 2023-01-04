import prisma from '../lib/prisma';
import { useState } from 'react';
import EntryFeed from '../components/entryFeed';
import PlacesFeed from '../components/placesFeed';
import { useSession } from 'next-auth/react';
import { authOptions } from './api/auth/[...nextauth]';
import { unstable_getServerSession } from 'next-auth/next';

type Props = {
  name: string;
  entries: any;
  places: any;
  userEntries: any;
  loggedOut: any;
  state: string;
};

export default function Home(props: Props): JSX.Element {
  // const { data: session } = useSession();

  const data = props;

  if (!data.userEntries) {
    return (
      <main>
        <h1>No data</h1>
      </main>
    );
  }

  const { userEntries } = data;
  const { entries } = data;
  const { places } = data;

  return (
    <main>
      <h1>Lets Visit Again</h1>
      <EntryFeed entries={entries} userEntries={userEntries} />
      {/* <PlacesFeed places={places} /> */}
    </main>
  );
}

export const getServerSideProps = async (
  context: any
): Promise<{
  props: {
    entries: unknown;
    places: unknown;
    userEntries: unknown;
    loggedIn: boolean;
  };
}> => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    const entries = await prisma.entry.findMany({
      where: {
        User: {
          email: session.user.email,
        },
      },
      orderBy: {
        entryDate: 'asc',
      },
    });

    const userEntries = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        name: true,
        entries: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            photos: {},
            place: {},
          },
          // select: {
          //   place: {},
          //   photos: {},
          // },
        },
      },
    });

    const places = await prisma.place.findMany();

    return {
      props: {
        loggedIn: true,
        entries: JSON.parse(JSON.stringify(entries)),
        places: JSON.parse(JSON.stringify(places)),
        userEntries: JSON.parse(JSON.stringify(userEntries)),
      },
    };
  }

  if (!session) {
    return {
      props: {
        loggedIn: false,
        entries: false,
        places: false,
        userEntries: false,
      },
    };
  }
};
