import { useState } from "react";
import { Link } from "react-router-dom";
import useLoading from "../hooks/useLoading";

const myNFTs = [
  { id: 1, title: "Hot Streak #127", rarity: "legendary" as const, streak: 8, date: "Mar 2026" },
  { id: 2, title: "Match Master", rarity: "rare" as const, streak: 5, date: "Feb 2026" },
  { id: 3, title: "First Pick", rarity: "common" as const, streak: 1, date: "Jan 2026" },
  { id: 4, title: "Corner Prophet", rarity: "rare" as const, streak: 6, date: "Jan 2026" },
];

const marketplaceNFTs = [
  { id: 101, title: "Golden Boot", rarity: "legendary" as const, price: "2.5", edition: "1 / 10" },
  { id: 102, title: "Hat-Trick Hero", rarity: "rare" as const, price: "1.2", edition: "1 / 50" },
  { id: 103, title: "Clean Sheet", rarity: "common" as const, price: "0.3", edition: "1 / 200" },
  { id: 104, title: "Last-Minute Winner", rarity: "legendary" as const, price: "3.0", edition: "1 / 5" },
  { id: 105, title: "Assist King", rarity: "rare" as const, price: "0.8", edition: "1 / 100" },
  { id: 106, title: "Penalty Drama", rarity: "common" as const, price: "0.2", edition: "1 / 300" },
];

const rarityFilters = ["All", "Legendary", "Rare", "Common"] as const;
type Rarity = "all" | "legendary" | "rare" | "common";

