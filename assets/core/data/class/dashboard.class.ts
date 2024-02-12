import { AppConfigConst } from '../constant/constant';
import {
  CategoryInterface,
  DashboardInterface,
  StatsInterface,
  WalletInterface,
} from '../interfaces/dashboard.interface';
import { Asset } from './crypto.class';
import { GenericModel } from './generic.class';
import { environment } from 'src/environments/environment';

export class Dashboard implements DashboardInterface {
  balance: number = 0;
  value: string = 'USD';
  performance: number = 0;
  performanceValue: number = 0;
  performanceSince: Date = new Date();
  performanceLastDate: Date = new Date();
  lastStatsPerformance: number = 0;
  lastStatsBalanceDifference: number = 0;
  statsWalletDays: string[] = [];
  categories: Category[] = [];
  wallets: Wallet[] = [];
}

export class Wallet extends GenericModel implements WalletInterface {
  name!: string;
  type!: string;
  imgName!: string;
  info?: Map<string, string>;
  infoString?: string;
  fileImage!: File;
  img: string = environment.baseUrlHeader + AppConfigConst.DEFAULT_WALLET_IMG;
  category!: string;
  allTimeHigh: number = 0;
  allTimeHighDate: Date = new Date();
  highPrice: number = 0;
  highPriceDate: Date = new Date();
  lowPrice: number = 0;
  lowPriceDate: Date = new Date();
  performanceLastStats: number = 0;
  differenceLastStats: number = 0;
  dateLastStats: Date = new Date();
  balance: number = 0;
  newBalance!: number; // Local Variable, used just for save
  assets: Asset[] = [];
  history: Stats[] = [];
}

export class Stats extends GenericModel implements StatsInterface {
  date!: Date;
  balance!: number;
  percentage!: number;
  trend!: number;
}

export class Category extends GenericModel implements CategoryInterface {
  name!: string;
  img!: string;
}
