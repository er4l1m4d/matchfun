import { Link } from "react-router-dom";
import { useState, useCallback, useEffect } from "react";
import Tooltip from "../components/Tooltip";

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

interface Toast {
  id: number;
  message: string;
  action?: { label: string; onClick: () => void };
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
  const [confirmModal, setConfirmModal] = useState<{
    predIdx: number;
    predQ: string;
    selectedLabel: string;
    selectedOdds: string;
  } | null>(null);
  const [toasts, setToasts] = useState<Toast[]>([]);
  const [submitting, setSubmitting] = useState<number | null>(null);

  const addToast = useCallback((toast: Omit<Toast, "id">) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { ...toast, id }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 6000);
  }, []);

  const removeToast = useCallback((id: number) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  const handleSelect = (predIdx: number, optIdx: number) => {
    if (submitting !== null) return;
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

  const handleRequestConfirm = (predIdx: number) => {
    const pred = predictions[predIdx];
    const selected = pred.options.find((o) => o.status === "selected");
    if (!selected) return;
    setConfirmModal({
      predIdx,
      predQ: pred.q,
      selectedLabel: selected.label,
      selectedOdds: selected.odds,
    });
  };

  const handleConfirm = async () => {
    if (!confirmModal) return;
    const { predIdx } = confirmModal;
    const pred = predictions[predIdx];
    const selectedIdx = pred.options.findIndex((o) => o.status === "selected");
    if (selectedIdx === -1) return;

    const selectedLabel = pred.options[selectedIdx].label;
    setConfirmModal(null);
    setSubmitting(predIdx);

    // Optimistic lock
    setPredictions((prev) =>
      prev.map((p, pi) => {
        if (pi !== predIdx) return p;
        return {
          ...p,
          options: p.options.map((opt, oi) => ({
            ...opt,
            status: oi === selectedIdx ? "locked" : "idle",
          })),
        };
      }),
    );

    // Simulate network request
    try {
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // 10% chance of simulated failure for demo
          if (Math.random() < 0.1) {
            reject(new Error("Network error"));
          } else {
            resolve(undefined);
          }
        }, 800);
      });

      setSubmitting(null);
      addToast({
        message: `Locked: ${selectedLabel}`,
        action: {
          label: "Undo",
          onClick: () => handleUndo(predIdx, selectedIdx),
        },
      });
    } catch {
      // Rollback on failure
      setPredictions((prev) =>
        prev.map((p, pi) => {
          if (pi !== predIdx) return p;
          return {
            ...p,
            options: p.options.map((opt) => ({
              ...opt,
              status: "idle",
            })),
          };
        }),
      );
      setSubmitting(null);
      addToast({
        message: "Prediction failed — try again",
      });
    }
  };

  const handleUndo = (predIdx: number, selectedIdx: number) => {
    setPredictions((prev) =>
      prev.map((p, pi) => {
        if (pi !== predIdx) return p;
        return {
          ...p,
          options: p.options.map((opt, oi) => ({
            ...opt,
            status: oi === selectedIdx ? "selected" : "idle",
          })),
        };
      }),
    );
    addToast({ message: "Prediction undone" });
  };

  const handleCancelConfirm = () => {
    setConfirmModal(null);
  };

  // Close modal on Escape
  useEffect(() => {
    if (!confirmModal) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleCancelConfirm();
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, [confirmModal]);

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
        <Tooltip content="Correct predictions in a row. Hit 5 to unlock a Hot Streak NFT.">
          <span className="streak-chip">
            <svg viewBox="0 0 24 24"><use href="#icon-fire" /></svg>
            5 streak
          </span>
        </Tooltip>
        <Link to="/live" className="btn btn--ghost btn--sm">
          <svg viewBox="0 0 24 24" width="16" height="16"><use href="#icon-arrow-right" /></svg>
          Back to matches
        </Link>
      </div>

      {/* Prediction cards */}
      <div className="mv-pred-list">
        {predictions.map((pred, pi) => {
          const hasSelected = pred.options.some((o) => o.status === "selected");
          const lockedOption = pred.options.find((o) => o.status === "locked");
          const isSubmitting = submitting === pi;

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
                    disabled={opt.status === "locked" || isSubmitting}
                    aria-pressed={opt.status === "selected" || opt.status === "locked"}
                    aria-label={`${opt.label}, odds ${opt.odds}${opt.status === "locked" ? ", locked" : ""}${opt.status === "selected" ? ", selected" : ""}`}
                  >
                    <span className="pred-tile__label">{opt.label}</span>
                    <Tooltip content={`Lower odds = more likely to happen`} position="bottom">
                      <span className="pred-tile__odds mono-num">{opt.odds}</span>
                    </Tooltip>
                  </button>
                ))}
              </div>
              <div className="pred-card__footer">
                {lockedOption ? (
                  <span className="pred-card__locked-hint">
                    <svg viewBox="0 0 24 24" width="14" height="14"><use href="#icon-check" /></svg>
                    Locked on {lockedOption.label}
                  </span>
                ) : hasSelected ? (
                  <button
                    className="btn btn--accent btn--sm btn--full"
                    onClick={() => handleRequestConfirm(pi)}
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Confirming..." : "Confirm prediction"}
                  </button>
                ) : (
                  <span className="pred-card__hint">Tap a tile to predict</span>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Confirmation modal */}
      {confirmModal && (
        <div className="modal-backdrop" onClick={handleCancelConfirm} role="dialog" aria-modal="true" aria-label="Confirm prediction">
          <div className="modal" onClick={(e) => e.stopPropagation()}>
            <div className="modal__header">
              <h3 className="modal__title">Confirm prediction</h3>
              <button className="modal__close" onClick={handleCancelConfirm} aria-label="Cancel">
                <svg viewBox="0 0 24 24" width="20" height="20"><use href="#icon-x" /></svg>
              </button>
            </div>
            <div className="modal__body">
              <div className="modal__pred-summary">
                <div className="modal__pred-q">{confirmModal.predQ}</div>
                <div className="modal__pred-choice">
                  <span className="modal__pred-label">{confirmModal.selectedLabel}</span>
                  <span className="modal__pred-odds mono-num">{confirmModal.selectedOdds}</span>
                </div>
              </div>
              <p className="modal__warning">This pick will be locked once confirmed. You can undo it shortly after.</p>
            </div>
            <div className="modal__footer">
              <button className="btn btn--ghost btn--sm" onClick={handleCancelConfirm}>
                Go back
              </button>
              <button className="btn btn--accent btn--sm" onClick={handleConfirm}>
                Lock it in
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Toast notifications */}
      <div className="toast-container" aria-live="polite">
        {toasts.map((toast) => (
          <div className="toast" key={toast.id}>
            <span className="toast__message">{toast.message}</span>
            {toast.action && (
              <button
                className="toast__action"
                onClick={() => {
                  toast.action!.onClick();
                  removeToast(toast.id);
                }}
              >
                {toast.action.label}
              </button>
            )}
            <button className="toast__dismiss" onClick={() => removeToast(toast.id)} aria-label="Dismiss">
              <svg viewBox="0 0 24 24" width="14" height="14"><use href="#icon-x" /></svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
