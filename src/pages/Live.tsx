import { Link } from "react-router-dom";
import { useState } from "react";

const liveMatches = [
  {
    id: "1",
    comp: "World Cup · Round of 16",
    home: "Argentina",
    away: "France",
    score: "2 – 1",
    minute: "67'",
    preds: 12,
  },
  {
    id: "2",
    comp: "World Cup · Round of 16",
    home: "Japan",
    away: "Croatia",
    score: "1 – 1",
    minute: "45'+2",
    preds: 8,
  },
];

const upcomingMatches = [
  {
    id: "3",
    comp: "World Cup · Quarter Final",
    home: "Brazil",
    away: "Germany",
    time: "18:00",
    preds: 0,
  },
  {
    id: "4",
    comp: "World Cup · Quarter Final",
    home: "England",
    away: "Netherlands",
    time: "21:00",
    preds: 0,
  },
  {
    id: "5",
    comp: "Premier League · Matchday 38",
    home: "Arsenal",
    away: "Man City",
    time: "Sun 16:00",
    preds: 0,
  },
  {
    id: "6",
    comp: "La Liga · Matchday 38",
    home: "Barcelona",
    away: "Real Madrid",
    time: "Sun 21:00",
    preds: 0,
  },
];

const leagues = ["All", "World Cup", "Premier League", "La Liga"];

export default function Live() {
  const [activeLeague, setActiveLeague] = useState("All");

  const filteredLive = liveMatches.filter(
    (m) => activeLeague === "All" || m.comp.includes(activeLeague),
  );
  const filteredUpcoming = upcomingMatches.filter(
    (m) => activeLeague === "All" || m.comp.includes(activeLeague),
  );

  return (
    <div className="page-container">
      <div className="page-header">
        <h1 className="page-title">Live Matches</h1>
        <p className="page-subtitle">
          Tap a match to start predicting.
        </p>
      </div>

      {/* League filter */}
      <div className="live-filters">
        <div className="segment">
          {leagues.map((l) => (
            <button
              key={l}
              className={`segment__item${activeLeague === l ? " is-active" : ""}`}
              onClick={() => setActiveLeague(l)}
            >
              {l}
            </button>
          ))}
        </div>
      </div>

      {/* Live */}
      {filteredLive.length > 0 && (
        <section className="live-section">
          <div className="section-header">
            <h2 className="section-title">In Progress</h2>
            <span className="badge badge--live">{filteredLive.length} live</span>
          </div>
          <div className="live-match-list">
            {filteredLive.map((m) => (
              <Link to={`/live/${m.id}`} key={m.id} className="live-match-link">
                <div className="match-card card--interactive">
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
                  <div className="match-card__footer-row">
                    <span className="match-card__pred-count">
                      <svg viewBox="0 0 24 24" width="14" height="14"><use href="#icon-chart" /></svg>
                      {m.preds} predictions open
                    </span>
                    <span className="match-card__predict-cta">
                      Predict
                      <svg viewBox="0 0 24 24" width="14" height="14"><use href="#icon-arrow-right" /></svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Upcoming */}
      {filteredUpcoming.length > 0 && (
        <section className="live-section">
          <div className="section-header">
            <h2 className="section-title">Upcoming</h2>
            <span className="badge badge--default">{filteredUpcoming.length} matches</span>
          </div>
          <div className="live-match-list">
            {filteredUpcoming.map((m) => (
              <Link to={`/live/${m.id}`} key={m.id} className="live-match-link">
                <div className="match-card card--interactive">
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
      )}

      {/* Empty state */}
      {filteredLive.length === 0 && filteredUpcoming.length === 0 && (
        <div className="empty-state">
          <div className="empty-state__icon">
            <svg viewBox="0 0 24 24"><use href="#icon-ball" /></svg>
          </div>
          <div className="empty-state__title">No matches in this league</div>
          <div className="empty-state__desc">
            Try a different filter or check back closer to kickoff.
          </div>
          <button className="btn btn--secondary btn--sm" onClick={() => setActiveLeague("All")}>
            Show all leagues
          </button>
        </div>
      )}
    </div>
  );
}
