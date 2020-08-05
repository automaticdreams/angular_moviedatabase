import { Component, OnInit } from '@angular/core';
import { DataService } from '../services/data.service';
import { Movieconfig } from '../models/apimodel';
import { Movie } from '../models/moviemodel';

@Component({
	selector: 'app-nowshowing',
	templateUrl: './nowshowing.component.html',
	styleUrls: ['./nowshowing.component.scss']
})
export class NowShowingComponent implements OnInit {
	url: string;
	config: Movieconfig;
	movies: Movie[];
	searchText: any;
	constructor(private data: DataService) {
	}

	ngOnInit() {
	this.data.getConfig()
	.subscribe((data: Movieconfig) => {
		this.config = { ...data};
		if (this.config.images && Object.keys(this.config.images).length > 0) {
		this.getMovies();
		}
	});
	}

	getMovies(): void {
	this.data.getData()
	.subscribe((movies: any) => {
		this.movies = movies.results;
	});
	}

}
