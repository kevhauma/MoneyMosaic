import { Routes } from '@angular/router';
import { DashboardDetailComponent } from './pages/dashboard-detail/dashboard-detail.component';
import { DashboardPageComponent } from './pages/dashboard-page/dashboard-page.component';
import { EntryPageComponent } from './pages/entry-page/entry-page.component';
import { ImportPageComponent } from './pages/import-page/import-page.component';

export const routes: Routes = [
    {
        path: '',
        component: EntryPageComponent,
    },
    {
        path: 'dashboard',
        title: 'Dashboard',
        component: DashboardPageComponent,
        children: [
            {
                path: 'import',
                title: 'Import',
                component: ImportPageComponent,

            },
            {
                path: ':slug',
                title: "Detail",
                component: DashboardDetailComponent,

            },
        ],
    },];
