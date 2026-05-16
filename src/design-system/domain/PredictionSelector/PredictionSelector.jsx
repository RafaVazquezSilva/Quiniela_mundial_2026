export function PredictionSelector({
  homeTeam,
  awayTeam,
  homeFlag,
  awayFlag,
  value,
  onChange,
  size = 'default',
  className = ''
}) {
  const classes = [
    'ds-prediction-selector',
    size === 'compact' ? 'ds-prediction-selector--compact' : '',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className={classes}>
      <div className="ds-prediction-selector__team">
        {homeFlag && <img className="ds-prediction-selector__flag" src={homeFlag} alt={homeTeam} />}
        <span className="ds-prediction-selector__name">{homeTeam}</span>
      </div>
      <input
        type="number"
        min="0"
        max="99"
        className={`ds-prediction-selector__input ${value?.home ? 'ds-prediction-selector__input--filled' : ''}`}
        value={value?.home ?? ''}
        onChange={(e) => onChange?.({ ...value, home: e.target.value })}
        placeholder="-"
      />
      <span className="ds-prediction-selector__separator">-</span>
      <input
        type="number"
        min="0"
        max="99"
        className={`ds-prediction-selector__input ${value?.away ? 'ds-prediction-selector__input--filled' : ''}`}
        value={value?.away ?? ''}
        onChange={(e) => onChange?.({ ...value, away: e.target.value })}
        placeholder="-"
      />
      <div className="ds-prediction-selector__team">
        {awayFlag && <img className="ds-prediction-selector__flag" src={awayFlag} alt={awayTeam} />}
        <span className="ds-prediction-selector__name">{awayTeam}</span>
      </div>
    </div>
  );
}
