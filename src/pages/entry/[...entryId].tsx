import type { InferGetServerSidePropsType } from 'next'
import prisma from '../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import styled from 'styled-components';

const StyledEntryMain = styled.main`
  padding: 32px 0 64px 0;
`

export default function MealDrinkEntry(props, { entryName, entryDate, description, rating, recommended }): InferGetServerSidePropsType<typeof getServerSideProps> {

  console.log('props', props);

  return (
    <StyledEntryMain>
      <h1>{entryName ? entryName : "Entry"}</h1>
    </StyledEntryMain>
  );
}

export const getServerSideProps = async (context: any) => {
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (!session) {
    return {
      props: {
        loggedIn: false,
        userEntries: false,
      },
    };
  }

  const entryData = await prisma.entry.findUnique({
    where: {
      id: context.query.entryId[0],
    },
    include: {
      photos: true
    }
  })

  return {
    // This JSON.parse to JSON.stringify is a hack/fix from here https://github.com/vercel/next.js/issues/11993#issuecomment-617916930. As future projects will use React Server actions instead of serverSideProps I'm happy with this for now
    props: JSON.parse(JSON.stringify(entryData))
  }
}