import styled from 'styled-components';
import { useEffect, useState } from 'react';
import handleFileUpload from '../lib/fileUpload';
import Image from 'next/image'
import Spinner from '../components/Spinner';

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
  gap: 16px;

  width: clamp(480px, 80vw, 960px);
  margin: 0 auto;
  background-color: var(--tw-grey-50);
  border: 1px solid var(--tw-grey-200);
  padding: 24px;
  border-radius: 8px;

  display: flex;
  flex-direction: column;
  gap: 8px;

  input {
    width: 100%;
  }

  label {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: 4px;
  }

  image {
    height: auto;
  }
`;

const Home = (props: Props): React.JSX.Element => {
  const [uploading, setUploading] = useState(false);
  const [imagePreviewUrl, setImagePreviewUrl] = useState('');

  const submitNewEntry = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formDataAsJson = Object.fromEntries(formData.entries())

    console.log('formDataAsJson', formDataAsJson)

    try {
      const apiData = {
        ...formDataAsJson,
      }

      await fetch('/api/create', {
        method: 'POST',
        body: JSON.stringify(apiData),
      });
    } catch (error) {
      console.error(`Error ${error}`);
    }
  }

  const { fileUploadEventHandler, newImageUrl } = handleFileUpload();

  useEffect(() => {
    if (newImageUrl) {
      setImagePreviewUrl(newImageUrl);
      setUploading(false);
    }
  }, [newImageUrl]);

  if (newImageUrl) {
    console.log('newImageUrl', newImageUrl);
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
      <AddFormStyles onSubmit={(e) => { submitNewEntry(e) }}>
        <label htmlFor="entry-name">
          Meal Name
          <input
            type="text"
            name="entryName"
            required={true}
          />
        </label>

        <label htmlFor="recommended">
          Recommended
          <input
            type="checkbox"
            name="recommended"
          />
        </label>

        <label htmlFor="">
          Rating
          <input
            type="number"
            defaultValue={1}
            name=""
            id=""
            min={1}
            max={5}
            step={0.5}
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

        <input type="submit" value="Add Meal" />
      </AddFormStyles>
    </AddFormMain>
  );
}

export default Home;