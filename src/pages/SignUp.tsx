import { Link } from "react-router-dom";
import { useState, type FormEvent } from "react";

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
}

function validateName(name: string): string | undefined {
  if (!name) return "Display name is required";
  if (name.length < 2) return "Name must be at least 2 characters";
  if (name.length > 20) return "Name must be 20 characters or less";
  return undefined;
}

function validateEmail(email: string): string | undefined {
  if (!email) return "Email is required";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) return "Enter a valid email address";
  return undefined;
}

function validatePassword(password: string): string | undefined {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  return undefined;
}

function getPasswordStrength(password: string): { level: "weak" | "fair" | "strong"; label: string } {
  if (password.length < 8) return { level: "weak", label: "Weak" };
  if (/[A-Z]/.test(password) && /[0-9]/.test(password) && password.length >= 12) {
    return { level: "strong", label: "Strong" };
  }
  return { level: "fair", label: "Fair" };
}

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);

    const nameErr = validateName(name);
    const emailErr = validateEmail(email);
    const passwordErr = validatePassword(password);
    setErrors({ name: nameErr, email: emailErr, password: passwordErr });

    if (nameErr || emailErr || passwordErr) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
  };

  const nameError = submitted ? errors.name : undefined;
  const emailError = submitted ? errors.email : undefined;
  const passwordError = submitted ? errors.password : undefined;
  const passwordStrength = password ? getPasswordStrength(password) : null;

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

        <form className="auth-form" onSubmit={handleSubmit} noValidate>
          <div className="field">
            <label className="field__label" htmlFor="signup-name">
              Display name
            </label>
            <input
              className={`input${nameError ? " input--error" : ""}`}
              id="signup-name"
              type="text"
              placeholder="e.g. GoalMachine22"
              autoComplete="name"
              value={name}
              onChange={(e) => {
                setName(e.target.value);
                if (submitted) setErrors((prev) => ({ ...prev, name: validateName(e.target.value) }));
              }}
              aria-invalid={!!nameError}
              aria-describedby={nameError ? "signup-name-error" : undefined}
            />
            {nameError ? (
              <div className="field__error" id="signup-name-error">
                <svg viewBox="0 0 24 24"><use href="#icon-x" /></svg>
                {nameError}
              </div>
            ) : (
              <div className="field__hint">Shown on the leaderboard</div>
            )}
          </div>
          <div className="field">
            <label className="field__label" htmlFor="signup-email">
              Email
            </label>
            <input
              className={`input${emailError ? " input--error" : ""}`}
              id="signup-email"
              type="email"
              placeholder="you@example.com"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (submitted) setErrors((prev) => ({ ...prev, email: validateEmail(e.target.value) }));
              }}
              aria-invalid={!!emailError}
              aria-describedby={emailError ? "signup-email-error" : undefined}
            />
            {emailError && (
              <div className="field__error" id="signup-email-error">
                <svg viewBox="0 0 24 24"><use href="#icon-x" /></svg>
                {emailError}
              </div>
            )}
          </div>
          <div className="field">
            <label className="field__label" htmlFor="signup-password">
              Password
            </label>
            <input
              className={`input${passwordError ? " input--error" : ""}`}
              id="signup-password"
              type="password"
              placeholder="••••••••"
              autoComplete="new-password"
              value={password}
              minLength={8}
              onChange={(e) => {
                setPassword(e.target.value);
                if (submitted) setErrors((prev) => ({ ...prev, password: validatePassword(e.target.value) }));
              }}
              aria-invalid={!!passwordError}
              aria-describedby={passwordError ? "signup-password-error" : passwordStrength ? "signup-password-strength" : undefined}
            />
            {passwordError ? (
              <div className="field__error" id="signup-password-error">
                <svg viewBox="0 0 24 24"><use href="#icon-x" /></svg>
                {passwordError}
              </div>
            ) : passwordStrength ? (
              <div className="field__strength" id="signup-password-strength">
                <div className={`strength-bar strength-bar--${passwordStrength.level}`}>
                  <div className="strength-bar__fill" />
                </div>
                <span className="strength-label">{passwordStrength.label}</span>
              </div>
            ) : (
              <div className="field__hint">At least 8 characters</div>
            )}
          </div>
          <button
            className="btn btn--primary btn--full btn--lg"
            type="submit"
            disabled={loading}
          >
            {loading ? "Creating account..." : "Create Account"}
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
