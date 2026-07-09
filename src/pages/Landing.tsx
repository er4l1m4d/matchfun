import { Link } from "react-router-dom";

export default function Landing() {
  return (
    <div className="landing">
      {/* Nav */}
      <nav className="landing-nav">
        <div className="landing-nav__inner">
          <Link to="/" className="landing-nav__brand">
            <span className="landing-nav__mark" />
            <span className="landing-nav__wordmark">MatchFun</span>
          </Link>
          <div className="landing-nav__links">
            <a href="#how-it-works" className="landing-nav__link">
              How it works
            </a>
            <a href="#live-matches" className="landing-nav__link">
              Live matches
            </a>
          </div>
          <div className="landing-nav__actions">
            <Link to="/login" className="btn btn--ghost btn--sm">
              Sign in
            </Link>
            <Link to="/signup" className="btn btn--primary btn--sm">
              Get Started
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div className="hero__floodlights" />
        <div className="hero__content">
          <div className="hero__badge">
            <span className="dot-live">Live</span>&nbsp; predictions ·
            World Cup 2026
          </div>
          <h1 className="hero__title">
            Tap. Predict. <span className="accent">Celebrate.</span>
          </h1>
          <p className="hero__lede">
            Every card, corner, and goal is a chance to prove your football
            instinct. Predict live during the match, build streaks, climb the
            leaderboard, and mint your best moments as NFTs.
          </p>
          <div className="hero__actions">
            <Link to="/signup" className="btn btn--primary btn--lg">
              Get Started — It's Free
            </Link>
            <Link to="/live" className="btn btn--secondary btn--lg">
              <svg viewBox="0 0 24 24">
                <use href="#icon-ball" />
              </svg>
              Watch Live
            </Link>
          </div>
          <div className="hero__social-proof">
            <div className="hero__avatars">
              <span className="hero__avatar" style={{ background: "var(--gradient-hero)" }} />
              <span className="hero__avatar" style={{ background: "var(--gradient-nft)" }} />
              <span className="hero__avatar" style={{ background: "var(--gradient-streak)" }} />
              <span className="hero__avatar" style={{ background: "linear-gradient(135deg, var(--teal-500), var(--teal-700))" }} />
            </div>
            <div className="hero__social-text">
              <strong className="mono-num">12,400+</strong> predictors are already playing
            </div>
          </div>
        </div>
      </section>

      {/* Featured match */}
      <section className="section-container" id="live-matches">
        <div className="section-header">
          <h2 className="section-title">Featured Match</h2>
          <span className="badge badge--live">Live Now</span>
        </div>
        <div className="match-card match-card--featured">
          <div className="match-card__top">
            <span className="match-card__comp">
              World Cup · Round of 16
            </span>
            <span className="badge badge--live">67'</span>
          </div>
          <div className="match-card__teams">
            <div className="match-card__team">
              <span className="team-crest">
                <svg viewBox="0 0 24 24">
                  <use href="#icon-shield" />
                </svg>
              </span>
              <span className="match-card__team-name">Argentina</span>
            </div>
            <div className="match-card__score mono-num">2 – 1</div>
            <div className="match-card__team is-right">
              <span className="team-crest">
                <svg viewBox="0 0 24 24">
                  <use href="#icon-shield" />
                </svg>
              </span>
              <span className="match-card__team-name">France</span>
            </div>
          </div>
          <div className="match-card__preds">
            <div className="pred-tiles">
              <div className="pred-tile">
                <span className="pred-tile__label">Argentina</span>
                <span className="pred-tile__odds mono-num">1.8</span>
              </div>
              <div className="pred-tile">
                <span className="pred-tile__label">Draw</span>
                <span className="pred-tile__odds mono-num">3.5</span>
              </div>
              <div className="pred-tile">
                <span className="pred-tile__label">France</span>
                <span className="pred-tile__odds mono-num">2.9</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section-container" id="how-it-works">
        <h2 className="section-title">How it works</h2>
        <p className="section-desc">
          Three steps from fan to predictor.
        </p>
        <div className="grid-3">
          <div className="step-card">
            <div className="step-card__icon">
              <svg viewBox="0 0 24 24">
                <use href="#icon-ball" />
              </svg>
            </div>
            <h3 className="step-card__title">Pick a match</h3>
            <p className="step-card__desc">
              Browse live and upcoming matches. Tap one to see all available
              prediction markets.
            </p>
          </div>
          <div className="step-card">
            <div className="step-card__icon step-card__icon--teal">
              <svg viewBox="0 0 24 24">
                <use href="#icon-chart" />
              </svg>
            </div>
            <h3 className="step-card__title">Make your pick</h3>
            <p className="step-card__desc">
              Tap an outcome — next goal, corner, card. Odds update in real
              time as the match unfolds.
            </p>
          </div>
          <div className="step-card">
            <div className="step-card__icon step-card__icon--yellow">
              <svg viewBox="0 0 24 24">
                <use href="#icon-fire" />
              </svg>
            </div>
            <h3 className="step-card__title">Build your streak</h3>
            <p className="step-card__desc">
              Correct picks stack. Hit 5 in a row to unlock a Hot Streak and
              mint it as an NFT.
            </p>
          </div>
        </div>
      </section>

      {/* Social proof stats */}
      <section className="section-container">
        <div className="stats-bar">
          <div className="stats-bar__item">
            <div className="stats-bar__value mono-num">2.4M</div>
            <div className="stats-bar__label">Predictions made</div>
          </div>
          <div className="stats-bar__item">
            <div className="stats-bar__value mono-num">12.4K</div>
            <div className="stats-bar__label">Active predictors</div>
          </div>
          <div className="stats-bar__item">
            <div className="stats-bar__value mono-num">850+</div>
            <div className="stats-bar__label">NFTs minted</div>
          </div>
          <div className="stats-bar__item">
            <div className="stats-bar__value mono-num">48</div>
            <div className="stats-bar__label">Leagues covered</div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-container">
        <div className="cta-block">
          <h2 className="cta-block__title">Ready to play?</h2>
          <p className="cta-block__desc">
            Join thousands of predictors turning match-day instinct into
            streaks, NFTs, and leaderboard glory.
          </p>
          <Link to="/signup" className="btn btn--primary btn--lg">
            Create Free Account
          </Link>
        </div>
      </section>

      <footer className="doc-footer">
        <div className="doc-footer__mark">
          <span className="landing-nav__mark" style={{ width: 24, height: 24 }} />
          <span style={{ font: "var(--text-h6)", fontWeight: 800 }}>MatchFun</span>
        </div>
        <p className="doc-footer__text">
          Built for World Cup 2026 · Tap. Predict. Celebrate.
        </p>
      </footer>
    </div>
  );
}
