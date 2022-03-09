import React from 'react'
import PropTypes from 'prop-types';
import styles from './TeamCard.module.css';

function TeamCard({ team, onPressTeam, selectedTeamID }) {
  const { id } = team;
  const onClickTeam = () => {
    onPressTeam(id)
  }
  let className = selectedTeamID === id ? styles.teamCardSelected : styles.teamCard
  return (
    <tr
      onClick={onClickTeam}
      className={className}>
      <td>{team.full_name}</td>
      <td>{team.city}</td>
      <td>{team.abbreviation}</td>
      <td>{team.conference}</td>
      <td>{team.division}</td>
    </tr>
  )
}

export default TeamCard

TeamCard.propTypes ={
  team: PropTypes.object,
  onPressTeam: PropTypes.func,
  selectedTeamID: PropTypes.number,
}