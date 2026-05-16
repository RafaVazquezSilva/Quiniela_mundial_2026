export function Card({ children, variant = 'default', className = '' }) {
  const classes = [
    'ds-card',
    variant !== 'default' ? `ds-card--${variant}` : '',
    className
  ].filter(Boolean).join(' ');

  return <div className={classes}>{children}</div>;
}

export function CardHeader({ children, className = '' }) {
  return <div className={`ds-card__header ${className}`}>{children}</div>;
}

export function CardTitle({ children, as: Tag = 'h3', className = '' }) {
  return <Tag className={`ds-card__title ${className}`}>{children}</Tag>;
}

export function CardBody({ children, className = '' }) {
  return <div className={`ds-card__body ${className}`}>{children}</div>;
}

export function CardFooter({ children, className = '' }) {
  return <div className={`ds-card__footer ${className}`}>{children}</div>;
}
