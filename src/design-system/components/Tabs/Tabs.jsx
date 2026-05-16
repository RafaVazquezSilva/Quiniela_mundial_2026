import { useState } from 'react';

export function Tabs({ children, defaultValue }) {
  const [activeTab, setActiveTab] = useState(defaultValue);

  return (
    <div className="ds-tabs" data-active={activeTab}>
      {children({ activeTab, setActiveTab })}
    </div>
  );
}

export function TabsList({ children }) {
  return <div className="ds-tabs__list">{children}</div>;
}

export function TabTrigger({ value, children, activeTab, setActiveTab }) {
  const isActive = activeTab === value;
  return (
    <button
      className={`ds-tabs__trigger ${isActive ? 'ds-tabs__trigger--active' : ''}`}
      onClick={() => setActiveTab(value)}
    >
      {children}
    </button>
  );
}

export function TabContent({ value, children, activeTab }) {
  if (activeTab !== value) return null;
  return <div className="ds-tabs__content">{children}</div>;
}
