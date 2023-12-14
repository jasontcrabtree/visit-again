import { authOptions } from './api/auth/[...nextauth]';
import { getSession } from 'next-auth/react';
import { useState } from 'react';
import styled from 'styled-components';

type Props = {
  name: string;
  state: string;
  loggedOut: boolean;
};

// type Entry = {
//   entryName: string;
//   recommended: boolean;
//   rating: number;
// };

// type Photo = {
//   url: string;
//   alternateText: string;
// };

// type SingleEntry = {
//   photos: Photo[];
//   entryName: string;
//   recommended: boolean;
//   place: any;
//   rating: number;
//   entryDate: any;
//   formattedEntryDate: any;
// };

const AddFormStyles = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;

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
  const data = props;

  const [entryName, setEntryName] = useState('');
  const [recommended, setRecommended] = useState(false);
  const [rating, setRating] = useState(0);
  const [photoURL, setPhotoURL] = useState('');
  const [photoALT, setPhotoALT] = useState('');
  const [place, setPlace] = useState('');
  const [region, setRegion] = useState('');
  const [hour, setHour] = useState(0);
  const [date, setDate] = useState(0);
  const [entryDate, setEntryDate] = useState('');

  async function submitNewEntry(e: { preventDefault: () => void }) {
    e.preventDefault();

    try {
      const body = {
        entryName,
        recommended,
        rating,
        photoURL,
        photoALT,
        place,
        region,
        entryDate,
      };

      console.log('body', body);

      await fetch('/api/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
    } catch (error) {
      console.error(`Error ${error}`);
    }
  }

  if (!data) {
    return (
      <main>
        <h1>No data</h1>
      </main>
    );
  }

  return (
    <main>
      <h1>Add new entry</h1>
      <AddFormStyles onSubmit={submitNewEntry}>
        <label htmlFor="entry-name">
          Meal Name
          <input
            type="text"
            name="entry-name"
            onChange={e => setEntryName(e.target.value)}
          />
        </label>

        <label htmlFor="recommended">
          Recommended
          <input
            type="checkbox"
            name="recommended"
            onChange={e =>
              e.target.checked ? setRecommended(true) : setRecommended(false)
            }
          />
        </label>

        <label htmlFor="">
          Rating
          <input
            type="number"
            defaultValue={1}
            onChange={e => setRating(e.target.valueAsNumber)}
            name=""
            id=""
            min={1}
            max={5}
            step={0.5}
          />
        </label>

        <label htmlFor="">
          Photo URL
          <input type="text" onChange={e => setPhotoURL(e.target.value)} />
        </label>

        <label htmlFor="">
          Photo ALT
          <input type="text" onChange={e => setPhotoALT(e.target.value)} />
        </label>

        <label htmlFor="">
          Place
          <input type="text" onChange={e => setPlace(e.target.value)} />
        </label>

        <label htmlFor="">
          Area [Suburb/City]
          <input type="text" onChange={e => setRegion(e.target.value)} />
        </label>

        {/* <label htmlFor="">
          Time
          <input
            type="time"
            name=""
            id=""
            defaultValue={Date.now()}
            onChange={e => setHour(e.target.valueAsNumber)}
          />
        </label>

        <label htmlFor="">
          Date
          <input
            type="date"
            name=""
            id=""
            onChange={e => setDate(e.target.valueAsNumber)}
          />
        </label> */}

        <input type="submit" value="Add Meal" />
      </AddFormStyles>
    </main>
  );
}

export const getServerSideProps = async (
  context: any
): Promise<{
  props: {
    loggedIn: boolean;
  };
}> => {
  // const session = await getServerSession(
  //   context.req,
  //   context.res,
  //   authOptions
  // );

  // if (session) {
  //   // const entries = await prisma.entry.findMany({
  //   //   where: {
  //   //     User: {
  //   //       email: session.user.email,
  //   //     },
  //   //   },
  //   // });

  //   return {
  //     props: {
  //       loggedIn: true,
  //     },
  //   };
  // }

  // if (!session) {
  //   return {
  //     props: {
  //       loggedIn: false,
  //     },
  //   };
  // }

  return {
    props: {
      loggedIn: true,
    }
  }
};
