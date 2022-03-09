export const FETCH_TEAMS_PENDING = "FETCH_TEAMS_PENDING";
export const FETCH_TEAMS_SUCCESS = "FETCH_TEAMS_SUCCESS";
export const FETCH_TEAMS_ERROR = "FETCH_TEAMS_ERROR";

function fetchTeamsPending(){
  return { type: FETCH_TEAMS_PENDING };
}
function fetchTeamsSuccess(payload){
  return { type: FETCH_TEAMS_SUCCESS, payload };
}
function fetchTeamsError(error){
  return { type: FETCH_TEAMS_ERROR, error };
}

export function fetchTeams(){
  return async (dispatch) => {
    try{
      dispatch(fetchTeamsPending());
      const getAllTeamsAPIURL = 'https://www.balldontlie.io/api/v1/teams';
      const allTeamsResponse = await fetch(getAllTeamsAPIURL);
      const allTeamsData = await allTeamsResponse.json();
      const { data } = allTeamsData
      let dataObj = {};
      [...data].forEach((item) => { dataObj[item.id] = { teamInfo: item } })
      dispatch(fetchTeamsSuccess(dataObj))
    }catch(error){
      dispatch(fetchTeamsError(error));
    }
  }
}

export const UPDATE_SELECTED_TEAM_ID = "UPDATE_SELECTED_TEAM_ID";
function updateID(payload){
  return { type: UPDATE_SELECTED_TEAM_ID, payload}
}
export function updateSelectedTeamID(teamID){
  return dispatch => {
    dispatch(updateID(teamID));
  }
}

export const FETCH_TEAM_GAMES_PENDING = "FETCH_TEAM_GAMES_PENDING";
export const FETCH_TEAM_GAMES_SUCCESS = "FETCH_TEAM_GAMES_SUCCESS";
export const FETCH_TEAM_GAMES_ERROR = "FETCH_TEAM_GAMES_ERROR";

function fetchTeamGamesPending(){
  return { type: FETCH_TEAM_GAMES_PENDING };
}
function fetchTeamGamesSuccess(payload){
  return { type: FETCH_TEAM_GAMES_SUCCESS, payload };
}
function fetchTeamGamesError(error){
  return { type: FETCH_TEAM_GAMES_ERROR, error };
}

export function fetchTeamGames(teamID){
  return async (dispatch) => {
    try{
      dispatch(fetchTeamGamesPending());
      const teamIDs = [ teamID ]
      const endDate = new Date().toISOString().split('T')[0];
      const teamResponse = await fetch(`https://www.balldontlie.io/api/v1/games/?team_ids[]=${teamIDs}&seasons[]=2021&end_date=${endDate}&per_page=100`);
      const teamGamesData = await teamResponse.json();
      const { data } = teamGamesData;
      let dataObj = {};
      [...data].forEach((item) => { dataObj[item.id] = item })
      dispatch(fetchTeamGamesSuccess({dataObj, teamID}))
    }catch(error){
      dispatch(fetchTeamGamesError(error));
    }
  }
}


export const FETCH_PLAYERS_PENDING = "FETCH_PLAYERS_PENDING";
export const FETCH_PLAYERS_SUCCESS = "FETCH_PLAYERS_SUCCESS";
export const FETCH_PLAYERS_ERROR = "FETCH_PLAYERS_ERROR";

function fetchPlayersPending(){
  return { type: FETCH_PLAYERS_PENDING };
}
function fetchPlayersSuccess(payload){
  return { type: FETCH_PLAYERS_SUCCESS, payload };
}
function fetchPlayersError(error){
  return { type: FETCH_PLAYERS_ERROR, error };
}

export function fetchPlayers(){
  return async (dispatch) => {
    try{
      dispatch(fetchPlayersPending());
      let total_pages;
      const playersResponse = await fetch(`https://www.balldontlie.io/api/v1/players/?per_page=100`);
      const playersData = await playersResponse.json();
      let players = playersData.data;
      ({ total_pages } = playersData.meta)
      const remainingPages = total_pages;
      for(let x = 2; x <= remainingPages; x++){
        const playersResponse = await fetch(`https://www.balldontlie.io/api/v1/players/?per_page=100&page=${x}`);
        const playersData = await playersResponse.json();
        const { data } = playersData
        players = players.concat(data);
      }
      dispatch(fetchPlayersSuccess(players))
    }catch(error){
      dispatch(fetchPlayersError(error));
    }
  }
}
