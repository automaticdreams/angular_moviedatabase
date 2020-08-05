import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { CommonModule } from '@angular/common';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { NowShowingComponent } from './nowshowing.component';
import { FilterPipe} from '../filter.pipe';

const showingRoutes: Routes = [
	{ path: 'now-showing',  component: NowShowingComponent }
];

@NgModule({
	declarations: [
	NowShowingComponent,
	FilterPipe
	],
	imports: [
	CommonModule,
	HttpClientModule,
	FormsModule,
	RouterModule.forChild(showingRoutes)

	],
	exports: [NowShowingComponent]
})
export class NowShowingModule { }
