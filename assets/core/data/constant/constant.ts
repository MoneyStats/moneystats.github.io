export enum ModalConstant {
  ADDWALLET = 'addWalletModal',
  EDITWALLET = 'editWalletModal',
  DELETEWALLET = 'deleteWalletModal',
  RESTOREWALLET = 'restoreWalletModal',
  ACCOUNTLIST = 'accountListModal',
  ACCOUNTDETAILS = 'accountDetailsModal',
  VERSION = 'versionModal',
  CHANGELOG = 'changelogModal',
  PROFILESETTINGS = 'profileSettingsModal',
  LANGUAGES = 'languagesModal',
  ADDSTATS = 'addStatsPage',
  CATEGORY = 'categoryModal',
  REPORTBUG = 'reportBugModal',
  INFOAPP = 'infoAppModal',
  UPDATEAPP = 'updateAppModal',
  OPENBUG = 'openBugModal',
  BACKUPDATA = 'backupDataModal',
  ADDASSET = 'addAssetModal',
  ADDOPERATIONS = 'addOperationsModal',
  ADDCRYPTOCURRENCY = 'addCryptoCurrencyModal',
  INFO = 'infoModal',
  CRYPTOOPERATIONDETAILS = 'modalCryptoOperationDetails',
  CRYPTOHISTORY = 'modalCryptoHistory',
  CRYPTOTRADINGRESUME = 'modalCryptoTradingResume',
  CRYPTOOPERATION = 'modalCryptoOperation',
  CLOSEOPERATION = 'closeOperationModal',
}

export enum SelectAssetConstant {
  ADDASSET = 'addAssetModalWrapper',
  NEWINVESTMENT = 'newCryptoInvestment',
  HOLDING = 'newHoldingOperation',
  TRADING = 'newTradingOperation',
  TRANSFER = 'newTransferOperation',
}

export enum StorageConstant {
  GITHUBACCOUNT = 'github_account',
  ACCESSTOKEN = 'accessToken',
  USERACCOUNT = 'userAccount',
  HIDDENAMOUNT = 'hiddenAmount',
  AUTOUPDATE = 'auto_update',
}

export enum ProfileSettings {
  USERNAME = 'usernameSettings',
  EMAIL = 'emailSettings',
  PASSWORD = 'passwordSettings',
}

export enum LanguagesSettings {
  ATTR_LANGUAGE = 'lang',
  ENGLISH = 'en-GB',
  ITALIAN = 'it-IT',
}

export enum AppConfigConst {
  DEFAULT_WALLET_IMG = 'assets/images/sample/wallet.png',
  DEFAULT_USER_IMG = 'assets/images/sample/avatar.png',
}

export enum OperationsType {
  HOLDING = 'Holding',
  NEWINVESTMENT = 'New Investment',
  TRADING = 'Trading',
  TRANSFER = 'Transfer',
  CLOSEOPERATION = 'Close-Position',
}

export enum MarketDataCategory {
  CRYPTOCURRENCY = 'Cryptocurrency',
  STABLECOIN = 'Stablecoin',
}

export enum UserRole {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export var Operations = ['New Investment', 'Holding', 'Trading', 'Transfer'];

export const ApexChartsOptions = {
  LIVE_PRICE_AS_LAST_DATA: false,
  NOT_LIVE_PRICE_AS_LAST_DATA: true,
  MOBILE_MODE: 200,
  DESKTOP_MODE: 350,
  ULTRA_WIDE: 450,
};
