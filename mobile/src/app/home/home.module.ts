import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HomePage } from './home.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild([
            {
                path: '',
                component: HomePage,
                children: [
                    {
                        path: '',
                        redirectTo: 'events',
                        pathMatch: 'full'
                    },
                    {
                        path: 'invitations',
                        loadChildren: () => import('../invitations/invitations.module').then(m => m.InvitationsPageModule)
                    },
                    {
                        path: 'events',
                        loadChildren: () => import('../events/events.module').then(m => m.EventsPageModule)
                    },
                    {
                        path: 'profile',
                        loadChildren: () => import('../profile/profile.module').then(m => m.ProfilePageModule)
                    },
                ]
            },
        ]),
        TranslateModule
    ],
  declarations: [HomePage]
})
export class HomePageModule {}
