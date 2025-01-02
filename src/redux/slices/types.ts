
export interface IcartItems {
	id: string;
	imageUrl: string;
	title: string;
	type: string;
	size: string;
	price: number;
	count: number;
}

export interface IinitialState {
	totalPrice: number;
	items: IcartItems[];
}

export type SortProps = {
	name: string;
	sortProperty: 'rating' | 'rating asc' | 'price' | 'price asc' | 'title' | 'title asc';
	value: 'desc' | 'asc'
}

export interface IfilterSlice {
	searchValue: string;
	categoryId: number;
	sort: SortProps;
}

export interface IpizzaItems {
	id: string;
	title: string;
	imageUrl: string;
	price: number;
	types: number[];
	sizes: number[];
}

export enum initialStateStatus {
	LOADING = 'loading',
	SUCCESS = 'success',
	ERROR = 'error'
}

export interface IpizzaInitialState {
	items: IpizzaItems[];
	status: initialStateStatus
}

export type fetchPizzasArgs = {
	categoryId: number;
	sort: string;
	value: string;
	paginationId: number;
}