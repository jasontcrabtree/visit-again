import { authOptions } from './api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
import prisma from '../lib/prisma';
import styled from 'styled-components';
import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import useSWR from 'swr'
import swrFetcher from '../lib/swr-fetcher';
import Spinner from '../components/Spinner';
import EntryCard from '../components/EntryCard';

const StyledWatchListMain = styled.main`
  padding: 32px 0 64px 0;
  max-width: 960px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
`

const StyledWatchListGrid = styled.section`
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 8px;

  @media screen and (max-width: 760px) {
    grid-template-columns: 1fr;
  }

  .item {
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    justify-content: flex-start;
    align-items: center;
    padding: 8px;
    background: var(--tw-grey-50);
    border: 1px solid var(--tw-grey-200);
    border-radius: 8px;

    img {
      height: 260px;
      width: 100%;
      object-fit: cover;
      border-radius: 8px;
      margin-top: auto;
    }
  }
`

const WatchList = (): JSX.Element => {
  const session = useSession();
  const { data, error, isLoading } = useSWR('/api/watchlist/read', swrFetcher)

  if (session.status === "unauthenticated") {
    return (
      <StyledWatchListMain>
        <h1>No data</h1>
      </StyledWatchListMain>
    );
  }

  if (error) {
    return (
      <StyledWatchListMain>
        <h1>Unexpected error: {error}</h1>
      </StyledWatchListMain>
    )
  }

  if (isLoading) {
    return (
      <StyledWatchListMain>
        <h1>Loading data</h1>
        <Spinner size={48} />
      </StyledWatchListMain>
    )
  }

  if (data) {
    return (
      <StyledWatchListMain>
        <h1>{data.length} Items in Watchlist:</h1>
        {data.length > 0 ? (
          <StyledWatchListGrid>
            {data.map(({
              Entry: { entryName, createdAt, id, rating, photos } }) => {
              return (
                <EntryCard classes="item" key={id} id={id} rating={rating} entryName={entryName} photos={photos} size="small" />
              )
            })}
          </StyledWatchListGrid>
        ) : ""}

      </StyledWatchListMain>
    );
  }
}

export default WatchList;