import { Key } from 'react';
import styled from 'styled-components';
import EntryCard, { EntryCardTypes } from './EntryCard';

type Props = {
  userEntries: EntryCardTypes[];
};

const EntryFeedStyles = styled.div`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  img {
    width: 100%;
    max-height: 480px;
    object-fit: cover;
  }
`;

function EntryFeed({ userEntries }: Props): JSX.Element {
  console.log('userEntries', userEntries)
  return (
    <EntryFeedStyles className="entries">
      {userEntries ? (
        <ul>
          {userEntries.map((entry: EntryCardTypes, i: Key) => {
            return (
              <EntryCard keyProp={i} rating={entry.rating} entryName={entry.entryName} recommended={entry.recommended} photos={entry.photos} place={entry.place} entryDate={entry.entryDate} />
            );
          })}
        </ul>
      ) : null}
    </EntryFeedStyles>
  );
}

export default EntryFeed;
