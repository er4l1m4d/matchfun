import { Outlet, NavLink, useLocation } from "react-router-dom";
import Icons from "./Icons";

const APP_ROUTES = ["/home", "/live", "/rank", "/nfts", "/profile"];
const AUTH_ROUTES = ["/", "/login", "/signup"];

const bottomNavItems = [
  { to: "/home", icon: "home", label: "Home" },
  { to: "/live", icon: "ball", label: "Live" },
  { to: "/rank", icon: "trophy", label: "Ranks" },
  { to: "/nfts", icon: "nft", label: "NFTs" },
  { to: "/profile", icon: "user", label: "Profile" },
];

export default function Layout() {
  const location = useLocation();
  const isApp = APP_ROUTES.some(
    (r) => location.pathname === r || location.pathname.startsWith(r + "/"),
  );
  const isAuth = AUTH_ROUTES.includes(location.pathname);

  return (
    <>
      <Icons />

      <a href="#main-content" className="skip-link">
        Skip to content
      </a>

      {isApp && (
        <>
          <header className="app-topbar">
            <div className="app-topbar__left">
              <NavLink to="/home" className="app-topbar__logo">
                <span className="app-topbar__logo-mark" />
                <span>MatchFun</span>
              </NavLink>
            </div>
            <div className="app-topbar__right">
              <button className="icon-btn" aria-label="Search">
                <svg viewBox="0 0 24 24">
                  <use href="#icon-search" />
                </svg>
              </button>
              <button className="icon-btn" aria-label="Notifications">
                <svg viewBox="0 0 24 24">
                  <use href="#icon-bell" />
                </svg>
                <span className="icon-btn__badge">3</span>
              </button>
              <NavLink to="/profile" className="avatar-sm" aria-label="Profile" />
            </div>
          </header>

          <nav className="bottom-nav" aria-label="Main navigation">
            {bottomNavItems.map((item) => (
              <NavLink
                key={item.to}
                to={item.to}
                className={({ isActive }) =>
                  `bottomnav__item${isActive ? " is-active" : ""}`
                }
              >
                <svg viewBox="0 0 24 24">
                  <use href={`#icon-${item.icon}`} />
                </svg>
                {item.label}
              </NavLink>
            ))}
          </nav>
        </>
      )}

      <main id="main-content" className={isApp ? "app-main" : isAuth ? "auth-main" : ""}>
        <Outlet />
      </main>
    </>
  );
}
