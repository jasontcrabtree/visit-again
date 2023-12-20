import Link from "next/link";
import Image from "next/image";
import {
    ThumbsUp,
    ThumbsDown,
    Star,
    Bookmarks
} from 'phosphor-react';
import styled from "styled-components";
import ShareGroup from "./ShareGroup";
import formatDate from '../lib/format-date';

type PhotoTypes = {
    url: string,
    alternateText: string,
    photoId: string
}

export type EntryCardTypes = {
    id?: string,
    loadFirst?: boolean,
    recommended?: boolean,
    rating?: number,
    place?: any,
    classes?: string,
    size?: string,
    entryName: string,
    entryDate?: string
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

const EntryCard = ({ id, loadFirst, recommended, rating, place, photos, entryName, entryDate, classes, size }: EntryCardTypes): JSX.Element => {
    return (
        <EntryCardstyles className={classes}>
            <div className="heading">
                <div className="heading-bar">
                    <Link href={`/entry/${id}`}>
                        <h3>{entryName}</h3>
                    </Link>

                    {size !== "small"
                        ? <ShareGroup id={id} entryName={entryName} />
                        : ""
                    }
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
                {entryDate && (
                    <div>{formatDate(entryDate)}</div>
                )}

                {rating && (
                    Array.from({ length: rating }, (_, index) => {
                        return (
                            <Star key={index} size={24} weight="duotone" color="var(--tw-green-500)" />
                        )
                    })
                )}
            </div>

            {photos.length > 0 ? (
                photos.map((photo: PhotoTypes, index) => {
                    if (photo.url) {
                        return (
                            <Image
                                priority={loadFirst}
                                key={index}
                                src={photo.url}
                                alt={photo.alternateText}
                                width={400}
                                height={260}
                            />
                        );
                    }
                    else return null;
                })
            ) : null}
        </EntryCardstyles>
    )
}

export default EntryCard;