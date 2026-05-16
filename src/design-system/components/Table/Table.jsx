export function Table({ children, variant = 'default', className = '' }) {
  const classes = [
    'ds-table',
    variant !== 'default' ? `ds-table--${variant}` : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="ds-table-wrapper">
      <table className={classes}>{children}</table>
    </div>
  );
}

export function TableHead({ children }) {
  return <thead>{children}</thead>;
}

export function TableBody({ children }) {
  return <tbody>{children}</tbody>;
}

export function TableRow({ children, onClick }) {
  return <tr onClick={onClick}>{children}</tr>;
}

export function TableCell({ children, as: Tag = 'td', className = '' }) {
  return <Tag className={className}>{children}</Tag>;
}
