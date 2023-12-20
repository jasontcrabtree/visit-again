import { useRouter } from 'next/dist/client/router';
import { unstable_getServerSession } from 'next-auth/next';
import prisma from '../../lib/prisma';
import { authOptions } from '.././api/auth/[...nextauth]';

type Props = {
  userPlaces: any;
};

export default function PlacesPages(props: Props): JSX.Element {
  const router = useRouter();
  const { placeId } = router.query;

  return <div>{placeId ? <h1>{placeId}</h1> : null}</div>;
}

export const getServerSideProps = async (
  context: any
): Promise<{
  props: {};
}> => {
  const session = await unstable_getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    const userPlaces = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        entries: {
          select: {
            place: {},
          },
        },
      },
    });

    // const places = await prisma.place.findMany();

    return {
      props: {
        userPlaces: JSON.parse(JSON.stringify(userPlaces)),
        // entries: JSON.parse(JSON.stringify(entries)),
        // userEntries: JSON.parse(JSON.stringify(userEntries)),
      },
    };
  }

  if (!session) {
    return {
      props: {
        userPlaces: false,
      },
    };
  }
};
