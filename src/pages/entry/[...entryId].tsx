import type { InferGetServerSidePropsType } from 'next'
import prisma from '../../lib/prisma';
import { getServerSession } from 'next-auth';
import { authOptions } from '../api/auth/[...nextauth]';
import styled from 'styled-components';
import Image from 'next/image';
import { format, parseISO } from 'date-fns';
import { Star, ThumbsUp, Link, Bookmarks } from 'phosphor-react';
import toast from 'react-hot-toast';
import ShareGroup from '../../components/ShareGroup';

const StyledEntryMain = styled.main`
  padding: 0 0 32px 0;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  gap: 8px;

  .entry-photo {
    grid-row: 1/-1;
	  grid-column: 1/-1;
    width: 100%;
    height: 100%;
    max-width: 960px;
    max-height: 480px;
	  object-fit: cover;
  }

  h1 {
    margin: 0;
  }

  .content-group {
    grid-column: 1 / -1;
    grid-row: 1  / -1;
    padding: 24px;
    max-width: 560px;
    width: 100%;
    background: var(--tw-grey-50);
    border: var(--tw-grey-200) 1px solid;
    border-radius: 8px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin: 8px;
  }

  .header {
    display: flex;
    width: 100%;
    flex-direction: row;
    gap: 8px;
    align-items: center;
    justify-content: space-between;
  }

  .meta-group {
    display: flex;
    flex-direction: row;
    width: 100%;
    gap: 8px;
    justify-content: space-between;
    align-items: center;
  }
`

const RecommendedCard = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 0px;
    border-radius: 4px;
    padding: 4px;

    border: 1px solid var(--tw-green-500);
    background-color: var(--tw-green-50);
    color: var(--tw-green-500);

    width: fit-content;

    svg {
      color: var(--tw-green-500);
    }
`



export default function MealDrinkEntry(props): InferGetServerSidePropsType<typeof getServerSideProps> {
  console.log('props', props);

  const { url, alternateText } = props.photos[0];
  const { entryName, entryDate, description, rating, recommended } = props;

  const formattedEntryDate = format(parseISO(entryDate), "EEEE, do MMM yyyy");

  return (
    <StyledEntryMain>
      {url ? <Image className='entry-photo' priority={true} src={url} alt={alternateText} width={1920} height={560} /> : null}

      <div className="content-group">
        <div className="header">
          <h1>{entryName ? entryName : "Entry"}</h1>
          {recommended ? (
            <RecommendedCard>
              <ThumbsUp size={24} weight="duotone" />
            </RecommendedCard>
          ) : ""}
        </div>

        <div className="meta-group">
          <div className="star-group">
            {rating && (
              Array.from({ length: rating }, (_, index) => {
                return (
                  <Star key={index} size={24} weight="duotone" color="var(--tw-green-500)" />
                )
              })
            )}
          </div>
          {formattedEntryDate ? <span>{formattedEntryDate}</span> : ""}
        </div>

        {description ? <p>{description}</p> : ""}

        <ShareGroup />
      </div>

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