import styled from 'styled-components';

type Entry = {
  entryName: string;
  recommended: boolean;
  rating: number;
};

type Props = {
  entries: Entry[];
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

  li:hover {
    border: 1px solid var(--indigo-800);
    background-color: var(--indigo-900);
  }
`;

function EntryFeed(props: Props): JSX.Element {
  const entries = props.entries;

  return (
    <EntryFeedStyles className="entries">
      <h3>Entries</h3>
      {entries ? (
        <ul>
          {entries.map((entry, i) => {
            console.log(entry);
            return (
              <li key={i}>
                <h3>{entry.entryName}</h3>
                {entry.recommended ? (
                  <div>Recommended</div>
                ) : (
                  <div>Not Recommended</div>
                )}
                <div>
                  {entry.rating ? <div>{entry.rating}</div> : <div>0</div>}
                </div>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>Loading</div>
      )}
    </EntryFeedStyles>
  );
}

export default EntryFeed;
