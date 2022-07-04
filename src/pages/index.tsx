import { useState } from 'react';
import prisma from '../lib/prisma';

type Props = {
  // props: any;
  // authors: object;
  name: string;
};

export default function Home(props: Props): JSX.Element {
  const data = props.name;

  return (
    <main>
      <h1>Home</h1>
    </main>
  );
}

export const getServerSideProps = async (): Promise<{
  props: { name: string };
}> => {
  // const authors = await prisma.author.findMany();

  // console.log(authors);

  const name = { name: 'Jason' };

  return {
    props: {
      name: JSON.parse(JSON.stringify(name)),
      // authors: JSON.parse(JSON.stringify(authors)),
    },
  };
};
