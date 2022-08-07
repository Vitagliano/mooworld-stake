import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaDiscord, FaTwitter } from "react-icons/fa";
import Container from "./container";
export default function Header({ connected, signerAddress, connectWallet }) {
  const [show, setShow] = useState(null);

  const connectButtonState = connected
    ? `${`0x${signerAddress.slice(2, 5)}...${signerAddress.slice(-5)}`}`
    : "Connect Wallet";
  return (
    <header>
      <Container>
        <div className="header-content">
          <div className="page-logo">
            <img src="./logo.png" alt="logo" className="logo" width={116} />
          </div>
          <button
            variant="contained"
            color="secondary"
            className="wallet-button"
            onClick={() => connectWallet()}
            sx={{ color: "#fff", letterSpacing: 2 }}
          >
            {!connected ? (
              <>Connect Wallet</>
            ) : (
              <span className="wallet-address">
                {`0x${signerAddress.slice(2, 5)}...${signerAddress.slice(-5)}`}
              </span>
            )}
          </button>
        </div>
      </Container>
    </header>
  );
}
