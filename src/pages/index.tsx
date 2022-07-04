import prisma from '../lib/prisma';
import { useState } from 'react';
import EntryFeed from '../components/entryFeed';
import PlacesFeed from '../components/placesFeed';

type Props = {
  name: string;
  entries: any;
  places: any;
};

export default function Home(props: Props): JSX.Element {
  const data = props;

  const { entries } = data;
  const { places } = data;

  // console.log(entries, places);

  console.log(places);

  return (
    <main>
      <h1>Let's Visit Again</h1>
      <EntryFeed entries={entries} />
      <PlacesFeed places={places} />
    </main>
  );
}

export const getServerSideProps = async (): Promise<{
  props: {
    entries: unknown;
    places: unknown;
  };
}> => {
  const entries = await prisma.entry.findMany();
  const places = await prisma.place.findMany();

  return {
    props: {
      entries: JSON.parse(JSON.stringify(entries)),
      places: JSON.parse(JSON.stringify(places)),
    },
  };
};
