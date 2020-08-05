import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';

import { HeaderComponent } from './header/header.component';
import { NowShowingModule } from './nowshowing/nowshowing.module';

import { SystemErrorComponent } from './system-error/system-error.component';
import { GlobalErrorHandlerService } from './services/global-error-handler.service';

const appRoutes: Routes = [
	{ path: 'error', component: SystemErrorComponent },
	{
		path: '',
		redirectTo: '/now-showing',
		pathMatch: 'full'
	},
	{
		path: '**',
		redirectTo: '/now-showing',
		pathMatch: 'full'
 }
];

@NgModule({
	declarations: [
		AppComponent,
		HeaderComponent,
		SystemErrorComponent,
	],
	imports: [
		BrowserModule,
		NowShowingModule,
		RouterModule.forRoot(
			appRoutes,
		),
	],
	providers: [
		{ provide: ErrorHandler, useClass: GlobalErrorHandlerService },
	],
	bootstrap: [AppComponent]
})
export class AppModule { }
