import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { PortfolioPageRoutingModule } from './portfolio-routing.module';
import { ComponentsModule } from '../../components/components.module';

import { PortfolioPage } from './portfolio.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PortfolioPageRoutingModule,
    ComponentsModule
  ],
  declarations: [
    PortfolioPage
  ]
})
export class PortfolioPageModule {}
