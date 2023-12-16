import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import styled from 'styled-components';
import clsx from 'clsx';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import Spinner from './Spinner';

const LoginButtonStyles = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;
  margin-left: auto;

  button {
    padding: 8px 40px;
    margin: 0;
    max-width: unset;
    border-radius: 100px;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 96px;
  }

  .userInitial {
    width: 40px;
    height: 40px;
    border-radius: 96px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-weight: 800;
    text-decoration: none;
  }

  @media screen and (max-width: 960px) {
    button > span,
    .userInitial {
      display: none;
    }
  }
`;

function getInitials(string: string) {
  const splitString = string.split(' ');
  return splitString.map(word => word.charAt(0)).join('');
}

export default function LoginButton({ signUpLabel = "Sign in", variation = "" }): JSX.Element {
  const [loading, setLoading] = useState(true);
  const { data: session } = useSession();

  useEffect(() => {
    setLoading(false);
  }, [session]);

  // While loading, display a spinner
  if (loading) {
    return (
      <LoginButtonStyles>
        <button className={clsx(
          variation === "ghost" ? "button-ghost" : ""
        )} onClick={() => signIn()}>
          <Spinner size={20} colour='--tw-blue-200' />
        </button>
      </LoginButtonStyles >
    );
  }

  // After loading, if no session
  if (!session) {
    return (
      <LoginButtonStyles>
        <button className={clsx(
          variation === "ghost" ? "button-ghost" : ""
        )} onClick={() => signIn()}>{signUpLabel}</button>
      </LoginButtonStyles >
    );
  }

  // After loading, if session found
  const userInitials = getInitials(session?.user.name);
  return (
    <LoginButtonStyles>
      <Link href="settings" className="userInitial">
        {session?.user?.image ? (
          <Image width={56} height={56} src={session?.user?.image} alt={session?.user?.name || "User p"} />
        ) : (
          userInitials && <span>{userInitials}</span>
        )}
      </Link>
      <button onClick={() => signOut()}>
        Sign out
      </button>
    </LoginButtonStyles>
  );
};