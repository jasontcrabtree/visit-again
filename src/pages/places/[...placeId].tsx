import { useRouter } from 'next/dist/client/router';

export default function PlacesPages(): JSX.Element {
  const router = useRouter();

  // Grab our ID parameter

  // console.log(router.query);

  const { placeId } = router.query;

  return <div>{placeId ? <h1>{placeId}</h1> : null}</div>;
}
