export function BracketView({ rounds, className = '' }) {
  return (
    <div className={`ds-bracket ${className}`}>
      {rounds.map((round, roundIndex) => (
        <div key={roundIndex} className="ds-bracket__round">
          <h4 className="ds-bracket__round-title">{round.name}</h4>
          {round.matches.map((match) => (
            <div key={match.id} className="ds-bracket__match">
              {match.teams.map((team, teamIndex) => (
                <div
                  key={teamIndex}
                  className={`ds-bracket__team ${team.isWinner ? 'ds-bracket__team--winner' : ''}`}
                >
                  <span className="ds-bracket__team-name">
                    {team.flag && (
                      <img className="ds-bracket__team-flag" src={team.flag} alt={team.name} />
                    )}
                    {team.name}
                  </span>
                  {team.score !== undefined && (
                    <span className="ds-bracket__team-score">{team.score}</span>
                  )}
                </div>
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}
