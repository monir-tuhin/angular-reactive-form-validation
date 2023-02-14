import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DynamicValidationComponent} from "./dynamic-validation/dynamic-validation.component";

const routes: Routes = [
  {
    path: 'dynamic-validation',
    component: DynamicValidationComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
