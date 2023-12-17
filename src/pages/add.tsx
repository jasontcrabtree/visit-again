import styled from 'styled-components';
import { useEffect, useRef, useState } from 'react';
import handleFileUpload from '../lib/fileUpload';
import Image from 'next/image'
import Spinner from '../components/Spinner';
import { Star, ThumbsUp, ThumbsDown } from 'phosphor-react';
import { useRouter } from 'next/router';

type Props = {
  name: string;
  state: string;
  loggedOut: boolean;
};

const AddFormMain = styled.main`
  padding: 32px 0 64px 0;
`

const AddFormStyles = styled.form`
  display: flex;
  flex-direction: column;
  gap: 12px;

  width: clamp(480px, 80vw, 960px);
  margin: 0 auto;
  background-color: var(--tw-grey-50);
  border: 1px solid var(--tw-grey-200);
  padding: 24px;
  border-radius: 8px;

  input {
    width: 100%;
  }

  image {
    height: auto;
  }

  .recommended-group {
    display: flex;
    flex-direction: row;
    gap: 8px;
  }

  .rating-group {
    display: flex;
    gap: 2px;
    flex-direction: row-reverse;
    width: fit-content;
	  justify-content: flex-end;

    svg {
      color: var(--tw-grey-500);
    }

    button:hover {
      cursor: pointer;
      background: var(--tw-green-50);

      svg {
        color: var(--tw-green-500);
      }
    }

    button:hover ~ button {
      background: var(--tw-green-50);
      svg {
        color: var(--tw-green-500);
      }
    }

    .star-active svg {
      color: var(--tw-green-500);
    }
  }

  .recommended-group {
    input[type="radio"] {
      display: none;
    }

    label {
      display: flex;
      align-items: center;
      gap: 4px;
      cursor: pointer;
      border: 1px solid var(--tw-grey-400);
      border-radius: 4px;
      padding: 16px;
    }

     .recommended-radio {
        &:checked + label {
          border: 1px solid var(--tw-green-500);
          background-color: var(--tw-green-50);
          color: var(--tw-green-500);

          svg {
            color: var(--tw-green-500);
          }
        }
      }

     .not-recommended-radio {
        &:checked + label {
          border: 1px solid var(--tw-red-700);
          background-color: var(--tw-red-50);
          color: var(--tw-red-500);

          svg {
            color: var(--tw-red-500);
          }
        }
      }

    .recommended-label {
      svg {
        color: var(--tw-grey-500);
      }

      &:hover {
        border: 1px solid var(--tw-green-500);
        background-color: var(--tw-grey-100);
        color: var(--tw-green-500);

        svg {
          color: var(--tw-green-500);
        }
      }
    }

    .not-recommended-label {
      svg {
        color: var(--tw-grey-500);
      }

      &:hover {
        border: 1px solid var(--tw-red-500);
        background-color: var(--tw-red-100);
        color: var(--tw-red-500);

        svg {
          color: var(--tw-red-500);
        }
      }
    }
  }
`;

const Home = (props: Props): React.JSX.Element => {
  const [uploading, setUploading] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');
  const [ratingState, setRatingState] = useState(0);
  const [submitting, setSubmitting] = useState(false);
  const nextRouter = useRouter();
  const formRef = useRef(null);

  const { fileUploadEventHandler, newImageUrl } = handleFileUpload();

  useEffect(() => {
    if (newImageUrl) {
      setImagePreviewUrl(newImageUrl);
      setUploading(false);
    }
  }, [newImageUrl]);

  const submitNewEntry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);

    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const formDataAsJson = Object.fromEntries(formData.entries())

    formDataAsJson.photoURL = imagePreviewUrl;
    formDataAsJson.fileName = formDataAsJson.entryName
      // @ts-expect-error
      ? encodeURIComponent(formDataAsJson.entryName)
      : `New file ${new Date()}`;
    formDataAsJson.alternateText = formDataAsJson.entryName;

    try {
      const res = await fetch('/api/create', {
        method: 'POST',
        body: JSON.stringify(formDataAsJson),
      });

      console.log('res', res);
      if (res.status === 200) {
        formRef.current.reset();
        setSubmitting(false);
        setImagePreviewUrl('');
        setRatingState(0);
        nextRouter.push('/');
      }
    } catch (error) {
      console.error(`Error ${error}`);
    }
  }

  if (!props) {
    return (
      <main>
        <h1>No data</h1>
      </main>
    );
  }

  return (
    <AddFormMain>
      <h1>Add Entry</h1>
      <AddFormStyles ref={formRef} onSubmit={(e) => { submitNewEntry(e) }}>
        <label htmlFor="entry-name">
          Meal Name
          <input
            type="text"
            name="entryName"
            required={true}
          />
        </label>

        <label htmlFor="description">
          Description
          <textarea name="description" id="description">
          </textarea>
        </label>

        <div className='recommended-group'>
          <input className="recommended-radio" id="recommended" type="radio" name="recommended" value="true" />
          <label htmlFor="recommended" className='recommended-label'>
            <ThumbsUp weight="duotone" size={24} />
            Recommended
          </label>

          <input className="not-recommended-radio" type="radio" name="recommended" id='notRecommended' value="false" />
          <label htmlFor="notRecommended" className='not-recommended-label'>
            <ThumbsDown weight="duotone" size={24} />
            Not Recommended
          </label>
        </div>

        <label htmlFor="number">
          Rating
          <div className="rating-group">
            {Array.from({ length: 5 }, (_, index) => {
              const normalisedIndex = 5 - index;
              return (
                <button
                  key={index}
                  data-index={index}
                  className={`no-button ${normalisedIndex <= ratingState ? 'star-active' : 'star-inactive'}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setRatingState(normalisedIndex);
                  }}
                >
                  <Star size={24} weight="duotone" />
                </button>
              );
            })}
          </div>

          <input
            hidden
            readOnly
            type="number"
            name="rating"
            value={ratingState}
          />
        </label>

        {imagePreviewUrl ? (
          <Image src={imagePreviewUrl} width={800}
            height={560}
            style={{ width: "100%", height: "auto" }} alt="New uploaded image" />
        ) : ""}

        {uploading
          ? <>
            <Spinner /> Loading
          </>
          : (
            <label htmlFor="photos">
              Photos
              <input type="file" name="photos" accept="image/*" onChange={(e) => {
                setUploading(true);
                setImagePreviewUrl("")
                fileUploadEventHandler(e);
              }} />
            </label>
          )}


        <label htmlFor="">
          Place
          <input type="text" name="place" />
        </label>

        <label htmlFor="">
          Area
          <input type="text" name="area" />
        </label>

        {submitting || uploading
          ? (
            <button onClick={(e) => e.preventDefault()} disabled>
              <Spinner colour='--tw-grey-50' />
            </button>)
          : <input type="submit" value="Save Entry" />}
      </AddFormStyles>
    </AddFormMain>
  );
}

export default Home;