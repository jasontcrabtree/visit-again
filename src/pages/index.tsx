import prisma from '../lib/prisma';

type Props = {
  props: any;
  authors: object;
};

export default function Home(props: Props): JSX.Element {
  const data = props.authors[0];

  return (
    <main>
      <h1>Tiny JS Starter{data ? <span>, Hello {data.name}!</span> : null}</h1>
      <p>This is a Next JS template setup with files how I prefer</p>
    </main>
  );
}

export const getServerSideProps = async () => {
  const authors = await prisma.author.findMany();

  console.log(authors);

  return {
    props: {
      authors: JSON.parse(JSON.stringify(authors)),
    },
  };
};
