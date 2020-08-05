export interface Movieconfig {
	change_keys: string[];
	images: Images;
}

export interface Images {
	backdrop_sizes: string[];
	base_url: string;
	logo_sizes: string[];
	poster_sizes: string[];
	profile_sizes: string[];
	secure_base_url: string;
	still_sizes: string[];
}
