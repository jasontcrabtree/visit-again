import { useState } from 'react';
import styled from 'styled-components';
import useFormHook from '../hooks/useForm'

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
`;

export default function Home(props: Props): JSX.Element {
  async function submitNewEntry(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const formData = new FormData(e.target as HTMLFormElement);
    const formDataAsJson = Object.fromEntries(formData.entries())

    try {
      const apiData = {
        ...formDataAsJson,
      }

      await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiData),
      });
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

  // const { formInputs, handleInputChanges, handleClearForm, handleResetForm } = useFormHook({
  //   entryName: {
  //     name: 'entryName',
  //     value: '',
  //     isRequired: true,
  //     errorMessage: 'Please enter a name',
  //   },
  // });

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

        <label htmlFor="photos">
          Photos
          <input type="file" name="photos" accept="image/*" />
        </label>

        <label htmlFor="">
          Place
          <input type="text" />
        </label>

        <label htmlFor="">
          Area
          <input type="text" />
        </label>

        <label htmlFor="">
          Time
          <input
            type="time"
            name=""
            defaultValue={Date.now()}
          />
        </label>

        <label htmlFor="">
          Date
          <input
            type="date"
            name=""
          />
        </label>

        <input type="submit" value="Add Meal" />
      </AddFormStyles>
    </AddFormMain>
  );
}


