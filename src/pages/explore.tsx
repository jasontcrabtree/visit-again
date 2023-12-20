import Image from 'next/image'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { authOptions } from './api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
import styled from 'styled-components';

import prisma from '../lib/prisma';
import EntryFeed from '../components/EntryFeed';
import PlacesFeed from '../components/PlacesFeed';
import LoginButton from '../components/LoginButton';
import Link from 'next/link';
import useSWR from 'swr';
import swrFetcher from '../lib/swr-fetcher';
import EntryCard from '../components/EntryCard';

type Props = {
  props: any;
  name: string;
  randomEntries: any;
  loggedIn: Boolean;
};

const StylesExploreMain = styled.main`
  padding: 32px 0 64px 0;
`

const Explore = (props: Props): JSX.Element => {

  // const { randomEntries } = props;

  // console.log('randomEntries', randomEntries);

  const session = useSession();
  const { data, error, isLoading } = useSWR('/api/entries/read?method=random', swrFetcher);

  console.log('data', data);

  // if (error) {
  //   return (
  //     <StylesExploreMain>
  //       <h1>Unexpected error: {error}</h1>
  //     </StylesExploreMain>
  //   )
  // }

  // if (isLoading) {
  //   return (
  //     <StylesExploreMain>
  //       <h1>Loading data</h1>
  //       <Spinner size={48} />
  //     </StylesExploreMain>
  //   )
  // }



  if (data) {


    return (
      <StylesExploreMain>
        <h1>Explore</h1>
        {data.length > 0 ? (
          <div>
            {data.map(({ entryName, createdAt, id, rating, photos }) => {
              return (
                <EntryCard classes="item" key={id} id={id} rating={rating} entryName={entryName} photos={photos} size="small" />
              )
            })}
          </div>
        ) : ""}
      </StylesExploreMain >
    );
  }
}

export default Explore;