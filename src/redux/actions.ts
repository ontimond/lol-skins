import { ChampionService } from "../services/champion.service";
import { AppDispatch } from "./store";

export enum ChampionActionTypes {
  CHAMPION_LOADING = "CHAMPION_LOADING",
  CHAMPION_SUCCESS = "CHAMPION_SUCCESS",
  CHAMPION_ERROR = "CHAMPION_ERROR",
  ADD_TO_FAVORITES = "ADD_TO_FAVORITES",
  REMOVE_FROM_FAVORITES = "REMOVE_FROM_FAVORITES",
}

const championService = new ChampionService();

export const loadChampions = () => async (dispatch: AppDispatch) => {
  try {
    dispatch({ type: ChampionActionTypes.CHAMPION_LOADING });
    const champions = await championService.getChampions();
    dispatch({
      type: ChampionActionTypes.CHAMPION_SUCCESS,
      payload: champions,
    });
  } catch (err) {
    dispatch({
      type: ChampionActionTypes.CHAMPION_ERROR,
      payload: err.message,
    });
  }
};

export const addToFavorites = (id: number) => {
  return {
    type: ChampionActionTypes.ADD_TO_FAVORITES,
    payload: id,
  };
};

export const removeFromFavorites = (id: number) => {
  return {
    type: ChampionActionTypes.REMOVE_FROM_FAVORITES,
    payload: id,
  };
};
