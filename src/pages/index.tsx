import { useState } from 'react';
import prisma from '../lib/prisma';

type Props = {
  props: any;
  authors: object;
};

export default function Home(props: Props): JSX.Element {
  const [unsafePrivate, setUnsafePrivate] = useState(false);
  const [secretWord, setSecretWord] = useState('');

  const data = props.authors[0];

  function handleFormSubmission(e) {
    e.preventDefault();
    /* This is extremely unsafe and should not be used as an actual security method.
    It is used to hide Prisma data in the base template. */
    if (secretWord === '123') {
      setUnsafePrivate(true);
    } else {
      setSecretWord('');
    }
  }

  function revertSecret() {
    setUnsafePrivate(false);
    setSecretWord('');
  }

  return (
    <main>
      <h1>Tiny JS Starter</h1>
      <p>
        This is a Next JS, TS and Prisma + SQLite template setup with files in a
        nice format
      </p>

      {unsafePrivate && (
        <div>
          {data && <h2>Hello {data.name}!</h2>}
          <p>
            This is controlled by state and hides some content but shouldn't be
            trusted for private content.
          </p>
        </div>
      )}

      <form onSubmit={handleFormSubmission}>
        <label htmlFor="secretWord">
          Code?
          <input
            type="text"
            name="secretWord"
            autoComplete="off"
            value={secretWord}
            onChange={e => setSecretWord(e.target.value)}
          />
        </label>
        <input type="submit" value="Hack-in" />
      </form>

      <button type="button" onClick={revertSecret}>
        Revert
      </button>
    </main>
  );
}

export const getServerSideProps = async () => {
  const authors = await prisma.author.findMany();

  console.log(authors);

  return {
    props: {
      authors: JSON.parse(JSON.stringify(authors)),
    },
  };
};
