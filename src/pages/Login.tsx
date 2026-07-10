import { Link } from "react-router-dom";
import { useState, type FormEvent } from "react";

interface FormErrors {
  email?: string;
  password?: string;
}

function validateEmail(email: string): string | undefined {
  if (!email) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address";
  return undefined;
}

function validatePassword(password: string): string | undefined {
  if (!password) return "Password is required";
  if (password.length < 6) return "Password must be at least 6 characters";
  return undefined;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    setErrors({ email: emailErr, password: passwordErr });

    if (emailErr || passwordErr) return;

    setLoading(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
  };

  const emailError = submitted ? errors.email : undefined;
  const passwordError = submitted ? errors.password : undefined;

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

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label className="field__label" htmlFor="login-email">
              Email
            </label>
            <input
              className={`input${emailError ? " input--error" : ""}`}
              id="login-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (submitted) setErrors((prev) => ({ ...prev, email: validateEmail(e.target.value) }));
              }}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? "login-email-error" : undefined}
            />
            {emailError && (
              <div className="field__error" id="login-email-error">
                <svg viewBox="0 0 24 24"><use href="#icon-x" /></svg>
                {emailError}
              </div>
            )}
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
              className={`input${passwordError ? " input--error" : ""}`}
              id="login-password"
              type="password"
              placeholder="••••••••"
              autoComplete="current-password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                if (submitted) setErrors((prev) => ({ ...prev, password: validatePassword(e.target.value) }));
              }}
              aria-invalid={!!passwordError}
              aria-describedby={passwordError ? "login-password-error" : undefined}
            />
            {passwordError && (
              <div className="field__error" id="login-password-error">
                <svg viewBox="0 0 24 24"><use href="#icon-x" /></svg>
                {passwordError}
              </div>
            )}
          </div>
          <button
            className="btn btn--primary btn--full btn--lg"
            type="submit"
            disabled={loading}
          >
            {loading ? "Signing in..." : "Sign In"}
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
