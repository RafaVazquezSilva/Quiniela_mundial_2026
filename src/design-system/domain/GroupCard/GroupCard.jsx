export function GroupCard({ groupName, teams, className = '' }) {
  return (
    <div className={`ds-group-card ${className}`}>
      <div className="ds-group-card__header">
        <h3 className="ds-group-card__title">Grupo {groupName}</h3>
      </div>
      <div className="ds-group-card__teams">
        {teams.map((team) => (
          <div key={team.id} className="ds-group-card__team">
            {team.flag && (
              <img className="ds-group-card__team-flag" src={team.flag} alt={team.name} />
            )}
            <span className="ds-group-card__team-name">{team.name}</span>
            {team.seed && <span className="ds-group-card__team-seed">#{team.seed}</span>}
          </div>
        ))}
      </div>
    </div>
  );
}
