/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import styled, { keyframes } from 'styled-components';
import {
  Coffee,
  FolderStar,
  PlusCircle,
} from 'phosphor-react';
import LoginButton from './LoginButton';
import { Rock_Salt } from 'next/font/google'

const rockSalt = Rock_Salt({ weight: "400", subsets: ['latin'], preload: true })

const HeaderStyles = styled.header`
background-color: var(--tw-blue-200);
background-image: linear-gradient(270deg, #e0f2fe, var(--tw-blue-200));
color: var(--tw-grey-700);

  nav {
  max-width: clamp(480px,80vw,960px);
  margin: 0 auto;
  padding: 16px 0;

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 8px;

  a {
    min-width: 48px;
    min-height: 48px;
    display: flex;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    gap: 4px;
    color: var(--tw-grey-700);
  }

  a:hover {
    color: var(--tw-green-500);
  }

  nav {
    margin-right: auto;
  }

  ul {
    list-style: none;
    padding: 0;
    margin: 0;
    padding-inline-start: 0;
    display: flex;
    flex-direction: row;
  }

  .logo {
    min-width: 48px;
    padding: 8px 4px;
    border-radius: 96px;
    font-size: 18px;
    color: var(--tw-blue-500);
    fill: var(--tw-blue-500);
    stroke: var(--tw-blue-500);
  }

  .logo>svg {
    stroke: none;
  }

  .logo:hover, .logo:hover>svg{
    color: var(--tw-blue-200);
    fill: var(--tw-blue-200);
    stroke: var(--tw-blue-200);
    background-color: var(--tw-blue-800);
    border-radius: 4px;
  }

  ul {
    a>svg {
      color: var(--tw-blue-500);
    }
    a:hover>svg {
      color: var(--tw-blue-200);
    }
    a:hover {
      background-color: var(--tw-blue-800);
      border-radius: 4px;
    }
  }
}

  @media screen and (max-width: 960px) {
      .userInitial {
        display: none;
      }

      flex-wrap: wrap;
      padding: 16px 24px;

      nav {
        margin-right: 0;
      }

      ul {
        justify-content: space-between;
      }
    }
`;

type HeaderProps = {
  isLoggedIn: boolean;
}

export default function Header({ isLoggedIn }: HeaderProps): JSX.Element {
  if (isLoggedIn === false) {
    return (
      <HeaderStyles>
        <nav>
          <Link href="/" className="logo">
            <Coffee size={24} weight="bold" />
            <span className={rockSalt.className}>Visit Again</span>
          </Link>
        </nav>
      </HeaderStyles>
    )
  }

  return (
    <HeaderStyles>
      <nav>
        <Link href="/" className="logo">
          <Coffee size={24} weight="bold" /> {/* Coffee */}
          <span>Visit Again</span>
        </Link>
        <ul>
          <li>
            <Link href="/add">
              <PlusCircle size={24} weight="bold" />
            </Link>
          </li>
          <li>
            <Link href="/watchlist">
              <FolderStar size={24} weight="bold" />
            </Link>
          </li>
          {/* TODO: Implement search */}
          {/* <li>
            <Link href="/search">
              <MagnifyingGlass size={24} color="var(--tw-blue-500)" weight="bold" />
            </Link>
          </li> */}
          {/* TODO: Implement settings */}
          {/* <li>
            <Link href="/settings">
              <Gear size={24} color="var(--tw-blue-500)" weight="bold" />
            </Link>
          </li> */}
        </ul>
        <LoginButton />
      </nav>
    </HeaderStyles>
  );
}
