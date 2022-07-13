import { useRouter } from 'next/dist/client/router';

export default function MealDrinkEntry(): JSX.Element {
  const router = useRouter();

  const { entryId } = router.query;

  return (
    <section>
      <h1>Entry for {entryId}</h1>
    </section>
  );
}
