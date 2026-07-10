import { useState } from "react";
import { Link } from "react-router-dom";
import useLoading from "../hooks/useLoading";

const tabs = ["Weekly", "All Time", "Friends"];

const weeklyLeaders = [
  { rank: 1, name: "GoalMachine22", streak: 18, points: 4820, isTop: 1 },
  { rank: 2, name: "TacticalNerd", streak: 12, points: 4510, isTop: 2 },
  { rank: 3, name: "VARWatcher", streak: 9, points: 4290, isTop: 3 },
  { rank: 4, name: "PitchPerfect", streak: 7, points: 3980 },
  { rank: 5, name: "CornerKing", streak: 6, points: 3750 },
  { rank: 6, name: "You", streak: 5, points: 3620, isYou: true },
  { rank: 7, name: "SubstituteXI", streak: 4, points: 3410 },
  { rank: 8, name: "OffsideTrap", streak: 3, points: 3200 },
];

const allTimeLeaders = [
  { rank: 1, name: "Legend10", streak: 32, points: 48200, isTop: 1 },
  { rank: 2, name: "GoalMachine22", streak: 18, points: 42100, isTop: 2 },
  { rank: 3, name: "TacticalNerd", streak: 12, points: 39800, isTop: 3 },
  { rank: 4, name: "PitchPerfect", streak: 7, points: 35200 },
  { rank: 5, name: "You", streak: 5, points: 32600, isYou: true },
];

function formatPoints(n: number) {
  return n.toLocaleString("en-US");
}

function RankSkeleton() {
  return (
    <div className="page-container" aria-busy="true" aria-label="Loading leaderboard">
      <div className="page-header">
        <div className="skeleton" style={{ width: "170px", height: "1.75rem", borderRadius: "6px" }} />
        <div className="skeleton" style={{ width: "240px", height: "0.875rem", borderRadius: "4px", marginTop: "8px" }} />
      </div>
      <div className="rank-stats">
        {([1, 2, 3, 4]).map((s) => (
          <div key={s} className="stat-card" style={{ textAlign: "center" }}>
            <div className="skeleton" style={{ width: "60px", height: "1.5rem", borderRadius: "4px", margin: "0 auto 8px" }} />
            <div className="skeleton" style={{ width: "50px", height: "0.625rem", borderRadius: "4px", margin: "0 auto" }} />
          </div>
        ))}
      </div>
      <div style={{ display: "flex", gap: "var(--space-2)", marginBottom: "var(--space-6)" }}>
        {([1, 2, 3]).map((s) => (
          <div key={s} className="skeleton" style={{ width: "80px", height: "36px", borderRadius: "var(--radius-sm)" }} />
        ))}
      </div>
      <div style={{ display: "flex", justifyContent: "center", gap: "var(--space-4)", marginBottom: "var(--space-8)" }}>
        {[1, 2, 3].map((s) => (
          <div key={s} style={{ textAlign: "center" }}>
            <div className="skeleton" style={{ width: "48px", height: "48px", borderRadius: "var(--radius-full)", margin: "0 auto 8px" }} />
            <div className="skeleton" style={{ width: "70px", height: "0.75rem", borderRadius: "4px", margin: "0 auto 4px" }} />
            <div className="skeleton" style={{ width: "50px", height: "0.625rem", borderRadius: "4px", margin: "0 auto" }} />
          </div>
        ))}
      </div>
      {[1, 2, 3, 4, 5].map((s) => (
        <div key={s} className="card" style={{ padding: "var(--space-3) var(--space-4)", marginBottom: "var(--space-2)", display: "flex", alignItems: "center", gap: "var(--space-3)" }}>
          <div className="skeleton" style={{ width: "24px", height: "0.875rem", borderRadius: "4px" }} />
          <div className="skeleton" style={{ width: "32px", height: "32px", borderRadius: "var(--radius-full)" }} />
          <div style={{ flex: 1 }}>
            <div className="skeleton" style={{ width: "80px", height: "0.875rem", borderRadius: "4px", marginBottom: "4px" }} />
            <div className="skeleton" style={{ width: "50px", height: "0.625rem", borderRadius: "4px" }} />
          </div>
          <div className="skeleton" style={{ width: "50px", height: "0.875rem", borderRadius: "4px" }} />
        </div>
      ))}
    </div>
  );
}

