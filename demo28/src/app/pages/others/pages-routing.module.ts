import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AboutTwoPageComponent } from './about-two/about-two.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ContactOnePageComponent } from './contact-one/contact-one.component';

const routes: Routes = [
    {
        path: '',
        redirectTo: 'about',
        pathMatch: 'full'
    },
    {
        path: 'about',
        component: AboutTwoPageComponent
    },
    {
        path: '404',
        component: PageNotFoundComponent
    },
    {
        path: 'contact',
        component: ContactOnePageComponent
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})

export class PagesRoutingModule { };
