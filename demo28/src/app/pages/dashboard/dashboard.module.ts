import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
	declarations: [
		HomeComponent,
	],

	imports: [
    NgbModule
	]
})

export class DashboardModule { }
