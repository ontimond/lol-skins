import {
  API_CHAMP_SQUARE_IMG_URL,
  API_CHAMP_SPLASH_IMG_URL,
  API_CHAMP_LOADING_IMG_URL,
} from "@env";

export class ChampionImage {
  public full: string;
  public splash: string;

  constructor(
    private readonly _full: string,
    private readonly _sprite: string,
    private readonly _group: string,
    public x: number,
    public y: number,
    public w: number,
    public h: number,
    public champion: Champion
  ) {
    this.full = API_CHAMP_SQUARE_IMG_URL + this._full;
    this.splash = API_CHAMP_SPLASH_IMG_URL + this.champion.id + "_0.jpg";
  }
}

export class Champion {
  constructor(
    public id: number,
    public name: string,
    public title: string,
    public key: string,
    public lore: string,
    public image: ChampionImage,
    public skins: ChampionSkin[],
    public stats: ChampionStats
  ) {}
}

export class ChampionSkin {
  public splash: string;
  public loading: string;
  constructor(
    public id: number,
    public num: number,
    public name: string,
    public chromas: boolean,
    private champion: Champion
  ) {
    this.splash =
      API_CHAMP_SPLASH_IMG_URL + this.champion.id + "_" + this.num + ".jpg";
    this.loading =
      API_CHAMP_LOADING_IMG_URL + this.champion.id + "_" + this.num + ".jpg";
  }
}

export class ChampionStats {
  constructor(
    public hp: number,
    public hpperlevel: number,
    public mp: number,
    public mpperlevel: number,
    public movespeed: number,
    public armor: number,
    public armorperlevel: number,
    public spellblock: number,
    public spellblockperlevel: number,
    public attackrange: number,
    public hpregen: number,
    public hpregenperlevel: number,
    public mpregen: number,
    public mpregenperlevel: number,
    public crit: number,
    public critperlevel: number,
    public attackdamage: number,
    public attackdamageperlevel: number,
    public attackspeedperlevel: number,
    public attackspeed: number
  ) {}
}
