import React, { useEffect, useState } from 'react';
import styles from './RootScreen.module.css';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTeams, fetchTeamGames, updateSelectedTeamID, fetchPlayers } from '../redux/actions/teamActions';
import { TeamCard, TeamInfoDrawer, ActivityIndicator } from '../components';


const RootScreen = ({ fetchTeams, fetchPlayers, allTeams, fetchTeamGames, fetchAllTeamsPending, fetchAllTeamsError, updateSelectedTeamID, selectedTeamID, fetchGamesPending, players }) => {
  const [drawerVisible, setDrawerVisible] = useState(false);
  const [displayedTeams, setDisplayedTeams] = useState({});
  
  useEffect(() => {
    fetchTeams();
    fetchPlayers();
  }, []);
  
  useEffect(() => {
    if(Object.keys(displayedTeams).length === 0){
      setDisplayedTeams(allTeams)
    }
  }, [allTeams]);

  const onChangeSearchText = (event) => {
    const text = event.target.value;
    const lowerCaseText = text.toLowerCase()
    let filteredTeams = Object.keys(allTeams).filter((key) => {
      let keyInt = parseInt(key);
      let teamInfo = allTeams[keyInt].teamInfo;
      return teamInfo.full_name.toLowerCase().includes(lowerCaseText)
    })
    let newFilteredTeamsByTeam = Object.assign({}, filteredTeams.map((key) => allTeams[parseInt(key)]));

    let filteredPlayers = players.filter(({first_name, last_name}) => {
      const fullName = first_name.toLowerCase() + ' ' + last_name.toLowerCase();
        return fullName.includes(lowerCaseText);
    })
    let newFilteredTeamsByPlayer = Object.assign({}, filteredPlayers.map((player) => allTeams[player.team.id]))
    let newTeams = {...newFilteredTeamsByTeam, ...newFilteredTeamsByPlayer}
    setDisplayedTeams(newTeams);
  }

  const onPressTeam = (teamID) => {
    if(!('teamGames' in allTeams[teamID])){
      fetchTeamGames(teamID);
    }
    updateSelectedTeamID(teamID);
    setDrawerVisible(true);
  }
  const closeDrawer = () => {
    updateSelectedTeamID(undefined);
    setDrawerVisible(false);
  }
  
  const renderTeamsInfo = () => {
    if(fetchAllTeamsPending){
      return(
        <tr>
          <td colSpan={5}><ActivityIndicator/></td>
        </tr>
      )
    }else if(fetchAllTeamsError){
      return (
        <tr>
          <td colSpan={5}>{fetchAllTeamsError}. Refresh to retry</td>
        </tr>
      )
    }else if(Object.keys(displayedTeams).length === 0){
      return(
        <tr>
          <td colSpan={5}>No results. Try refining your search</td>
        </tr>
      )
    }else{
      return Object.keys(displayedTeams).map((key) => {
        return (
          <TeamCard
            selectedTeamID={selectedTeamID}
            team={displayedTeams[key].teamInfo} 
            onPressTeam={onPressTeam} 
            key={key}/>
        )
      })
    }
  }
  return (
    <div className={styles.container}>
      <h1>NBA Teams</h1>
      <input 
        type={'search'}
        results
        placeholder={'Search by team or player'}
        onChange={onChangeSearchText}/>
      <table>
        <tbody>
          <tr className={styles.tableHeaderRow}>
            <th>Team Name</th>
            <th>City</th>
            <th>Abbreviation</th>
            <th>Conference</th>
            <th>Division</th>
          </tr>
          {renderTeamsInfo()}
        </tbody>
      </table>
      {drawerVisible && <div onClick={closeDrawer} className={styles.backdrop}/>}
      <TeamInfoDrawer 
        isVisible={drawerVisible} 
        selectedTeam={allTeams[selectedTeamID]}
        closeDrawer={closeDrawer}
        fetchGamesPending={fetchGamesPending}/>
    </div>
  )
}

const mapStateToProps = (state) => ({
  allTeams: state.teams.allTeams,
  fetchAllTeamsPending: state.teams.fetchAllTeamsPending,
  fetchAllTeamsError: state.teams.fetchAllTeamsError,
  selectedTeamID: state.teams.selectedTeamID,
  fetchGamesPending: state.teams.fetchGamesPending,
  players: state.teams.players,
})

const mapDispatchToProps = {
  fetchTeams,
  fetchPlayers,
  fetchTeamGames,
  updateSelectedTeamID,
}

export default connect(mapStateToProps, mapDispatchToProps)(RootScreen);

RootScreen.propTypes = {
  fetchTeams: PropTypes.func,
  fetchAllTeamsError: PropTypes.string,
  fetchAllTeamsPending: PropTypes.bool,
  updateSelectedTeamID: PropTypes.func,
  selectedTeamID: PropTypes.number,
  fetchPlayers: PropTypes.func,
  allTeams: PropTypes.object,
  fetchTeamGames: PropTypes.func,
  fetchGamesPending: PropTypes.func,
  players: PropTypes.array,
}
