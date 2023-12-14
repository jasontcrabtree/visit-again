import { authOptions } from './api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

type Props = {
  name: string;
  state: string;
  loggedOut: boolean;
};

export default function Home(props: Props): JSX.Element {
  const data = props;

  if (!data) {
    return (
      <main>
        <h1>No data</h1>
      </main>
    );
  }

  return (
    <main>
      <h1>User Settings</h1>
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
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    // const entries = await prisma.entry.findMany({
    //   where: {
    //     User: {
    //       email: session.user.email,
    //     },
    //   },
    // });

    return {
      props: {
        loggedIn: true,
      },
    };
  }

  if (!session) {
    return {
      props: {
        loggedIn: false,
      },
    };
  }
};
