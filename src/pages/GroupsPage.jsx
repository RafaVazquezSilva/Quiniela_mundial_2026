import { useState } from 'react'
import { groups } from '../data/groups'
import { GroupView } from './GroupView'
import { getUsers } from '../utils/users'

export function GroupsPage({ currentUser, results, onResultChange }) {
  const [selectedGroup, setSelectedGroup] = useState(groups[0].id)

  const currentGroup = groups.find((g) => g.id === selectedGroup)
  const users = getUsers()
  const user = users[currentUser?.id] || currentUser

  return (
    <div>
      <div style={{
        display: 'flex',
        gap: '8px',
        flexWrap: 'wrap',
        marginBottom: '32px',
        paddingBottom: '16px',
        borderBottom: '1px solid var(--color-neutral-200)',
      }}>
        {groups.map((group) => (
          <button
            key={group.id}
            onClick={() => setSelectedGroup(group.id)}
            style={{
              padding: '8px 16px',
              fontSize: '14px',
              fontWeight: '600',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              transition: 'all 150ms ease',
              background: selectedGroup === group.id
                ? 'var(--color-primary-500)'
                : 'var(--color-neutral-100)',
              color: selectedGroup === group.id
                ? 'var(--text-inverse)'
                : 'var(--text-secondary)',
            }}
          >
            Grupo {group.id}
          </button>
        ))}
      </div>

      <GroupView
        key={selectedGroup}
        group={currentGroup}
        user={user}
        results={results}
        onResultChange={onResultChange}
      />
    </div>
  )
}
