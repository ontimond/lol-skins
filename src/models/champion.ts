import { API_CHAMP_SQUARE_IMG_URL } from "@env";

export class ChampionImage {
  constructor(
    private readonly _full: string,
    private readonly _sprite: string,
    private readonly _group: string,
    public x: number,
    public y: number,
    public w: number,
    public h: number
  ) {}

  public get full(): string {
    return API_CHAMP_SQUARE_IMG_URL + this._full;
  }

}

export class Champion {
  constructor(
    public id: number,
    public name: string,
    public title: string,
    public key: string,
    public image: ChampionImage
  ) {}
}