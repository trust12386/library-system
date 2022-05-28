export interface Today {
	confirm: number;
	isUpdated: boolean;
}

export interface Total {
	dead: number;
	highRiskAreaNum: number;
	provinceLocalConfirm: number;
	mediumRiskAreaNum: number;
	continueDayZeroLocalConfirm: number;
	mtime: string;
	showRate: boolean;
	heal: number;
	showHeal: boolean;
	continueDayZeroLocalConfirmAdd: number;
	nowConfirm: number;
	confirm: number;
	wzz: number;
	adcode: string;
}

export interface Total {
	confirm: number;
	dead: number;
	showHeal: boolean;
	provinceLocalConfirm: number;
	highRiskAreaNum: number;
	showRate: boolean;
	heal: number;
	mediumRiskAreaNum: number;
	continueDayZeroLocalConfirmAdd: number;
	continueDayZeroLocalConfirm: number;
	mtime: string;
	wzz: number;
	nowConfirm: number;
	adcode: string;
}

export interface Today {
	isUpdated: boolean;
	confirm: number;
	confirmCuts: number;
}

export interface Total {
	nowConfirm: number;
	continueDayZeroLocalConfirmAdd: number;
	highRiskAreaNum: number;
	dead: number;
	showRate: boolean;
	showHeal: boolean;
	wzz: number;
	mediumRiskAreaNum: number;
	heal: number;
	continueDayZeroLocalConfirm: number;
	confirm: number;
	provinceLocalConfirm: number;
	adcode: string;
	mtime: string;
}

export interface Children {
	name: string;
	date: string;
	today: Today;
	total: Total;
}

export interface Today {
	confirm: number;
	confirmCuts: number;
	isUpdated: boolean;
	tip: string;
	wzz_add: number;
}

export interface Children {
	total: Total;
	children: Children[];
	name: string;
	date: string;
	today: Today;
}

export interface AreaTree {
	name: string;
	today: Today;
	total: Total;
	children: Children[];
}

export interface ChinaTotal {
	nowSevere: number;
	noInfect: number;
	showLocalConfirm: number;
	localConfirm: number;
	localConfirmH5: number;
	confirm: number;
	nowConfirm: number;
	importedCase: number;
	heal: number;
	suspect: number;
	showlocalinfeciton: number;
	local_acc_confirm: number;
	dead: number;
	noInfectH5: number;
}

export interface ChinaAdd {
	confirm: number;
	suspect: number;
	nowSevere: number;
	noInfectH5: number;
	localConfirmH5: number;
	heal: number;
	dead: number;
	nowConfirm: number;
	importedCase: number;
	noInfect: number;
	localConfirm: number;
}

export interface ShowAddSwitch {
	suspect: boolean;
	heal: boolean;
	noInfect: boolean;
	all: boolean;
	confirm: boolean;
	dead: boolean;
	nowConfirm: boolean;
	nowSevere: boolean;
	importedCase: boolean;
	localConfirm: boolean;
	localinfeciton: boolean;
}

export interface Diseaseh5Shelf {
	areaTree: AreaTree[];
	lastUpdateTime: string;
	chinaTotal: ChinaTotal;
	chinaAdd: ChinaAdd;
	isShowAdd: boolean;
	showAddSwitch: ShowAddSwitch;
}

export interface StatisGradeCityDetail {
	province: string;
	nowConfirm: number;
	confirmAdd: number;
	heal: number;
	mtime: string;
	sdate: string;
	city: string;
	confirm: number;
	dead: number;
	grade: string;
	date: string;
	syear: number;
}

export interface RootObject {
	diseaseh5Shelf: Diseaseh5Shelf;
	statisGradeCityDetail: StatisGradeCityDetail[];
}