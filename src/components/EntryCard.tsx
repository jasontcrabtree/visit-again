import { Key } from "react";
import { parseISO, format } from 'date-fns';
import Link from "next/link";
import Image from "next/image";
import {
    ThumbsUp,
    ThumbsDown,
    Star,
    Bookmarks
} from 'phosphor-react';
import styled from "styled-components";

type PhotoTypes = {
    url: string,
    alternateText: string,
    photoId: string
}

export type EntryCardTypes = {
    keyProp: Key,
    recommended: boolean,
    rating: number,
    place: any,
    entryName: string,
    entryDate: string
    photos: PhotoTypes[],
}

const EntryCardstyles = styled.li`
    width: clamp(480px, 80vw, 960px);
    margin: 0 auto;
    background-color: var(--tw-grey-50);
    border: 1px solid var(--tw-grey-200);
    padding: 24px;
    border-radius: 8px;

    display: flex;
    flex-direction: column;
    gap: 8px;

    .heading {
        display: flex;
        flex-direction: column;
        width: 100%;
        justify-content: flex-start;
        gap: 8px;
    }

    .heading-bar {
        display: flex;
        flex-direction: row;
        gap: 16px;
        width: 100%;
        justify-content: space-between;
        align-items: center;

        button {
            margin: 0;
        }
    }

    .heading-meta {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 100%;
        gap: 2px;
        font-size: 14px;
        a {
            color: var(--tw-grey-500);
        }
    }

    .meta {
        display: flex;
        flex-direction: row;
        align-items: center;
        gap: 8px;

        div {
            margin-right: auto;
        }
    }
`

const addToWatchList = () => {
    console.log('Adding to watchlist')
}

const EntryCard = ({ keyProp, recommended, rating, place, photos, entryName, entryDate }: EntryCardTypes): JSX.Element => {

    const formattedEntryDate = format(parseISO(entryDate), "EEEE, do MMM yyyy");

    return (
        <EntryCardstyles key={keyProp}>
            <div className="heading">
                <div className="heading-bar">
                    <Link
                        href={`/entry/${encodeURIComponent(
                            entryName.replace(' ', '-').toLowerCase()
                        )}`}>

                        <h3>{entryName}</h3>
                    </Link>
                    <button className="button-small" onClick={
                        () => addToWatchList()}
                    >
                        <Bookmarks size={20} color="white" weight="bold" />
                        Watchlist
                    </button>
                </div>

                {place && (
                    <div className="heading-meta">
                        <Link
                            href={`/places/${encodeURIComponent(
                                place.name.replace(' ', '-').toLowerCase()
                            )}`}>
                            {place.name && place.name}
                        </Link>
                        <Link
                            href={`/area/${encodeURIComponent(
                                place.address.replace(' ', '-').toLowerCase()
                            )}`}>
                            {place.address && `${place.address}`}
                        </Link>
                    </div>
                )}
            </div>

            <div className="meta">
                {/* {recommended ? (
                    <ThumbsUp weight="duotone" size={24} color="var(--tw-green-500)" />
                ) : (
                    <ThumbsDown weight="duotone" size={24} color="var(--tw-grey-500)" />
                )} */}

                {formattedEntryDate && (
                    <div>{formattedEntryDate.toString()}</div>
                )}

                {rating && (
                    Array.from({ length: rating }, () => {
                        return (
                            <Star size={24} weight="duotone" color="var(--tw-green-500)" />
                        )
                    })
                )}
            </div>

            {photos.length > 0 ? (
                photos.map((photo: PhotoTypes) => {
                    return (
                        <Image
                            key={photo.photoId}
                            src={photo.url}
                            alt={photo.alternateText}
                            width="400"
                            height="260"
                        />
                    );
                })
            ) : (
                <Image src="https://res.cloudinary.com/jasontcrabtree/image/upload/f_auto,q_auto/v1/Visit%20Again/utudza0vznogeam52la7" width="400" height="260" alt="Donuts, donuts, donuts" />
            )}
        </EntryCardstyles>
    )
}

export default EntryCard;