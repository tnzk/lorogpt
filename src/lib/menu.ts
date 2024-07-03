export type PizzaMenuSetting = {
	sizes: {
		name: string;
		max_flavors: number;
		slices: number;
		serves_how_many_people: number;
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

/** Commented English name corresponding to each field. */
export type PizzaMenuSettingPtbr = {
	/** sizes */
	tamanhos: {
		/** name */
		nome: string;
		/** max_flavors */
		máximo_sabores: number;
		/** slices */
		fatias: number;
		/** serves_how_many_people */
		serve_quantas_pessoas: number;
	}[];
	/** flavors */
	sabores: {
		/** name */
		nome: string;
		/** ingredients */
		ingredientes: string[];
		/** price */
		preço: Record<string, number>;
	}[];
	/** stuffed_crust */
	borda_recheada: number;
	/** soft_drinks */
	refrigerantes: {
		/** name */
		nome: string;
		/** price */
		preço: number;
	}[];
};

export function translateMenuSetting(setting: PizzaMenuSetting): PizzaMenuSettingPtbr {
	return {
		tamanhos: setting.sizes.map((size) => ({
			nome: size.name,
			máximo_sabores: size.max_flavors,
			fatias: size.slices,
			serve_quantas_pessoas: size.serves_how_many_people
		})),
		sabores: setting.flavors.map((flavor) => ({
			nome: flavor.name,
			ingredientes: [...flavor.ingredients],
			preço: { ...flavor.price }
		})),
		borda_recheada: setting.stuffed_crust,
		refrigerantes: setting.soft_drinks.map((drink) => ({
			nome: drink.name,
			preço: drink.price
		}))
	};
}
