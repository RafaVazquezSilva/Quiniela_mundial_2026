import { getFlagUrl } from '../../../data/groups'

export function BracketView({ rounds, className = '', onPredictionChange, predictions = {}, knockoutResults = {}, resolvedTeams = {} }) {
  return (
    <div className={`ds-bracket ${className}`}>
      {rounds.map((round, roundIndex) => (
        <div key={roundIndex} className="ds-bracket__round">
          <h4 className="ds-bracket__round-title">{round.name}</h4>
          {round.matches.map((match) => {
            const matchResult = knockoutResults[match.id]
            const prediction = predictions[match.id]
            const resolvedData = resolvedTeams[match.id]
            const hasResult = matchResult && matchResult.home !== '' && matchResult.away !== ''

            const homeTeam = resolvedData?.team1 || match.teams?.[0]
            const awayTeam = resolvedData?.team2 || match.teams?.[1]
            const isPending = !homeTeam || !awayTeam || (!homeTeam.teamId && !homeTeam.name)

            const homeScore = hasResult ? matchResult.home : prediction?.home || ''
            const awayScore = hasResult ? matchResult.away : prediction?.away || ''

            let homeIsWinner = false
            let awayIsWinner = false
            if (hasResult) {
              homeIsWinner = parseInt(matchResult.home) > parseInt(matchResult.away)
              awayIsWinner = parseInt(matchResult.away) > parseInt(matchResult.home)
            }

            return (
              <div
                key={match.id}
                className={`ds-bracket__match ${isPending ? 'ds-bracket__match--pending' : ''} ${hasResult ? 'ds-bracket__match--resolved' : ''}`}
              >
                <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', padding: '4px 8px 0', textAlign: 'center' }}>
                  {match.stadium?.split('(')[0]?.trim() || ''}
                </div>
                {homeTeam && (
                  <div className={`ds-bracket__team ${homeIsWinner ? 'ds-bracket__team--winner' : ''} ${isPending ? 'ds-bracket__team--tbd' : ''}`}>
                    <span className="ds-bracket__team-name">
                      {homeTeam.teamCode ? (
                        <img className="ds-bracket__team-flag" src={getFlagUrl(homeTeam.teamCode)} alt={homeTeam.teamName || homeTeam.name} />
                      ) : homeTeam.flag ? (
                        <img className="ds-bracket__team-flag" src={homeTeam.flag} alt={homeTeam.name} />
                      ) : null}
                      {isPending ? 'Por definir' : (homeTeam.teamName || homeTeam.name)}
                    </span>
                    {!isPending && onPredictionChange && !hasResult && (
                      <input
                        type="number"
                        min="0"
                        max="99"
                        className="ds-bracket__score-input"
                        value={homeScore}
                        onChange={(e) => onPredictionChange(match.id, 'home', e.target.value)}
                        placeholder="-"
                      />
                    )}
                    {hasResult && (
                      <span className="ds-bracket__team-score">{matchResult.home}</span>
                    )}
                  </div>
                )}
                {awayTeam && (
                  <div className={`ds-bracket__team ${awayIsWinner ? 'ds-bracket__team--winner' : ''} ${isPending ? 'ds-bracket__team--tbd' : ''}`}>
                    <span className="ds-bracket__team-name">
                      {awayTeam.teamCode ? (
                        <img className="ds-bracket__team-flag" src={getFlagUrl(awayTeam.teamCode)} alt={awayTeam.teamName || awayTeam.name} />
                      ) : awayTeam.flag ? (
                        <img className="ds-bracket__team-flag" src={awayTeam.flag} alt={awayTeam.name} />
                      ) : null}
                      {isPending ? 'Por definir' : (awayTeam.teamName || awayTeam.name)}
                    </span>
                    {!isPending && onPredictionChange && !hasResult && (
                      <input
                        type="number"
                        min="0"
                        max="99"
                        className="ds-bracket__score-input"
                        value={awayScore}
                        onChange={(e) => onPredictionChange(match.id, 'away', e.target.value)}
                        placeholder="-"
                      />
                    )}
                    {hasResult && (
                      <span className="ds-bracket__team-score">{matchResult.away}</span>
                    )}
                  </div>
                )}
              </div>
            )
          })}
        </div>
      ))}
    </div>
  )
}
