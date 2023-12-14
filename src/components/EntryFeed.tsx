import Link from 'next/link';
import { Key } from 'react';
import styled from 'styled-components';
import { parseISO } from 'date-fns';

type Entry = {
  entryName: string;
  recommended: boolean;
  rating: number;
};

type Photo = {
  url: string;
  alternateText: string;
};

type SingleEntry = {
  photos: Photo[];
  entryName: string;
  recommended: boolean;
  place: any;
  rating: number;
  entryDate: any;
  formattedEntryDate: any;
};

type Props = {
  userEntries: Entry[];
};

const EntryFeedStyles = styled.div`
  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    display: flex;
    flex-direction: column;
    gap: 16px;
    margin-top: 24px;
  }

  li {
    padding: 16px;
    border-radius: 8px;
    border: 1px solid transparent;
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
      <h1>Entries</h1>

      {userEntries ? (
        <ul>
          {userEntries.map((entry: SingleEntry, i: Key) => {
            const photos = entry?.photos;

            const formattedEntryDate = parseISO(entry.entryDate);

            console.log(entry);

            return (
              <li key={i}>
                {entry.recommended ? (
                  <div>Recommended</div>
                ) : (
                  <div>Not Recommended</div>
                )}

                {formattedEntryDate && (
                  <div>{formattedEntryDate.toString()}</div>
                )}

                {entry.rating && <div>{entry.rating}</div>}

                {entry.place && (
                  <div>
                    <Link
                      href={`/places/${encodeURIComponent(
                        entry.place.name.replace(' ', '-')
                      )}`}>
                      {entry.place.name && entry.place.name}
                    </Link>
                    {/* <Link
                      href={`/entry/${encodeURIComponent(
                        entry.place.address.replace(' ', '-')
                      )}`}>
                      {entry.place.address && entry.place.address}
                    </Link> */}
                  </div>
                )}

                {/* {photos.length > 0 ? (
                  photos.map((photo: Photo, photoId: Key) => {
                    return (
                      <img
                        key={photoId}
                        src={photo.url}
                        alt={photo.alternateText}
                      />
                    );
                  })
                ) : (
                  <div>No photos</div>
                )} */}

                <Link
                  href={`/entry/${encodeURIComponent(
                    entry.entryName.replace(' ', '-')
                  )}`}>

                  <h3>{entry.entryName}</h3>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : null}
    </EntryFeedStyles>
  );
}

export default EntryFeed;
