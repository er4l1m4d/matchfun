import { Link } from "react-router-dom";
import { useState } from "react";

interface PredictionOption {
  label: string;
  odds: string;
  status?: "idle" | "selected" | "locked" | "correct" | "incorrect";
}

interface Prediction {
  q: string;
  timer: string;
  options: PredictionOption[];
}

const initialPredictions: Prediction[] = [
  {
    q: "Next goalscorer",
    timer: "67:12",
    options: [
      { label: "Mbappé", odds: "2.5" },
      { label: "Messi", odds: "3.1" },
      { label: "Dembélé", odds: "5.4" },
    ],
  },
  {
    q: "Next corner",
    timer: "67:05",
    options: [
      { label: "Argentina", odds: "1.9" },
      { label: "France", odds: "1.8" },
    ],
  },
  {
    q: "Next card",
    timer: "66:48",
    options: [
      { label: "Yellow — Argentina", odds: "2.2" },
      { label: "Yellow — France", odds: "2.4" },
      { label: "None", odds: "3.0" },
    ],
  },
  {
    q: "Match result",
    timer: "67:12",
    options: [
      { label: "Argentina", odds: "1.5" },
      { label: "Draw", odds: "3.8" },
      { label: "France", odds: "4.2" },
    ],
  },
];

export default function MatchView() {
  const [predictions, setPredictions] = useState(initialPredictions);

  const handleSelect = (predIdx: number, optIdx: number) => {
    setPredictions((prev) =>
      prev.map((pred, pi) => {
        if (pi !== predIdx) return pred;
        return {
          ...pred,
          options: pred.options.map((opt, oi) => ({
            ...opt,
            status: oi === optIdx ? "selected" : "idle",
          })),
        };
      }),
    );
  };

  const handleConfirm = (predIdx: number) => {
    setPredictions((prev) =>
      prev.map((pred, pi) => {
        if (pi !== predIdx) return pred;
        const selectedIdx = pred.options.findIndex((o) => o.status === "selected");
        if (selectedIdx === -1) return pred;
        return {
          ...pred,
          options: pred.options.map((opt, oi) => ({
            ...opt,
            status: oi === selectedIdx ? "locked" : "idle",
          })),
        };
      }),
    );
  };

  return (
    <div className="page-container">
      {/* Match header */}
      <div className="match-card mv-match-header">
        <div className="match-card__top">
          <span className="match-card__comp">World Cup · Round of 16</span>
          <span className="badge badge--live">67'</span>
        </div>
        <div className="match-card__teams">
          <div className="match-card__team">
            <span className="team-crest team-crest--lg"><svg viewBox="0 0 24 24"><use href="#icon-shield" /></svg></span>
            <span className="match-card__team-name">Argentina</span>
          </div>
          <div className="match-card__score mono-num">2 – 1</div>
          <div className="match-card__team is-right">
            <span className="team-crest team-crest--lg"><svg viewBox="0 0 24 24"><use href="#icon-shield" /></svg></span>
            <span className="match-card__team-name">France</span>
          </div>
        </div>
      </div>

      {/* Streak + back */}
      <div className="mv-streak-row">
        <span className="streak-chip">
          <svg viewBox="0 0 24 24"><use href="#icon-fire" /></svg>
          5 streak
        </span>
        <Link to="/live" className="btn btn--ghost btn--sm">
          <svg viewBox="0 0 24 24" width="16" height="16"><use href="#icon-arrow-right" /></svg>
          Back to matches
        </Link>
      </div>

      {/* Prediction cards */}
      <div className="mv-pred-list">
        {predictions.map((pred, pi) => {
          const hasSelected = pred.options.some((o) => o.status === "selected");
          return (
            <div className="pred-card" key={pi}>
              <div className="pred-card__header">
                <div className="pred-card__q">{pred.q}</div>
                <div className="pred-card__timer mono-num">{pred.timer}</div>
              </div>
              <div className="pred-tiles">
                {pred.options.map((opt, oi) => (
                  <button
                    className={`pred-tile${opt.status === "selected" ? " is-selected" : ""}${opt.status === "locked" ? " is-locked" : ""}`}
                    key={oi}
                    onClick={() => handleSelect(pi, oi)}
                    disabled={opt.status === "locked"}
                  >
                    <span className="pred-tile__label">{opt.label}</span>
                    <span className="pred-tile__odds mono-num">{opt.odds}</span>
                  </button>
                ))}
              </div>
              <div className="pred-card__footer">
                {hasSelected ? (
                  <button
                    className="btn btn--accent btn--sm btn--full"
                    onClick={() => handleConfirm(pi)}
                  >
                    Confirm prediction
                  </button>
                ) : (
                  <span className="pred-card__hint">Tap a tile to predict</span>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
