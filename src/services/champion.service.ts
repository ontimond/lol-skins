import axiosInstance from "../axios.instance";
import { Champion, ChampionImage, ChampionSkin } from "../models/champion";

export class ChampionService {
  async getChampions(): Promise<Champion[]> {
    const {
      data: { data: champions },
    } = await axiosInstance.get("data/en_US/champion.json");

    return Promise.all(
      Object.values(champions).map<Promise<Champion>>(async (champion: any) => {
        const {
          data: {
            data: {
              [champion.id]: { skins },
            },
          },
        } = await axiosInstance.get(`data/en_US/champion/${champion.id}.json`);

        return new Champion(
          champion.id,
          champion.name,
          champion.title,
          champion.key,
          new ChampionImage(
            champion.image.full,
            champion.image.sprite,
            champion.image.group,
            champion.image.x,
            champion.image.y,
            champion.image.w,
            champion.image.h
          ),
          skins.map(
            (skin: any) =>
              new ChampionSkin(
                skin.id,
                skin.num,
                skin.name,
                skin.chromas,
                champion
              )
          )
        );
      })
    );
  }
}
