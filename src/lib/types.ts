export type PizzariaSetting = {
	pizzaria_name: string;
	sizes: {
		name: string;
		max_flavors: number;
	}[];
	flavors: {
		name: string;
		ingredients: string[];
		price: Record<string, number>;
	}[];
	stuffed_crust: number;
	soft_drinks: {
		name: string;
		price: number;
	}[];
};
