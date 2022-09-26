import { Champion } from "../models/champion";
import { ChampionActionTypes } from "./actions";

export interface ChampionState {
  champions: Champion[];
  favoriteChampions: Champion[];
  isLoading: boolean;
  error: string;
}

export const initialState: ChampionState = {
  champions: [],
  favoriteChampions: [],
  isLoading: false,
  error: "",
};

export function reducer(state = initialState, action: any) {
  switch (action.type) {
    case ChampionActionTypes.CHAMPION_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ChampionActionTypes.CHAMPION_SUCCESS:
      return {
        ...state,
        isLoading: false,
        champions: action.payload,
      };
    case ChampionActionTypes.CHAMPION_ERROR:
      return {
        ...state,
        isLoading: false,
        error: action.payload,
      };
    case ChampionActionTypes.ADD_TO_FAVORITES:
      const champion = state.champions.find(
        (champion) => champion.id === action.payload
      );
      return {
        ...state,
        favoriteChampions: [...state.favoriteChampions, champion],
      };
    case ChampionActionTypes.REMOVE_FROM_FAVORITES:
      return {
        ...state,
        favoriteChampions: state.favoriteChampions.filter(
          (champion) => champion.id !== action.payload
        ),
      };
    default:
      return state;
  }
}
