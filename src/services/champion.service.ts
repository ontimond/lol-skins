import axiosInstance from "../axios.instance";
import { Champion, ChampionImage } from "../models/champion";

export class ChampionService {
  public readonly champions: Champion[] = [];

  async load(): Promise<Champion[]> {
    const {
      data: { data: champions },
    } = await axiosInstance.get("data/en_US/champion.json");

    this.champions.push(
      ...Object.values(champions).map<Champion>(
        (champion: any) =>
          new Champion(
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
            )
          )
      )
    );

    return this.champions;
  }
}
