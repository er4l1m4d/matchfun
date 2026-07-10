import { Link } from "react-router-dom";
import { useState, type FormEvent } from "react";

interface FormErrors {
  email?: string;
}

function validateEmail(email: string): string | undefined {
  if (!email) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address";
  return undefined;
}

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const emailErr = validateEmail(email);
    setErrors({ email: emailErr });
    if (emailErr) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setSent(true);
  };

  const emailError = submitted ? errors.email : undefined;

  return (
    <div className="auth-page">
      <div className="auth-page__glow" />
      <div className="auth-card">
        <div className="auth-card__header">
          <Link to="/" className="auth-card__brand" aria-label="MatchFun home">
            <span className="auth-card__brand-mark" />
            <span className="auth-card__brand-name">MatchFun</span>
          </Link>
          <h1 className="auth-card__title">Reset password</h1>
          <p className="auth-card__subtitle">
            {sent
              ? "Check your inbox for the reset link."
              : "Enter your email and we'll send you a reset link."}
          </p>
        </div>

        {sent ? (
          <div className="auth-form">
            <div className="empty-state" style={{ padding: 0 }}>
              <div className="empty-state__icon">
                <svg viewBox="0 0 24 24"><use href="#icon-check" /></svg>
              </div>
              <div className="empty-state__title">Email sent</div>
              <div className="empty-state__desc">
                We sent a password reset link to <strong>{email}</strong>. It may take a minute to arrive.
              </div>
              <div className="empty-state__actions">
                <button className="btn btn--primary btn--md" onClick={() => setSent(false)}>
                  Resend email
                </button>
                <Link to="/login" className="btn btn--ghost btn--md">
                  Back to sign in
                </Link>
              </div>
            </div>
          </div>
        ) : (
          <form className="auth-form" onSubmit={handleSubmit} noValidate>
            <div className="field">
              <label className="field__label" htmlFor="forgot-email">
                Email
              </label>
              <input
                className={`input${emailError ? " input--error" : ""}`}
                id="forgot-email"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                  if (submitted) setErrors({ email: validateEmail(e.target.value) });
                }}
                aria-invalid={!!emailError}
                aria-describedby={emailError ? "forgot-email-error" : undefined}
              />
              {emailError && (
                <div className="field__error" id="forgot-email-error">
                  <svg viewBox="0 0 24 24"><use href="#icon-x" /></svg>
                  {emailError}
                </div>
              )}
            </div>
            <button
              className="btn btn--primary btn--full btn--lg"
              type="submit"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send reset link"}
            </button>
          </form>
        )}

        <p className="auth-switch">
          Remember your password?{" "}
          <Link to="/login" className="auth-switch__link">
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
