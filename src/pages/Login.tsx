import { Link } from "react-router-dom";

export default function Login() {
  return (
    <div className="auth-page">
      <div className="auth-page__glow" />
      <div className="auth-card">
        <div className="auth-card__header">
          <Link to="/" className="auth-card__brand" aria-label="MatchFun home">
            <span className="auth-card__brand-mark" />
            <span className="auth-card__brand-name">MatchFun</span>
          </Link>
          <h1 className="auth-card__title">Welcome back</h1>
          <p className="auth-card__subtitle">
            Sign in to pick up where you left off.
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
            <label className="field__label" htmlFor="login-email">
              Email
            </label>
            <input
              className="input"
              id="login-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              required
            />
          </div>
          <div className="field">
            <div className="field__label-row">
              <label className="field__label" htmlFor="login-password">
                Password
              </label>
              <Link to="/forgot-password" className="auth-link">
                Forgot password?
              </Link>
            </div>
            <input
              className="input"
              id="login-password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              required
            />
          </div>
          <button className="btn btn--primary btn--full btn--lg" type="submit">
            Sign In
          </button>
        </form>

        <p className="auth-switch">
          Don't have an account?{" "}
          <Link to="/signup" className="auth-switch__link">
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
