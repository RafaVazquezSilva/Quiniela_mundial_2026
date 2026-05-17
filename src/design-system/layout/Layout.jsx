export function Layout({ children }) {
  return <div className="ds-layout">{children}</div>;
}

export function Header({ logo, navLinks, user, onNavigate, children }) {
  return (
    <header className="ds-header">
      <div
        className="ds-header__logo"
        style={{ cursor: 'pointer' }}
        onClick={() => onNavigate?.('grupos')}
      >
        <span className="ds-header__logo-icon">&#9917;</span>
        <span className="ds-header__logo-text">{logo || 'Quiniela 2026'}</span>
      </div>
      <nav className="ds-header__nav">
        {navLinks?.map((link) => (
          <button
            key={link.label}
            onClick={() => onNavigate?.(link.page)}
            className={`ds-header__nav-link ${link.active ? 'ds-header__nav-link--active' : ''}`}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              fontFamily: 'inherit',
              fontSize: 'inherit',
            }}
          >
            {link.label}
          </button>
        ))}
      </nav>
      {user && (
        <div className="ds-header__user">
          <span className="ds-header__user-name">{user.name}</span>
          {children}
        </div>
      )}
    </header>
  )
}

export function Main({ children, className = '' }) {
  return <main className={`ds-main ${className}`}>{children}</main>;
}

export function Footer({ children }) {
  return <footer className="ds-footer">{children}</footer>;
}

export function PageHeader({ title, subtitle, children, className = '' }) {
  return (
    <div className={`ds-page-header ${className}`}>
      {title && <h1 className="ds-page-header__title">{title}</h1>}
      {subtitle && <p className="ds-page-header__subtitle">{subtitle}</p>}
      {children}
    </div>
  );
}

export function Grid({ children, columns = 2, className = '' }) {
  return (
    <div className={`ds-grid ds-grid--${columns} ${className}`}>
      {children}
    </div>
  );
}
