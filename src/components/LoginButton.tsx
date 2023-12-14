import Link from 'next/link';
import { useSession, signIn, signOut } from 'next-auth/react';
import { UserCircleMinus } from 'phosphor-react';
import styled from 'styled-components';
import clsx from 'clsx';

const LoginButtonStyles = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;

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

function getInitials(string) {
  const splitString = string.split(' ');
  return splitString.map(word => word.charAt(0)).join('');
}

export default function LoginButton({ signUpLabel = "Sign in", variation = "" }): JSX.Element {
  const { data: session } = useSession();

  if (!session) {
    return (
      <LoginButtonStyles>
        <button className={clsx(
          variation === "ghost" ? "button-ghost" : ""
        )} onClick={() => signIn()}>{signUpLabel}</button>
      </LoginButtonStyles >
    );
  }

  const userInitials = getInitials(session?.user.name);
  return (
    <LoginButtonStyles>
      <Link href="settings" className="userInitial">

        {/* { session?.user?.image ? (
        <img src={session?.user?.image} alt={session?.user?.name} />
      ) : (
        userInitials && <span>{userInitials}</span>
        )} */}
        {userInitials && <span>{userInitials}</span>}

      </Link>
      <button onClick={() => signOut()}>
        <span>Sign out</span>
        <UserCircleMinus size={24} color="#94a3b8" weight="bold" />
      </button>
    </LoginButtonStyles>
  );
};