export default function Rank() {
  const [activeTab, setActiveTab] = useState("Weekly");
  const loading = useLoading();

  if (loading) return <RankSkeleton />;

  const leaders = activeTab === "All Time" ? allTimeLeaders : weeklyLeaders;
  const podium = leaders.filter((l) => l.isTop).slice(0, 3);
  const rest = leaders.filter((l) => !l.isTop);

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Leaderboard</h1>
        <p className="page-subtitle">See where you stand among predictors.</p>
      </div>

      {/* Personal stats */}
      <div className="rank-stats">
        <div className="stat-card">
          <div className="stat-card__value">#6</div>
          <div className="stat-card__label">Your Rank</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__value">3,620</div>
          <div className="stat-card__label">Points</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__value">72%</div>
          <div className="stat-card__label">Win Rate</div>
        </div>
        <div className="stat-card">
          <div className="stat-card__value">5</div>
          <div className="stat-card__label">Current Streak</div>
        </div>
      </div>

      {/* Tabs */}
      <div className="rank-tabs">
        <div className="tabs">
          {tabs.map((tab) => (
            <button
              key={tab}
              className={`tab${activeTab === tab ? " is-active" : ""}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Friends empty state */}
      {activeTab === "Friends" && (
        <div className="empty-state">
          <div className="empty-state__icon">
            <svg viewBox="0 0 24 24"><use href="#icon-users" /></svg>
          </div>
          <div className="empty-state__title">No friends yet</div>
          <div className="empty-state__desc">
            Invite friends to compete on the leaderboard. Challenge them to
            beat your streak and climb the ranks together.
          </div>
          <div className="empty-state__actions">
            <button className="btn btn--accent btn--sm">Invite friends</button>
            <Link to="/live" className="btn btn--ghost btn--sm">
              Or predict solo
            </Link>
          </div>
        </div>
      )}

      {/* Leaderboard */}
      {activeTab !== "Friends" && (
        <>
          {/* Podium */}
          {podium.length >= 3 && (
            <div className="rank-podium">
              {/* 2nd */}
              <div className="rank-podium__item rank-podium__item--2">
                <div className="rank-podium__avatar rank-podium__avatar--2">
                  <span className="rank-podium__medal">2</span>
                </div>
                <div className="rank-podium__name">{podium[1].name}</div>
                <div className="rank-podium__pts mono-num">{formatPoints(podium[1].points)}</div>
              </div>
              {/* 1st */}
              <div className="rank-podium__item rank-podium__item--1">
                <div className="rank-podium__avatar rank-podium__avatar--1">
                  <span className="rank-podium__medal">1</span>
                </div>
                <div className="rank-podium__name">{podium[0].name}</div>
                <div className="rank-podium__pts mono-num">{formatPoints(podium[0].points)}</div>
              </div>
              {/* 3rd */}
              <div className="rank-podium__item rank-podium__item--3">
                <div className="rank-podium__avatar rank-podium__avatar--3">
                  <span className="rank-podium__medal">3</span>
                </div>
                <div className="rank-podium__name">{podium[2].name}</div>
                <div className="rank-podium__pts mono-num">{formatPoints(podium[2].points)}</div>
              </div>
            </div>
          )}

          {/* Rest of leaderboard */}
          <div className="rank-list-card">
            <div className="lb-list">
              {rest.map((entry) => (
                <div
                  className={`lb-item${entry.isYou ? " lb-item--you" : ""}`}
                  key={entry.rank}
                >
                  <span className={`lb-item__rank mono-num${entry.isTop ? ` is-top${entry.isTop}` : ""}`}>
                    {entry.rank}
                  </span>
                  <span className="lb-item__avatar" />
                  <div className="lb-item__body">
                    <div className="lb-item__title">
                      {entry.name}
                      {entry.isYou && <span className="lb-item__you-badge">(you)</span>}
                    </div>
                    <div className="lb-item__sub">{entry.streak} streak</div>
                  </div>
                  <span className="lb-item__value mono-num">{formatPoints(entry.points)}</span>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
