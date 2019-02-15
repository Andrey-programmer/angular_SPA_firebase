import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { PreloadAllModules , RouterModule, Routes } from '@angular/router';

import { SystemModule } from './system/system.module';
import { AuthModule } from './auth/auth.module';
import { NotFoundComponent } from './shared/components/not-found/not-found.component';


const routes: Routes = [
    {
      path: 'system', loadChildren: './system/system.module#SystemModule'
    },
    /* {
      path: 'system', loadChildren: () => SystemModule
    }, */
    {
      path: '**', component: NotFoundComponent
    }
];


@NgModule({
  imports: [
    CommonModule,
    AuthModule,
    // SystemModule,
    HttpClientModule,
    RouterModule.forRoot(routes,
                        {
                            preloadingStrategy: PreloadAllModules
                        })
  ],
  exports: [
    RouterModule
  ],
  declarations: []
})
export class AppRoutingModule {  }
