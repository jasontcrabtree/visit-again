/* eslint-disable jsx-a11y/anchor-is-valid */
import Link from 'next/link';
import {
  Coffee,
  FolderStar,
  Gear,
  MagnifyingGlass,
  PlusCircle,
  Waves,
} from 'phosphor-react';
import styled from 'styled-components';
import LoginButton from './loginButton';

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
  gap: 24px;

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
    gap: 4px;
  }

  .logo {
    padding: 8px 16px;
    border-radius: 96px;
    font-weight: 600;
    text-transform: uppercase;
    color: var(--grey-400);
  }

  @media screen and (max-width: 960px) {
    .logo,
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
      <Link href="/" passHref>
        <a className="logo">
          <Coffee size={24} color="#94a3b8" weight="bold" /> {/* Coffee */}
          <span>Visit Again</span>
        </a>
      </Link>
      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>
                <Waves size={24} color="#94a3b8" weight="bold" />
                {/* Waves */}
              </a>
            </Link>
          </li>
          <li>
            <Link href="/search">
              <a>
                <MagnifyingGlass size={24} color="#94a3b8" weight="bold" />
                {/* Search */}
              </a>
            </Link>
          </li>
          <li>
            <Link href="/add">
              <a>
                <PlusCircle size={24} color="#94a3b8" weight="bold" />
                {/* Plus */}
              </a>
            </Link>
          </li>
          <li>
            <Link href="/watchlist">
              <a>
                <FolderStar size={24} color="#94a3b8" weight="bold" />
                {/* Star */}
              </a>
            </Link>
          </li>
          <li>
            <Link href="/settings">
              <a>
                <Gear size={24} color="#94a3b8" weight="bold" />
                {/* Cog */}
              </a>
            </Link>
          </li>
        </ul>
      </nav>
      <LoginButton />
    </HeaderStyles>
  );
}
