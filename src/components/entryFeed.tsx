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
  entries: Entry[];
  userEntries: any;
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
    background-color: var(--indigo-1000);
    border: 1px solid transparent;
  }

  img {
    width: 100%;
    max-height: 480px;
    object-fit: cover;
  }
`;

function EntryFeed(props: Props): JSX.Element {
  const userEntries = props.userEntries.entries;

  return (
    <EntryFeedStyles className="entries">
      <h3>Entries</h3>

      {userEntries ? (
        <ul>
          {userEntries.map((entry: SingleEntry, i: Key) => {
            const photos = entry?.photos;

            const formattedEntryDate = parseISO(entry.entryDate);

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
                      <a>{entry.place.name && entry.place.name}</a>
                    </Link>
                    {/* <Link
                      href={`/entry/${encodeURIComponent(
                        entry.place.address.replace(' ', '-')
                      )}`}>
                      <a>{entry.place.address && entry.place.address}</a>
                    </Link> */}
                  </div>
                )}

                {photos.length > 0 ? (
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
                )}

                <Link
                  href={`/entry/${encodeURIComponent(
                    entry.entryName.replace(' ', '-')
                  )}`}>
                  <a>
                    <h3>{entry.entryName}</h3>
                  </a>
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
