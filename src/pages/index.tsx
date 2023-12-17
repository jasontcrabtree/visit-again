import Image from 'next/image'
import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { authOptions } from './api/auth/[...nextauth]';
import { getServerSession } from 'next-auth/next';
import styled from 'styled-components';

import prisma from '../lib/prisma';
import EntryFeed from '../components/EntryFeed';
import PlacesFeed from '../components/PlacesFeed';
import LoginButton from '../components/LoginButton';
import Link from 'next/link';

type Props = {
  props: any;
  name: string;
  userEntries: any;
  loggedIn: Boolean;
};

const StyledLoggedOutView = styled.main`
display: flex;
flex-direction: column-reverse;
justify-content: space-between;
width: 100%;
gap: 24px;

section {
  display: flex;
  flex-direction: column;
  gap: 32px;
  align-items: center;
  justify-content: space-evenly;
  text-align: center;

  color: var(--tw-green-800);

  padding: 16px;

  h1 {
    font-size: 72px;
  }

  p {
    font-size: 20px;
    max-width: 48ch;
  }

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .button-group {
    display: flex;
    flex-direction: row;
    gap: 16px;
  }

  .divider {
    margin: 0;
    width: 100%;
    background-color: var(--tw-blue-200);
    height: 2px;
  }

  .project {
    border-radius: 4px;
    background: var(--tw-grey-800);
    color: var(--tw-blue-200);

    a {
      color: var(--tw-blue-200);
    }

    font-size: 16px;
    padding: 24px;
    display: flex;
    flex-direction: column;
    gap: 8px;
    width: 100%;
    justify-content: flex-start;
    text-align: left;

    ul {
      width: 100%;
      padding-left: 24px;
    }

    p {
      max-width: unset;
      width: 100%;
      text-align: left;
      font-size: 16px;
    }

    .profile-pic {
      width: 64px;
      height: 64px;
      border-radius: 100px;
    }

    .bio {
      display: flex;
      flex-direction: row;
      gap: 8px;
      width: 100%;
      align-items: center;
    }

    h2 {
      text-align: left;
      width: 100%;
      margin-left: 0;
      font-size: 20px;
      line-height: 1.2;
    }
  }
}

.hero-image {
  object-fit: cover;
  height: 100%;
  max-height: 40vw;
}

@media screen and (min-width: 960px) {
  overflow: hidden;
  flex-direction: row;

  section {
        width: 50%;
        padding: 24px 0 24px 24px;
        gap: 16px;
    }

    .hero-image {
      width: 50%;
      height: calc(100vh - 96px);
      max-height: unset;
    }
  }
`

const StylesLoggedInView = styled.main`
  padding: 32px 0 64px 0;
`

export default function Home(props: Props):
  JSX.Element {

  const { userEntries } = props;

  if (!props.loggedIn) {
    return (
      <StyledLoggedOutView>
        <section>
          <div>
            <h1>Visit Again</h1>
            <p>Rate, review, recommend and log the food and drink you enjoy this summer</p>
            <div className="button-group">
              <LoginButton signUpLabel="Sign In" variation="ghost" />
              <LoginButton signUpLabel="Sign Up" />
            </div>
          </div>

          <div className="divider"></div>

          <div className="project">
            <div className='bio'>
              <Image className='profile-pic' src="https://res.cloudinary.com/jasontcrabtree/image/upload/f_auto,q_auto/v1/Visit%20Again/deom5sslohcrqa0vyqgx" width={64} height={64} alt="profile pic of Jason" blurDataURL='data:image/jpeg;base64,/9j/4AAQSkZJRgABAQEASABIAAD/4gxYSUNDX1BST0ZJTEUAAQEAAAxITGlubwIQAABtbnRyUkdCI' placeholder='blur' />
              <div>
                <h2>Demo NextJS App built by <Link href="https://github.com/jasontcrabtree"> Jason Crabtree
                </Link>
                </h2>
                <p>
                  The app lets users submit a "review" of a food or drink establishment, which then shows in a reverse feed. Each review can be edited after creation. Each review generates two dynamic pages, a public link for the actual review, and if not already created, a public link for reviewed establishment.
                </p>
              </div>
            </div>
            <p>Technology and tools used:</p>
            <ul>
              <li>NextJS, TypeScript and React (with Next Pages Router) for client and server, with database operations serverside</li>
              <li>Prisma with a Vercel Postgres database for data storage and CRUD operations</li>
              <li>NextAuth for login and authentication using a Google login account provider</li>
              <li>GitHub for version control and hosting, and Vercel for CI/CD deployment. Lint checks run on deployment</li>
              <li>Styled-Components, CLSX, and phosphor-react icons for styling, with CSS variable styles</li>
            </ul>
          </div>
        </section>
        <Image className='hero-image' src="https://res.cloudinary.com/jasontcrabtree/image/upload/f_auto,q_auto/v1/Visit%20Again/su8xokvzfrxhnxzzja50" width={1200} height={480} alt="White, weatherboard hotel in Cardona, New Zealand" />
      </StyledLoggedOutView>
    )
  }


  if (userEntries.length <= 0) {
    return (
      <main>
        <h1>No data</h1>
      </main>
    );
  }

  return (
    <StylesLoggedInView>
      <h1>Home</h1>
      <EntryFeed userEntries={userEntries} />
      {/* <PlacesFeed places={places} /> */}
    </StylesLoggedInView>
  );
}

export const getServerSideProps = async (
  context: any
): Promise<{
  props: {
    userEntries: unknown;
    loggedIn: boolean;
  };
}> => {
  const session = await getServerSession(
    context.req,
    context.res,
    authOptions
  );

  if (session) {
    const userEntries = await prisma.user.findUnique({
      where: {
        email: session.user.email,
      },
      select: {
        name: true,
        entries: {
          orderBy: {
            createdAt: 'desc',
          },
          include: {
            photos: {},
            place: {},
          },
          // select: {
          //   place: {},
          //   photos: {},
          // },
        },
      },
    });

    // const places = await prisma.place.findMany();
    return {
      props: {
        loggedIn: true,
        userEntries: JSON.parse(JSON.stringify(userEntries)).entries,
      },
    };
  }

  if (!session) {
    return {
      props: {
        loggedIn: false,
        userEntries: false,
      },
    };
  }
};
