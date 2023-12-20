import { Link, Bookmarks } from "phosphor-react";
import toast from "react-hot-toast";
import styled from "styled-components";
import useOrigin from "../hooks/use-origin";
import { signIn, useSession } from "next-auth/react";

const StyledShareGroup = styled.div`
    margin-top: 24px;
    margin-bottom: 16px;
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 16px;

    button {
      min-height: unset;
      padding: 0 8px;
      margin: 0;
    }

  .button-ghost {}
`

const ShareGroup = ({ id, entryName }: {
    id: string, entryName: string
}) => {
    const originUrl = useOrigin();
    const userSession = useSession();

    const addToWatchList = async () => {
        try {
            const res = await fetch('/api/watchlist/create', {
                method: 'POST',
                body: JSON.stringify({
                    entryId: id
                }),
            });

            if (res.status === 409) {
                toast(`${entryName} found in watchlist`, {})
            } else if (res.status === 200) {
                toast.success(`${entryName} added to watchlist!`, {})
            }
        } catch (error) {
            toast.error(`There was a problem saving your entry ${error}`, {})
        }
    }

    return (
        <StyledShareGroup>
            <button onClick={() => {
                navigator.clipboard.writeText(`${originUrl}/entry/${id}`);
                toast.success((`Link copied: ${originUrl}/entry/${id}`), {})
            }}>
                Share <Link size={16} />
            </button>
            <button className="button-ghost"
                onClick={() => {
                    userSession.status === "authenticated"
                        ? addToWatchList()
                        : signIn()
                }}>
                Watchlist <Bookmarks size={16} />
            </button>
        </StyledShareGroup>
    )
}

export default ShareGroup;