function NFTSkeleton() {
  return (
    <div className="page-container" aria-busy="true" aria-label="Loading NFTs">
      <div className="page-header">
        <div className="skeleton" style={{ width: "100px", height: "1.75rem", borderRadius: "6px" }} />
        <div className="skeleton" style={{ width: "280px", height: "0.875rem", borderRadius: "4px", marginTop: "8px" }} />
      </div>
      <div style={{ display: "flex", gap: "var(--space-2)", marginBottom: "var(--space-4)" }}>
        {([1, 2]).map((s) => (
          <div key={s} className="skeleton" style={{ width: "110px", height: "36px", borderRadius: "var(--radius-sm)" }} />
        ))}
      </div>
      <div style={{ display: "flex", gap: "var(--space-2)", marginBottom: "var(--space-6)" }}>
        {([1, 2, 3, 4]).map((s) => (
          <div key={s} className="skeleton" style={{ width: "80px", height: "32px", borderRadius: "var(--radius-sm)" }} />
        ))}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "var(--space-4)" }}>
        {([1, 2, 3, 4, 5, 6]).map((s) => (
          <div key={s} className="card" style={{ padding: 0, overflow: "hidden" }}>
            <div className="skeleton" style={{ width: "100%", height: "120px", borderRadius: 0 }} />
            <div style={{ padding: "var(--space-3)" }}>
              <div className="skeleton" style={{ width: "70%", height: "0.875rem", borderRadius: "4px", marginBottom: "6px" }} />
              <div className="skeleton" style={{ width: "50%", height: "0.75rem", borderRadius: "4px", marginBottom: "8px" }} />
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div className="skeleton" style={{ width: "60px", height: "0.75rem", borderRadius: "4px" }} />
                <div className="skeleton" style={{ width: "50px", height: "28px", borderRadius: "var(--radius-sm)" }} />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function NFTs() {
  const [activeTab, setActiveTab] = useState<"collection" | "marketplace">("collection");
  const [rarityFilter, setRarityFilter] = useState<Rarity>("all");
  const loading = useLoading();

  if (loading) return <NFTSkeleton />;

  const filteredCollection = myNFTs.filter(
    (n) => rarityFilter === "all" || n.rarity === rarityFilter,
  );
  const filteredMarket = marketplaceNFTs.filter(
    (n) => rarityFilter === "all" || n.rarity === rarityFilter,
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">NFTs</h1>
        <p className="page-subtitle">
          Your prediction streaks, immortalized on Solana.
        </p>
      </div>

      {/* Tabs */}
      <div className="nft-tabs">
        <div className="tabs">
          <button
            className={`tab${activeTab === "collection" ? " is-active" : ""}`}
            onClick={() => setActiveTab("collection")}
          >
            My Collection
          </button>
          <button
            className={`tab${activeTab === "marketplace" ? " is-active" : ""}`}
            onClick={() => setActiveTab("marketplace")}
          >
            Marketplace
          </button>
        </div>
      </div>

      {/* Collection */}
      {activeTab === "collection" && (
        <>
          <div className="nft-toolbar">
            <span className="nft-count">{filteredCollection.length} NFTs</span>
            <div className="segment">
              {rarityFilters.map((r) => (
                <button
                  key={r}
                  className={`segment__item${rarityFilter === r.toLowerCase() ? " is-active" : ""}`}
                  onClick={() => setRarityFilter(r.toLowerCase() as Rarity)}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {filteredCollection.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state__icon">
                <svg viewBox="0 0 24 24"><use href="#icon-nft" /></svg>
              </div>
              <div className="empty-state__title">No {rarityFilter !== "all" ? rarityFilter : ""} NFTs yet</div>
              <div className="empty-state__desc">
                {rarityFilter !== "all"
                  ? `You don't have any ${rarityFilter} NFTs. Keep predicting to earn rarer drops.`
                  : "Predict on live matches to earn your first NFT. Hit a 5-streak to unlock a Hot Streak NFT."}
              </div>
              <div className="empty-state__actions">
                <Link to="/live" className="btn btn--accent btn--sm">
                  Start predicting
                </Link>
                {rarityFilter !== "all" && (
                  <button className="btn btn--ghost btn--sm" onClick={() => setRarityFilter("all")}>
                    Show all NFTs
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div className="nft-grid">
              {filteredCollection.map((nft) => (
                <div className="nft-card card--interactive stagger-item" key={nft.id}>
                  <div className="nft-card__media">
                    <svg viewBox="0 0 24 24"><use href="#icon-nft" /></svg>
                    <span className={`rarity-tag rarity-tag--${nft.rarity}`}>
                      {nft.rarity}
                    </span>
                  </div>
                  <div className="nft-card__body">
                    <div className="nft-card__title">{nft.title}</div>
                    <div className="nft-card__meta">{nft.streak}-streak · {nft.date}</div>
                    <div className="nft-card__footer">
                      <span className="streak-badge">
                        <svg viewBox="0 0 24 24" width="12" height="12"><use href="#icon-fire" /></svg>
                        {nft.streak} streak
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}

      {/* Marketplace */}
      {activeTab === "marketplace" && (
        <>
          <div className="nft-toolbar">
            <span className="nft-count">{filteredMarket.length} available</span>
            <div className="segment">
              {rarityFilters.map((r) => (
                <button
                  key={r}
                  className={`segment__item${rarityFilter === r.toLowerCase() ? " is-active" : ""}`}
                  onClick={() => setRarityFilter(r.toLowerCase() as Rarity)}
                >
                  {r}
                </button>
              ))}
            </div>
          </div>

          {filteredMarket.length === 0 ? (
            <div className="empty-state">
              <div className="empty-state__icon">
                <svg viewBox="0 0 24 24"><use href="#icon-nft" /></svg>
              </div>
              <div className="empty-state__title">No {rarityFilter !== "all" ? rarityFilter : ""} NFTs available</div>
              <div className="empty-state__desc">
                {rarityFilter !== "all"
                  ? `No ${rarityFilter} NFTs are listed right now. Try another rarity or check back later.`
                  : "The marketplace is empty. New drops are minted when players hit streaks."}
              </div>
              <div className="empty-state__actions">
                {rarityFilter !== "all" && (
                  <button className="btn btn--ghost btn--sm" onClick={() => setRarityFilter("all")}>
                    Show all NFTs
                  </button>
                )}
                <Link to="/home" className="btn btn--secondary btn--sm">
                  Back to home
                </Link>
              </div>
            </div>
          ) : (
            <div className="nft-grid">
              {filteredMarket.map((nft) => (
                <div className="nft-card card--interactive stagger-item" key={nft.id}>
                  <div className="nft-card__media">
                    <svg viewBox="0 0 24 24"><use href="#icon-nft" /></svg>
                    <span className={`rarity-tag rarity-tag--${nft.rarity}`}>
                      {nft.rarity}
                    </span>
                  </div>
                  <div className="nft-card__body">
                    <div className="nft-card__title">{nft.title}</div>
                    <div className="nft-card__meta">{nft.edition}</div>
                    <div className="nft-card__footer">
                      <span className="nft-price mono-num">{nft.price} SOL</span>
                      <button className="btn btn--accent btn--sm">Mint</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
}
