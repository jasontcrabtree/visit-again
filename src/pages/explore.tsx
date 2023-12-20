import styled from 'styled-components';
import useSWR from 'swr';

import swrFetcher from '../lib/swr-fetcher';
import EntryCard from '../components/EntryCard';
import Spinner from '../components/Spinner';

type Props = {
  props: any;
  name: string;
  randomEntries: any;
  loggedIn: Boolean;
};

const StylesExploreMain = styled.main`
  padding: 32px 24px 64px 24px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: center;

  section {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
    width: 100%;
    gap: 16px;

    .item {
      height: auto;
      width: 100%;

      img {
        object-fit: cover;
        aspect-ratio: 1.66 / 1;
        width: 100%;
      }

      .heading-bar {
        flex-direction: column;
        align-items: flex-start;
      }

      .share-group {
        margin: 0;
      }
    }

    @media screen and (max-width: 760px) {
      grid-template-columns: 1fr;
    }
  }
`

const Explore = (props: Props): JSX.Element => {
  const { data, error, isLoading } = useSWR('/api/entries/read?method=random', swrFetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    refreshInterval: 0
  });

  if (error) {
    return (
      <StylesExploreMain>
        <h1>Unexpected error: {error}</h1>
      </StylesExploreMain>
    )
  }

  if (isLoading) {
    return (
      <StylesExploreMain>
        <h1>Loading data</h1>
        <Spinner size={48} />
      </StylesExploreMain>
    )
  }

  if (data) {
    return (
      <StylesExploreMain>
        <h1>Explore other Entries</h1>
        {data.length > 0 ? (
          <section>
            {data.map(({ entryName, createdAt, id, rating, photos }) => {
              return (
                <EntryCard classes="item" key={id} id={id} rating={rating} entryName={entryName} photos={photos} />
              )
            })}
          </section>
        ) : ""}
      </StylesExploreMain >
    );
  }
}

export default Explore;