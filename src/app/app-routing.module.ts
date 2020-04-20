import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  { path: 'home', loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)},
  { path: 'auth', loadChildren: './auth/auth.module#AuthPageModule' },
  { path: 'basket', loadChildren: './basket/basket.module#BasketPageModule' },
  {
    path: 'add-stock',
    loadChildren: () => import('./add-stock/add-stock.module').then( m => m.AddStockPageModule)
  },
  {
    path: 'user-history',
    loadChildren: () => import('./user-history/user-history.module').then( m => m.UserHistoryPageModule)
  },
  {
    path: 'reviews',
    loadChildren: () => import('./reviews/reviews.module').then( m => m.ReviewsPageModule)
  },
  {
    path: 'update-stock',
    loadChildren: () => import('./update-stock/update-stock.module').then( m => m.UpdateStockPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
