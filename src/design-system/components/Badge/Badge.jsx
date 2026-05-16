export function Badge({ children, variant = 'default', size = 'md', className = '' }) {
  const classes = [
    'ds-badge',
    `ds-badge--${variant}`,
    `ds-badge--${size}`,
    className
  ].filter(Boolean).join(' ');

  return <span className={classes}>{children}</span>;
}
