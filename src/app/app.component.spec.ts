import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { NowShowingComponent } from './nowshowing/nowshowing.component';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { FilterPipe} from './filter.pipe';

describe('AppComponent', () => {
	beforeEach(async(() => {
		TestBed.configureTestingModule({
			imports: [FormsModule, RouterTestingModule],
			declarations: [
			AppComponent,
			HeaderComponent,
			NowShowingComponent,
			FilterPipe
			],
			providers: [ HttpClient, HttpHandler, FormsModule, ]
		}).compileComponents();
	}));

	it('should create the app', () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	});

	it(`should have as title 'moviedatabase'`, () => {
		const fixture = TestBed.createComponent(AppComponent);
		const app = fixture.debugElement.componentInstance;
		expect(app.title).toEqual('moviedatabase');
	});
});
