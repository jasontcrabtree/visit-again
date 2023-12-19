import { Link, Bookmarks } from "phosphor-react";
import toast from "react-hot-toast";
import styled from "styled-components";

const ShareGroup = () => {

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

    return (
        <StyledShareGroup>
            <button onClick={() => {
                navigator.clipboard.writeText(window.location.href);
                toast.success((`Link copied: ${window.location.href}`), {})
            }}>
                Share <Link size={16} />
            </button>
            <button className="button-ghost">
                Watchlist <Bookmarks size={16} />
            </button>
        </StyledShareGroup>
    )
}

export default ShareGroup;