import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { TestBed , inject} from '@angular/core/testing';

import { DataService } from './data.service';
import { Movieconfig } from '../models/apimodel';
import { CONFIG } from '../config';

import { of } from 'rxjs';

describe('DataService', () => {

	// tslint:disable-next-line:prefer-const
	let typeConfig: Movieconfig[];
	const configUrl = CONFIG.configURL;
	const movieUrl = CONFIG.apiURL;

	beforeEach(() => {
	TestBed.configureTestingModule({
		imports: [ HttpClientTestingModule ],
		providers: [ DataService ]
	});

	});

	it('should be created', inject([DataService], (service: DataService) => {
	expect(service).toBeTruthy();
	}));

	describe('getConfig service', () => {

	it('should return a config object correctly', inject(
		[DataService, HttpTestingController], (dataService: DataService, backend: HttpTestingController) => {
		const result = of(typeConfig);
		let response = null;

		dataService.getConfig().subscribe(
			(receivedResponse: any) => { response = receivedResponse; },
			(error: any) => {response = error; }
		);

		const req = backend.expectOne({url: configUrl});
		req.flush(result);

		expect(req.request.method).toEqual('GET');
		expect(response).toEqual(result);
		backend.verify();
		}
	));

	it('should return error if there were problems', inject(
		[DataService, HttpTestingController], (dataService: DataService, backend: HttpTestingController) => {
		let response = null;
		let errResponse = null;
		const mockErrorResponse = { status: 401, statusText: 'Bad Request' };
		const data = 'Invalid request parameters';

		dataService.getConfig().subscribe(
			(receivedResponse: any) => { response = receivedResponse; },
			(error: any) => errResponse = error
		);
		backend.expectOne({url: configUrl}).flush(data, mockErrorResponse);

		expect(errResponse.error).toBe(data);
		backend.verify();
		}

	));

	});

	describe('getData service', () => {

	it('should return data (called once)', inject(
		[DataService, HttpTestingController], (dataService: DataService, backend: HttpTestingController) => {
		const result = {results: [
			{ id: 1, name: 'A' },
			{ id: 2, name: 'B' },
			]};
		let response = null;

		dataService.getData().subscribe(
			(receivedResponse: any) => { response = receivedResponse; }
		);

		const req = backend.expectOne({url: movieUrl});
		req.flush(result);

		expect(req.request.method).toEqual('GET');
		expect(response).toEqual(result);
		backend.verify();
		}
	));

	});

});
