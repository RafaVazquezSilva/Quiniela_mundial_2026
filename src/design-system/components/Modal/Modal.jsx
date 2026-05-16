import { useEffect } from 'react';

export function Modal({
  children,
  isOpen,
  onClose,
  title,
  size = 'md',
  footer
}) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (isOpen) window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="ds-modal-overlay" onClick={onClose}>
      <div className={`ds-modal ds-modal--${size}`} onClick={(e) => e.stopPropagation()}>
        {title && (
          <div className="ds-modal__header">
            <h2 className="ds-modal__title">{title}</h2>
            <button className="ds-modal__close" onClick={onClose}>&times;</button>
          </div>
        )}
        <div className="ds-modal__body">{children}</div>
        {footer && <div className="ds-modal__footer">{footer}</div>}
      </div>
    </div>
  );
}
