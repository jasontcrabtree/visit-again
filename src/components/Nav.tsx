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
import LoginButton from './login-button';


const HeaderStyles = styled.header`
  max-width: 1080px;
  margin: 0 auto;
  padding: 24px;

  color: var(--grey-000);

  display: flex;
  flex-direction: row;
  justify-content: flex-start;
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
    padding: 8px 16px;
    border-radius: 96px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--grey-400);
  }

  @media screen and (max-width: 960px) {
    .userInitial {
      display: none;
    }

    flex-wrap: wrap;
    justify-content: space-between;
    box-shadow: 4px 4px 24px 8px rgb(4 3 16 / 63%);
    padding: 16px 24px;

    nav {
      margin-right: 0;
    }

    ul {
      justify-content: space-between;
    }
  }
`;

export default function Header(): JSX.Element {
  return (
    <HeaderStyles>
      <Link href="/" className="logo">
        <Coffee size={24} color="#94a3b8" weight="bold" /> {/* Coffee */}
        <span>Visit Again</span>
      </Link>
      <nav>
        <ul>
          {/* <li>
            <Link href="/">
              <Waves size={24} color="#94a3b8" weight="bold" />
            </Link>
          </li> */}
          <li>
            <Link href="/add">
              <PlusCircle size={24} color="#94a3b8" weight="bold" />
            </Link>
          </li>
          <li>
            <Link href="/watchlist">
              <FolderStar size={24} color="#94a3b8" weight="bold" />
            </Link>
          </li>
          {/* TODO: Implement search */}
          {/* <li>
            <Link href="/search">
              <MagnifyingGlass size={24} color="#94a3b8" weight="bold" />
            </Link>
          </li> */}
          {/* TODO: Implement settings */}
          {/* <li>
            <Link href="/settings">
              <Gear size={24} color="#94a3b8" weight="bold" />
            </Link>
          </li> */}
        </ul>
      </nav>
      <LoginButton />
    </HeaderStyles>
  );
}
