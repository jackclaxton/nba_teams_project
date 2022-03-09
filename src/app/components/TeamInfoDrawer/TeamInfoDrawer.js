import React from 'react'
import PropTypes from 'prop-types';
import styles from './TeamInfoDrawer.module.css';
import ActivityIndicator from '../ActivityIndicator/ActivityIndicator';

function TeamInfoDrawer({ isVisible, selectedTeam, closeDrawer, fetchGamesPending }) {
  let className = isVisible ? styles.drawerOpen : styles.drawerClosed;
  let teamInfo = { name: undefined, full_name: undefined, };
  let total_games, randomGame;
  let date, dateISO, home_team, home_team_score, visitor_team, visitor_team_score, home_team_name, visitor_team_name;
  let gameInfoData = [];
  if(selectedTeam){
    teamInfo = selectedTeam.teamInfo;
    if(selectedTeam.teamGames){
      let gameKeys = Object.keys(selectedTeam.teamGames)
      total_games = gameKeys.length;
      randomGame = selectedTeam.teamGames[gameKeys[total_games * Math.random() << 0 ]];
      ({ date, home_team, home_team_score, visitor_team, visitor_team_score } = randomGame)
      home_team_name = home_team.name;
      visitor_team_name = visitor_team.name;
      dateISO = new Date(date).toISOString().split('T')[0];
    }
    gameInfoData = [
      { title: 'Date', data: dateISO },
      { title: 'Home Team', data: home_team_name },
      { title: 'Home Team Score', data: home_team_score },
      { title: 'Visitor Team', data: visitor_team_name },
      { title: 'Visitor Team Score', data: visitor_team_score },
    ]
  }
  return (
    <div className={className}>
      <div className={styles.header}>
        <h2>{teamInfo.name}</h2>
        <button onClick={closeDrawer}><h4>X</h4></button>
      </div>
      <div className={styles.gameInfoContainer}>
        <div className={styles.teamInfoRow}>
          <div className={styles.infoBox}>
            <p>Team Full Name</p>
          </div>
          <div className={styles.infoBox}>
            <p>{teamInfo.full_name}</p>
          </div>
        </div>
        {fetchGamesPending ? 
          <div style={{alignSelf: 'center'}}>
            <ActivityIndicator/>
          </div>
        :
        <>
          <div className={styles.teamInfoRow}>
            <div className={styles.infoBox}>
              <p>Total Games in 2021</p>
            </div>
            <div className={styles.infoBox}>
              <p>{total_games}</p>
            </div>
            </div>
            <div className={styles.teamInfoRow}>
              <h4>Random Game Details:</h4>
            </div>
            {gameInfoData.length > 0 && gameInfoData.map(({title, data}) => (
              <div className={styles.gameInfoRow} key={title}>
                <div className={styles.infoBox}>
                  <h4>{title}</h4>
                </div>
                <div className={styles.infoBox}>
                  <h4>{data}</h4>
                </div>
              </div>
            ))}
          </>
        }
      </div>
    </div>
  )
}

export default TeamInfoDrawer;

TeamInfoDrawer.propTypes = {
  isVisibile: PropTypes.bool,
  selectedTeam: PropTypes.object,
  closeDrawer: PropTypes.func,
  fetchGamesPending: PropTypes.bool,
}