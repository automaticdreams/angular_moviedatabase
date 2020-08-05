import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

import { Movieconfig } from '../models/apimodel';
import { Movie } from '../models/moviemodel';

import { CONFIG } from '../config';

import { catchError} from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
	providedIn: 'root'
})
export class DataService {
	constructor(
	private http: HttpClient
	) {}
	private movieUrl = CONFIG.apiURL;
	private configUrl = CONFIG.configURL;

	private static handleError(error: HttpErrorResponse) {
	console.log(error);
	return throwError(error);
	}

	getConfig() {
	return this.http.get<Movieconfig>(this.configUrl).pipe(
		catchError(DataService.handleError)
	);

	}

	getData() {
	return this.http.get<Movie[]>(this.movieUrl).pipe(
		catchError(DataService.handleError)
	);
	}

}
