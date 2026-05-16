export function Avatar({ src, alt, initials, size = 'md', className = '' }) {
  const classes = [
    'ds-avatar',
    `ds-avatar--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      {src ? <img src={src} alt={alt} /> : initials}
    </div>
  );
}
