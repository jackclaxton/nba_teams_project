import { TeamActions } from "../actions";

const initialState = {
  allTeams: {},
  fetchAllTeamsPending: false,
  fetchAllTeamsError: undefined,
  selectedTeamID: undefined,
  fetchGamesPending: false,
  fetchGamesError: undefined,
  players: [],
}

export function teamReducers(state=initialState, action){
  switch(action.type){
    case TeamActions.FETCH_TEAMS_PENDING:
      return {
        ...state,
        fetchAllTeamsPending: true,
      }
    case TeamActions.FETCH_TEAMS_SUCCESS:
      return {
        ...state,
        fetchAllTeamsPending: false,
        allTeams: action.payload,
      }
    case TeamActions.FETCH_TEAMS_ERROR:
      return {
        ...state,
        fetchAllTeamsPending: false,
        fetchAllTeamsError: action.error.message,
      }
    case TeamActions.UPDATE_SELECTED_TEAM_ID:{
      return{
        ...state,
        selectedTeamID: action.payload,
      }
    }
    case TeamActions.FETCH_TEAM_GAMES_PENDING:
      return{
        ...state,
        fetchGamesPending: true,
      }
    case TeamActions.FETCH_TEAM_GAMES_SUCCESS:
      return{
        ...state,
        allTeams:{
          ...state.allTeams,
          [action.payload.teamID]: {
            ...state.allTeams[action.payload.teamID],
            teamGames: action.payload.dataObj,
          }
        },
        fetchGamesPending: false,
      }
    case TeamActions.FETCH_TEAM_GAMES_ERROR:
      return{
        ...state,
        fetchGamesPending: false,
        fetchGamesError: action.error,
      }
    // case TeamActions.FETCH_PLAYERS_PENDING:
    //   return{
    //     ...state,
    //   }
    case TeamActions.FETCH_PLAYERS_SUCCESS:
      return{
        ...state,
        players: action.payload,
      }
    // case TeamActions.FETCH_PLAYERS_ERROR:
    //   return{
    //     ...state,
    //   }
    default:
      return state;
  }
}