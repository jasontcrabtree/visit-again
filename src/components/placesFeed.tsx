import styled from 'styled-components';

type Place = {
  name: string;
};

type Props = {
  places: Place[];
};

const PlacesFeedStyles = styled.div`
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

function PlacesFeed(props: Props): JSX.Element {
  const places = props.places;

  console.log(places);

  return (
    <PlacesFeedStyles className="places">
      <h2>Places</h2>
      {places ? (
        <ul>
          {places.map((place, i) => {
            console.log(place);
            return (
              <li key={i}>
                <h3>{place.name}</h3>
              </li>
            );
          })}
        </ul>
      ) : (
        <div>Loading</div>
      )}
    </PlacesFeedStyles>
  );
}

export default PlacesFeed;
