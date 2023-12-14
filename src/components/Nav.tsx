/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import styled from 'styled-components';
import {
  Coffee,
  FolderStar,
  Gear,
  MagnifyingGlass,
  PlusCircle,
  Waves,
} from 'phosphor-react';
import LoginButton from './LoginButton';
import { Rock_Salt } from 'next/font/google'

const rockSalt = Rock_Salt({ weight: "400", subsets: ['latin'], preload: true })

const HeaderStyles = styled.header`
background-color: var(--tw-blue-200);
background-image: linear-gradient(270deg, #e0f2fe, var(--tw-blue-200));
color: var(--tw-grey-700);

  nav {

  max-width: 1080px;
  margin: 0 auto;
  padding: 24px;

  display: flex;
  flex-direction: row;
  justify-content: space-evenly;
  align-items: center;
  width: 100%;
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
    color: var(--teal-green);
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
    gap: 8px;
  }

  .logo {
    min-width: 48px;
    padding: 8px 0;
    border-radius: 96px;
    font-size: 18px;
    color: var(--tw-blue-500);
    fill: var(--tw-blue-500);
    stroke: var(--tw-blue-500);
  }

  .logo>svg {
    stroke: none;
  }

  .logo:hover, .logo:hover>svg {
    color: var(--tw-blue-800);
    fill: var(--tw-blue-800);
    stroke: var(--tw-blue-800);
  }

  @media screen and (max-width: 960px) {
    .userInitial {
      display: none;
    }

    flex-wrap: wrap;
    justify-content: space-between;
    padding: 16px 24px;

    nav {
      margin-right: 0;
    }

    ul {
      justify-content: space-between;
    }
  }
  }
`;

type HeaderProps = {
  isLoggedIn: boolean;
}

export default function Header({ isLoggedIn }: HeaderProps): JSX.Element {
  console.log('isLoggedIn', isLoggedIn);

  if (!isLoggedIn) {
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
        <nav>
          <ul>
            {/* <li>
            <Link href="/">
              <Waves size={24} color="var(--teal-green)" weight="bold" />
            </Link>
          </li> */}
            <li>
              <Link href="/add">
                <PlusCircle size={24} color="var(--teal-green)" weight="bold" />
              </Link>
            </li>
            <li>
              <Link href="/watchlist">
                <FolderStar size={24} color="var(--teal-green)" weight="bold" />
              </Link>
            </li>
            {/* TODO: Implement search */}
            {/* <li>
            <Link href="/search">
              <MagnifyingGlass size={24} color="var(--teal-green)" weight="bold" />
            </Link>
          </li> */}
            {/* TODO: Implement settings */}
            {/* <li>
            <Link href="/settings">
              <Gear size={24} color="var(--teal-green)" weight="bold" />
            </Link>
          </li> */}
          </ul>
        </nav>
        <LoginButton />
      </nav>
    </HeaderStyles>
  );
}
