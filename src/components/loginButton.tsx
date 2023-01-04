import { useSession, signIn, signOut } from 'next-auth/react';
import Link from 'next/link';
import { UserCircleMinus } from 'phosphor-react';
import styled from 'styled-components';

const LoginButtonStyles = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 16px;

  button {
    padding: 8px 24px;
    margin: 0;
    max-width: unset;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 96px;
  }

  .userInitial {
    background-color: var(--emerald-800);
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

    button {
      padding: 12px;
    }
  }
`;

function getInitials(string) {
  const splitString = string.split(' ');
  const returnedInitals = splitString.map(word => {
    return word.charAt(0);
  });
  return returnedInitals;
}

export default function LoginButton(): JSX.Element {
  const { data: session } = useSession();

  if (session) {
    const userInitials = getInitials(session?.user.name);
    return (
      <LoginButtonStyles>
        <Link href="settings">
          <a className="userInitial">
            {/* {session?.user?.image ? (
              <img src={session?.user?.image} alt={session?.user?.name} />
            ) : (
              <span>{userInitials}</span>
              )} */}
            <span>{userInitials}</span>
          </a>
        </Link>
        <button onClick={() => signOut()}>
          <span>Sign out</span>
          <UserCircleMinus size={24} color="#94a3b8" weight="bold" />
          {/* User */}
        </button>
      </LoginButtonStyles>
    );
  }

  return (
    <LoginButtonStyles>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </LoginButtonStyles>
  );
}
