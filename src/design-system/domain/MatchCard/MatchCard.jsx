export function MatchCard({
  homeTeam,
  awayTeam,
  date,
  group,
  homeFlag,
  awayFlag,
  prediction,
  onPredictionChange,
  result,
  points,
  isLocked = false,
  className = ''
}) {
  const classes = [
    'ds-match-card',
    isLocked ? 'ds-match-card--locked' : '',
    result ? 'ds-match-card--result' : '',
    className
  ].filter(Boolean).join(' ')

  const hasPrediction = prediction?.home !== '' || prediction?.away !== ''
  const hasResult = result && result !== ' - '

  return (
    <div className={classes}>
      <div className="ds-match-card__header">
        <span className="ds-match-card__date">{date}</span>
        {group && <span className="ds-match-card__group">{group}</span>}
      </div>

      <div className="ds-match-card__teams">
        <div className="ds-match-card__team">
          {homeFlag && <img className="ds-match-card__team-flag" src={homeFlag} alt={homeTeam} />}
          <span className="ds-match-card__team-name">{homeTeam}</span>
        </div>
        <span className="ds-match-card__vs">VS</span>
        <div className="ds-match-card__team">
          {awayFlag && <img className="ds-match-card__team-flag" src={awayFlag} alt={awayTeam} />}
          <span className="ds-match-card__team-name">{awayTeam}</span>
        </div>
      </div>

      {hasResult && (
        <div className="ds-match-card__result">
          <span className="ds-match-card__result-score">{result}</span>
          {points !== undefined && (
            <span className={`ds-match-card__points ${points > 0 ? 'ds-match-card__points--earned' : ''}`}>
              +{points} pts
            </span>
          )}
        </div>
      )}

      <div className="ds-match-card__predictions">
        <input
          type="number"
          min="0"
          max="99"
          className={`ds-match-card__score-input ${hasPrediction ? 'ds-match-card__score-input--filled' : ''}`}
          value={prediction?.home ?? ''}
          onChange={(e) => onPredictionChange?.({ ...prediction, home: e.target.value })}
          disabled={isLocked}
          placeholder="-"
        />
        <span className="ds-match-card__separator">-</span>
        <input
          type="number"
          min="0"
          max="99"
          className={`ds-match-card__score-input ${hasPrediction ? 'ds-match-card__score-input--filled' : ''}`}
          value={prediction?.away ?? ''}
          onChange={(e) => onPredictionChange?.({ ...prediction, away: e.target.value })}
          disabled={isLocked}
          placeholder="-"
        />
      </div>
    </div>
  )
}
