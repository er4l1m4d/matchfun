import { Link } from "react-router-dom";
import Tooltip from "../components/Tooltip";
import useLoading from "../hooks/useLoading";

const liveMatches = [
  {
    id: "1",
    comp: "World Cup · Round of 16",
    home: "Argentina",
    away: "France",
    score: "2 – 1",
    minute: "67'",
  },
  {
    id: "2",
    comp: "World Cup · Round of 16",
    home: "Japan",
    away: "Croatia",
    score: "1 – 1",
    minute: "45'+2",
  },
];

const upcomingMatches = [
  {
    id: "3",
    comp: "World Cup · Quarter Final",
    home: "Brazil",
    away: "Germany",
    time: "18:00",
  },
  {
    id: "4",
    comp: "World Cup · Quarter Final",
    home: "England",
    away: "Netherlands",
    time: "21:00",
  },
  {
    id: "5",
    comp: "Premier League · Matchday 38",
    home: "Arsenal",
    away: "Man City",
    time: "Sun 16:00",
  },
];

const quickPicks = [
  { match: "Argentina vs France", q: "Next goal", options: [{ label: "Argentina", odds: "1.9" }, { label: "France", odds: "2.1" }] },
  { match: "Japan vs Croatia", q: "Winner", options: [{ label: "Japan", odds: "2.8" }, { label: "Croatia", odds: "2.4" }, { label: "Draw", odds: "3.2" }] },
];

const recentPredictions = [
  { match: "Argentina vs France", pick: "Argentina", result: "correct", points: "+120" },
  { match: "Argentina vs France", pick: "Over 2.5 goals", result: "correct", points: "+85" },
  { match: "Argentina vs France", pick: "Mbappé scorer", result: "incorrect", points: "0" },
  { match: "Brazil vs Spain", pick: "Brazil", result: "correct", points: "+95" },
];

function getGreeting() {
  const h = new Date().getHours();
  if (h < 12) return "Good morning";
  if (h < 18) return "Good afternoon";
  return "Good evening";
}

function HomeSkeleton() {
  return (
    <div className="page-container" aria-busy="true" aria-label="Loading home">
      <div className="page-header">
        <div className="skeleton" style={{ width: "180px", height: "1.75rem", borderRadius: "6px" }} />
        <div className="skeleton" style={{ width: "260px", height: "0.875rem", borderRadius: "4px", marginTop: "8px" }} />
      </div>
      {([1, 2, 3, 4]).map((s) => (
        <section key={s} className="home-section" style={{ marginBottom: "var(--space-6)" }}>
          <div className="skeleton" style={{ width: "120px", height: "1rem", borderRadius: "4px", marginBottom: "var(--space-4)" }} />
          <div className="card" style={{ padding: "var(--space-4)" }}>
            <div style={{ display: "flex", gap: "var(--space-3)" }}>
              <div className="skeleton" style={{ width: "40px", height: "40px", borderRadius: "var(--radius-full)" }} />
              <div style={{ flex: 1 }}>
                <div className="skeleton" style={{ width: "50%", height: "0.75rem", borderRadius: "4px", marginBottom: "6px" }} />
                <div className="skeleton" style={{ width: "35%", height: "0.75rem", borderRadius: "4px" }} />
              </div>
            </div>
          </div>
        </section>
      ))}
    </div>
  );
}

export default function Home() {
  const loading = useLoading();

  if (loading) return <HomeSkeleton />;

  return (
    <div className="page-container">
      {/* Greeting */}
      <div className="page-header">
        <div className="home-greeting">
          <h1 className="page-title">{getGreeting()}</h1>
          <Tooltip content="Correct predictions in a row. Hit 5 to unlock a Hot Streak NFT.">
            <span className="streak-chip">
              <svg viewBox="0 0 24 24"><use href="#icon-fire" /></svg>
              5 streak
            </span>
          </Tooltip>
        </div>
        <p className="page-subtitle">
          {liveMatches.length} matches live right now.{" "}
          {upcomingMatches.length} more kicking off today.
        </p>
      </div>

      {/* Live now */}
      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">Live Now</h2>
          <Link to="/live" className="section-link">
            View all
            <svg viewBox="0 0 24 24"><use href="#icon-arrow-right" /></svg>
          </Link>
        </div>
        <div className="home-match-list">
          {liveMatches.map((m) => (
            <Link to={`/live/${m.id}`} key={m.id} className="home-match-link">
              <div className="match-card card--interactive stagger-item">
                <div className="match-card__top">
                  <span className="match-card__comp">{m.comp}</span>
                  <span className="badge badge--live">{m.minute}</span>
                </div>
                <div className="match-card__teams">
                  <div className="match-card__team">
                    <span className="team-crest"><svg viewBox="0 0 24 24"><use href="#icon-shield" /></svg></span>
                    <span className="match-card__team-name">{m.home}</span>
                  </div>
                  <div className="match-card__score mono-num">{m.score}</div>
                  <div className="match-card__team is-right">
                    <span className="team-crest"><svg viewBox="0 0 24 24"><use href="#icon-shield" /></svg></span>
                    <span className="match-card__team-name">{m.away}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Quick picks */}
      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">Quick Picks</h2>
          <span className="badge badge--info">Open now</span>
        </div>
        <div className="home-quick-picks">
          {quickPicks.map((qp, i) => (
            <div className="pred-card stagger-item" key={i}>
              <div className="pred-card__header">
                <div>
                  <div className="pred-card__q">{qp.q}</div>
                  <div className="pred-card__match-label">{qp.match}</div>
                </div>
              </div>
              <div className="pred-tiles">
                {qp.options.map((opt, j) => (
                  <div className="pred-tile" key={j}>
                    <span className="pred-tile__label">{opt.label}</span>
                    <span className="pred-tile__odds mono-num">{opt.odds}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Upcoming */}
      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">Upcoming</h2>
        </div>
        <div className="home-match-list">
          {upcomingMatches.map((m) => (
            <Link to={`/live/${m.id}`} key={m.id} className="home-match-link">
              <div className="match-card card--interactive stagger-item">
                <div className="match-card__top">
                  <span className="match-card__comp">{m.comp}</span>
                  <span className="badge badge--default">{m.time}</span>
                </div>
                <div className="match-card__teams">
                  <div className="match-card__team">
                    <span className="team-crest"><svg viewBox="0 0 24 24"><use href="#icon-shield" /></svg></span>
                    <span className="match-card__team-name">{m.home}</span>
                  </div>
                  <div className="match-card__score match-card__score--vs mono-num">vs</div>
                  <div className="match-card__team is-right">
                    <span className="team-crest"><svg viewBox="0 0 24 24"><use href="#icon-shield" /></svg></span>
                    <span className="match-card__team-name">{m.away}</span>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent predictions */}
      <section className="home-section">
        <div className="section-header">
          <h2 className="section-title">Recent Predictions</h2>
        </div>
        <div className="card home-predictions-card">
          <div className="lb-list">
            {recentPredictions.map((p, i) => (
              <div className="lb-item stagger-item" key={i}>
                <div className={`pred-result-icon pred-result-icon--${p.result}`}>
                  <svg viewBox="0 0 24 24" width="16" height="16">
                    <use href={p.result === "correct" ? "#icon-check" : "#icon-x"} />
                  </svg>
                </div>
                <div className="lb-item__body">
                  <div className="lb-item__title">{p.pick}</div>
                  <div className="lb-item__sub">{p.match}</div>
                </div>
                <span className={`pred-result-pts pred-result-pts--${p.result}`}>
                  {p.points}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
