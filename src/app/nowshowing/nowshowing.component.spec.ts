import { HttpClientTestingModule } from '@angular/common/http/testing';

import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { of } from 'rxjs';

import { FormsModule } from '@angular/forms';
import { FilterPipe} from '../filter.pipe';
import { NowShowingComponent } from './nowshowing.component';
import { DataService } from '../services/data.service';

const dataServiceStub = {
	getConfig() {
		const config = {
			change_keys: 'abc',
			images: {
				base_url: 'http://example.com/',
				logo_sizes: ['w45', 'w92', 'w154', 'original']
			}
		};
		return of( config );
	},
	getData() {
		const movies = {results: [{id: 1, poster_path: '/a.jpg', vote_count: 1}, {id: 2, poster_path: '/b.jpg', vote_count: 5}]};
		return of( movies );
	}
};
const dataServiceStubEmptyMovies = {
	getConfig() {
		const config = {
			change_keys: 'abc',
			images: {
				base_url: 'http://example.com/',
				logo_sizes: ['w45', 'w92', 'w154', 'original']
			}
		};
		return of( config );
	},
	getData() {
		const movies = {results: []};
		return of( movies );
	}
};
const dataServiceStubEmptyConfig = {
	getConfig() {
		const config = {
			change_keys: 'abc',
			images: {}
		};
		return of( config );
	},
	getData() {
		const movies = {results: []};
		return of( movies );
	}
};

describe('NowShowingComponent with data', () => {
	let component: NowShowingComponent;
	let fixture: ComponentFixture<NowShowingComponent>;
	let debugEl: HTMLElement;
	let li: NodeList;
	let img: HTMLImageElement;
	let input: HTMLInputElement;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule, FormsModule],
			declarations: [ NowShowingComponent, FilterPipe ],
			providers: [ {provide: DataService, useValue: dataServiceStub} ]
		})
		.compileComponents();
		fixture = TestBed.createComponent(NowShowingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		debugEl = fixture.debugElement.nativeElement;
	}));

	it('should create component and get stub data', () => {
		expect(component).toBeTruthy();
		expect(component.config.change_keys).toEqual('abc');
		expect(component.config.images.logo_sizes.length).toEqual(4);
		expect(component.movies.length).toBe(2);
		expect(component.movies[0]).toEqual(jasmine.objectContaining({id: 1}));
	});

	it('should display an <li> element for each movie returned', () => {
		li = debugEl.querySelectorAll('li');
		expect(li.length).toBe(2);
	});

	it('should display images with the expected src', () => {
		img = debugEl.querySelector('img');
		expect(img.src).toBe('http://example.com/original/a.jpg');
	});

	it('should display a filter', () => {
		input = debugEl.querySelector('input');
		expect(input).toBeTruthy();
	});

	it('should not filter when filter is empty', fakeAsync(() => {
		li = debugEl.querySelectorAll('li');
		expect(li.length).toBe(2);
	}));

	it('should filter and give 1 result', fakeAsync(() => {
		input = debugEl.querySelector('input');
		input.value = '2';
		input.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		li = debugEl.querySelectorAll('li');
		expect(li.length).toBe(1);
	}));

	it('should filter and give 0 results', fakeAsync(() => {
		input = debugEl.querySelector('input');
		input.value = '6';
		input.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		li = debugEl.querySelectorAll('li');
		expect(li.length).toBe(0);
	}));

	it('should return full response when filter is cleared', fakeAsync(() => {
		input = debugEl.querySelector('input');
		input.value = '6';
		input.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		li = debugEl.querySelectorAll('li');
		expect(li.length).toBe(0);
		input.value = '';
		input.dispatchEvent(new Event('input'));
		fixture.detectChanges();
		li = debugEl.querySelectorAll('li');
		expect(li.length).toBe(2);
	}));
});

describe('NowShowingComponent without movie data', () => {
	let component: NowShowingComponent;
	let fixture: ComponentFixture<NowShowingComponent>;
	let debugEl: HTMLElement;
	let li: NodeList;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule, FormsModule],
			declarations: [ NowShowingComponent, FilterPipe ],
			providers: [ {provide: DataService, useValue: dataServiceStubEmptyMovies} ]
		})
		.compileComponents();
		fixture = TestBed.createComponent(NowShowingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		debugEl = fixture.debugElement.nativeElement;
	}));

	it('should create component and get stub data', () => {
		expect(component).toBeTruthy();
		expect(component.config.change_keys).toEqual('abc');
		expect(component.config.images.logo_sizes.length).toEqual(4);
		expect(component.movies.length).toBe(0);
	});

	it('should not display any <li> element when there are no movies', () => {
		li = debugEl.querySelectorAll('li');
		expect(li.length).toBe(0);
	});
});

describe('NowShowingComponent without config data', () => {
	let component: NowShowingComponent;
	let fixture: ComponentFixture<NowShowingComponent>;
	let debugEl: HTMLElement;
	let ul: NodeList;
	let li: NodeList;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [ HttpClientTestingModule, FormsModule],
			declarations: [ NowShowingComponent, FilterPipe ],
			providers: [ {provide: DataService, useValue: dataServiceStubEmptyConfig} ]
		})
		.compileComponents();
		fixture = TestBed.createComponent(NowShowingComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
		debugEl = fixture.debugElement.nativeElement;
	}));

	it('should create component but not get movie data', () => {
		expect(component).toBeTruthy();
		expect(component.config.change_keys).toEqual('abc');
		expect(component.movies).toBeFalsy();
	});

	it('should not display any <li> element when there are no movies', () => {
		li = debugEl.querySelectorAll('li');
		expect(li.length).toBe(0);
		ul = debugEl.querySelectorAll('ul');
		expect(ul.length).toBe(0);
	});
});
