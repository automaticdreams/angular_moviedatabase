import { Router } from '@angular/router';
import { Injectable, Injector } from '@angular/core';

@Injectable({
	providedIn: 'root'
})
export class GlobalErrorHandlerService {

	constructor(injector: Injector, private router: Router) {
		setTimeout(() => this.router = injector.get(Router));
	}

	handleError(error) {

	console.error('An error occurred:', error.message); // this would normally be logged and reported

	this.router.navigate(['/error']);

	}

}
