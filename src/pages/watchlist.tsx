import { authOptions } from './api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';

type Props = {
  name: string;
  state: string;
  loggedOut: boolean;
};

export default function Home(props: Props): JSX.Element {
  console.log('props', props)


  if (!props) {
    return (
      <main>
        <h1>No data</h1>
      </main>
    );
  }

  return (
    <main>
      <h1>Hello {props.name ? props.name : "World"}</h1>
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

  if (!session) {
    return {
      props: {
        loggedIn: false,
      },
    };
  }

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
};
