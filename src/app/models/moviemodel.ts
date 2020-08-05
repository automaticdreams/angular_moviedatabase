export interface Movie {
	popularity: number;
	vote_count: number;
	poster_path: string;
	title: string;
	video: boolean;
	id: number;
	adult: boolean;
	backdrop_path: string;
	original_language: string;
	original_title: string;
	genre_ids: [];
	vote_average: number;
	overview: string;
	release_date: string;
}
