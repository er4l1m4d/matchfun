import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="auth-page">
      <div className="auth-page__glow" />
      <div className="auth-card">
        <div className="auth-card__header">
          <Link to="/" className="auth-card__brand" aria-label="MatchFun home">
            <span className="auth-card__brand-mark" />
            <span className="auth-card__brand-name">MatchFun</span>
          </Link>
          <h1 className="auth-card__title">Create your account</h1>
          <p className="auth-card__subtitle">
            Start predicting in under 30 seconds.
          </p>
        </div>

        <div className="auth-social-group">
          <button className="btn--social" type="button">
            <svg viewBox="0 0 24 24">
              <use href="#icon-google-color" />
            </svg>
            Continue with Google
          </button>
          <button className="btn--social" type="button">
            <svg viewBox="0 0 24 24" className="btn--social__apple">
              <use href="#icon-apple" />
            </svg>
            Continue with Apple
          </button>
        </div>

        <div className="divider">or</div>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <div className="field">
            <label className="field__label" htmlFor="signup-name">
              Display name
            </label>
            <input
              className="input"
              id="signup-name"
              type="text"
              placeholder="e.g. GoalMachine22"
              autoComplete="name"
              required
            />
            <div className="field__hint">Shown on the leaderboard</div>
          </div>
          <div className="field">
            <label className="field__label" htmlFor="signup-email">
              Email
            </label>
            <input
              className="input"
              id="signup-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>
          <div className="field">
            <label className="field__label" htmlFor="signup-password">
              Password
            </label>
            <input
              className="input"
              id="signup-password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              required
              minLength={8}
            />
            <div className="field__hint">At least 8 characters</div>
          </div>
          <button className="btn btn--primary btn--full btn--lg" type="submit">
            Create Account
          </button>
        </form>

        <p className="auth-terms">
          By signing up, you agree to our{" "}
          <Link to="/terms" className="auth-link">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link to="/privacy" className="auth-link">
            Privacy Policy
          </Link>
          .
        </p>

        <p className="auth-switch">
          Already have an account?{" "}
          <Link to="/login" className="auth-switch__link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
