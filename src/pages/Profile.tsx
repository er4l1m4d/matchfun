import { Link } from "react-router-dom";

const achievements = [
  { icon: "#icon-fire", label: "Hot Streak x3" },
  { icon: "#icon-trophy", label: "Top 10 Weekly" },
  { icon: "#icon-nft", label: "4 NFTs Minted" },
];

const recentPredictions = [
  { match: "Argentina vs France", pick: "Argentina", result: "correct" as const, pts: "+120" },
  { match: "Argentina vs France", pick: "Over 2.5 goals", result: "correct" as const, pts: "+85" },
  { match: "Argentina vs France", pick: "Mbappé scorer", result: "incorrect" as const, pts: "0" },
  { match: "Brazil vs Spain", pick: "Brazil", result: "correct" as const, pts: "+95" },
  { match: "Brazil vs Spain", pick: "Corner — Brazil", result: "correct" as const, pts: "+60" },
];

export default function Profile() {
  return (
    <div className="page-container">
      {/* Profile header */}
      <div className="pf-header">
        <div className="pf-avatar">
          <svg viewBox="0 0 24 24"><use href="#icon-user" /></svg>
          <button className="pf-avatar__edit" aria-label="Change avatar">
            <svg viewBox="0 0 24 24" width="14" height="14"><use href="#icon-info" /></svg>
          </button>
        </div>
        <h1 className="pf-name">GoalMachine22</h1>
        <p className="pf-handle">@goalMachine22 · Joined Jan 2026</p>

        <div className="pf-stats">
          <div className="pf-stat">
            <div className="pf-stat__value mono-num">4,820</div>
            <div className="pf-stat__label">Points</div>
          </div>
          <div className="pf-stat">
            <div className="pf-stat__value mono-num">18</div>
            <div className="pf-stat__label">Best Streak</div>
          </div>
          <div className="pf-stat">
            <div className="pf-stat__value mono-num">72%</div>
            <div className="pf-stat__label">Win Rate</div>
          </div>
        </div>

        <div className="pf-actions">
          <Link to="/rank" className="btn btn--secondary btn--sm">
            <svg viewBox="0 0 24 24" width="16" height="16"><use href="#icon-chart" /></svg>
            View Leaderboard
          </Link>
          <button className="btn btn--ghost btn--sm">
            <svg viewBox="0 0 24 24" width="16" height="16"><use href="#icon-info" /></svg>
            Share
          </button>
        </div>

        <div className="pf-how-link">
          <svg viewBox="0 0 24 24" width="14" height="14"><use href="#icon-info" /></svg>
          <span>Points = odds × streak bonus. <strong>How scoring works</strong></span>
        </div>
      </div>

      {/* Achievements */}
      <section className="pf-section">
        <div className="section-header">
          <h2 className="section-title">Achievements</h2>
        </div>
        <div className="pf-achievements">
          {achievements.map((a) => (
            <span className="pf-achievement" key={a.label}>
              <svg viewBox="0 0 24 24" width="14" height="14"><use href={a.icon} /></svg>
              {a.label}
            </span>
          ))}
        </div>
      </section>

      {/* Wallet */}
      <section className="pf-section">
        <div className="section-header">
          <h2 className="section-title">Wallet</h2>
        </div>
        <div className="settings-group">
          <div className="settings-row">
            <div className="settings-row__icon">
              <svg viewBox="0 0 24 24"><use href="#icon-wallet" /></svg>
            </div>
            <div className="settings-row__body">
              <div className="settings-row__title">Phantom Wallet</div>
              <div className="settings-row__desc">Connected · 7Zk3...x9f2</div>
            </div>
            <span className="badge badge--info">Connected</span>
          </div>
          <div className="settings-row">
            <div className="settings-row__icon">
              <svg viewBox="0 0 24 24"><use href="#icon-nft" /></svg>
            </div>
            <div className="settings-row__body">
              <div className="settings-row__title">NFT Balance</div>
              <div className="settings-row__desc">4 NFTs · 2.5 SOL value</div>
            </div>
          </div>
        </div>
      </section>

      {/* Prediction history */}
      <section className="pf-section">
        <div className="section-header">
          <h2 className="section-title">Recent Predictions</h2>
          <Link to="/live" className="section-link">See all</Link>
        </div>
        <div className="pf-pred-card">
          <div className="lb-list">
            {recentPredictions.map((p, i) => (
              <div className="lb-item" key={i}>
                <div className={`pf-pred-icon pf-pred-icon--${p.result}`}>
                  <svg viewBox="0 0 24 24" width="14" height="14">
                    <use href={p.result === "correct" ? "#icon-check" : "#icon-x"} />
                  </svg>
                </div>
                <div className="lb-item__body">
                  <div className="lb-item__title">{p.pick}</div>
                  <div className="lb-item__sub">{p.match}</div>
                </div>
                <span className={`pf-pred-pts pf-pred-pts--${p.result} mono-num`}>
                  {p.pts}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Settings */}
      <section className="pf-section">
        <div className="section-header">
          <h2 className="section-title">Settings</h2>
        </div>
        <div className="settings-group">
          <div className="settings-row">
            <div className="settings-row__icon">
              <svg viewBox="0 0 24 24"><use href="#icon-bell" /></svg>
            </div>
            <div className="settings-row__body">
              <div className="settings-row__title">Notifications</div>
              <div className="settings-row__desc">Match reminders, streak alerts</div>
            </div>
            <div className="settings-row__arrow">
              <svg viewBox="0 0 24 24"><use href="#icon-arrow-right" /></svg>
            </div>
          </div>
          <div className="settings-row">
            <div className="settings-row__icon">
              <svg viewBox="0 0 24 24"><use href="#icon-user" /></svg>
            </div>
            <div className="settings-row__body">
              <div className="settings-row__title">Account</div>
              <div className="settings-row__desc">Email, password, display name</div>
            </div>
            <div className="settings-row__arrow">
              <svg viewBox="0 0 24 24"><use href="#icon-arrow-right" /></svg>
            </div>
          </div>
          <div className="settings-row">
            <div className="settings-row__icon">
              <svg viewBox="0 0 24 24"><use href="#icon-shield" /></svg>
            </div>
            <div className="settings-row__body">
              <div className="settings-row__title">Privacy</div>
              <div className="settings-row__desc">Profile visibility, data export</div>
            </div>
            <div className="settings-row__arrow">
              <svg viewBox="0 0 24 24"><use href="#icon-arrow-right" /></svg>
            </div>
          </div>
          <div className="settings-row">
            <div className="settings-row__icon">
              <svg viewBox="0 0 24 24"><use href="#icon-info" /></svg>
            </div>
            <div className="settings-row__body">
              <div className="settings-row__title">About</div>
              <div className="settings-row__desc">Version 1.0.0</div>
            </div>
            <div className="settings-row__arrow">
              <svg viewBox="0 0 24 24"><use href="#icon-arrow-right" /></svg>
            </div>
          </div>
        </div>

        <button className="btn btn--ghost btn--full pf-signout">
          Sign Out
        </button>
      </section>
    </div>
  );
}
