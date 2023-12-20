/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import { useSession } from "next-auth/react"
import styled, { keyframes } from 'styled-components';
import {
  Coffee,
  FolderStar,
  List,
  Lightning,
  PlusCircle,
} from 'phosphor-react';
import LoginButton from './LoginButton';
import { Rock_Salt } from 'next/font/google'
import { useState } from 'react';
import clsx from 'clsx';

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
    gap: 24px;

  a {
    min-width: 48px;
    min-height: 48px;
    display: flex;
    padding: 0 4px;
    justify-content: center;
    align-items: center;
    text-decoration: none;
    gap: 4px;
    color: var(--tw-blue-500);

    svg {
      color: var(--tw-blue-500);
    }
  }

  a:hover {
    color: var(--tw-blue-200);

    svg {
      color: var(--tw-blue-800);
      fill: var(--tw-blue-800);
    }
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
    gap: 24px;
  }

  .logo {
    min-width: fit-content;
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

  .mobile-wrapper {
    display: flex;
	  justify-content: space-between;
	  gap: 8px;
	  width: 100%;
  }
  }

  @media screen and (max-width: 760px) {
    nav {
      justify-content: space-between;
    }

      .userInitial {
        display: none;
      }

      .mobile-wrapper {
        background: linear-gradient(270deg, #e0f2fe, var(--tw-blue-200));
        opacity: 0.95;
        position: absolute;
        top: 112px;
        left: 0;
        right: 0;
        height: calc(100vh - 112px);
        padding: 24px;
        backdrop-filter: blur(200px);
        font-size: 18px;

        ul {
          padding-bottom: 24px;
          flex-direction: column;
          align-items: flex-start;
        }
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

const Header = (): JSX.Element => {
  const {
    data: session,
    status
  } = useSession();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (status === "unauthenticated") {
    return (
      <HeaderStyles>
        <nav>
          <Link href="/" className="logo">
            <Coffee size={24} weight="bold" />
            <span className={rockSalt.className}>Visit Again</span>
          </Link>
          <Link href="/explore">
            <Lightning size={24} weight="bold" />
            Explore
          </Link>
          <LoginButton signUpLabel="Sign Up" />
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
        <div className={clsx('mobile-wrapper',
          isMobileMenuOpen ? "display-none" : "")
        }>
          <ul>
            <li>
              <Link href="/explore">
                <Lightning size={24} weight="bold" />
                Explore
              </Link>
            </li>
            <li>
              <Link href="/add">
                <PlusCircle size={24} weight="bold" />
                Add
              </Link>
            </li>
            <li>
              <Link href="/watchlist">
                <FolderStar size={24} weight="bold" />
                Watchlist
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
        </div>
        <button className="menu-button no-button desktop-display-none" onClick={() => {
          setIsMobileMenuOpen(!isMobileMenuOpen);
        }}>
          <List size={24} weight="bold" />
        </button>
      </nav>
    </HeaderStyles >
  );
}

export default Header;