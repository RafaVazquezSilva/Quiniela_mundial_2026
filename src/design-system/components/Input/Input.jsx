export function Input({
  label,
  error,
  size = 'md',
  type = 'text',
  className = '',
  ...props
}) {
  const classes = [
    'ds-input',
    `ds-input--${size}`,
    error ? 'ds-input--error' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="ds-input-wrapper">
      {label && <label className="ds-input-label">{label}</label>}
      <input type={type} className={classes} {...props} />
      {error && <span className="ds-input-error">{error}</span>}
    </div>
  );
}
