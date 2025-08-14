"use client";
import Connect from "./components/Connect";
import PriceBadge from "./components/PriceBadge";
import EventFeed from "./components/EventFeed";

export default function Page() {
  return (
    <div className="row">
      <div className="col">
        <div className="card">
          <h2>Wallet</h2>
          <Connect />
        </div>
        <div className="card">
          <h2>Preis</h2>
          <PriceBadge />
        </div>
      </div>
      <div className="col">
        <div className="card">
          <h2>Letzte Transfers</h2>
          <EventFeed />
        </div>
      </div>
    </div>
  );
}
