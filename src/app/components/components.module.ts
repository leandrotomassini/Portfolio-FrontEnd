import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

import { NgChartsModule } from 'ng2-charts';

import { HeaderComponent } from './header/header.component';
import { PortadaComponent } from './portada/portada.component';
import { ExperienciaComponent } from './experiencia/experiencia.component';
import { AcercaDeComponent } from './acerca-de/acerca-de.component';
import { ProyectosComponent } from './proyectos/proyectos.component';
import { SkillsComponent } from './skills/skills.component';
import { EducacionComponent } from './educacion/educacion.component';
import { DonaComponent } from './dona/dona.component';



@NgModule({
  declarations: [
    HeaderComponent,
    PortadaComponent,
    ExperienciaComponent,
    AcercaDeComponent,
    ProyectosComponent,
    SkillsComponent,
    EducacionComponent,
    DonaComponent
  ],
  exports: [
    HeaderComponent,
    PortadaComponent,
    ExperienciaComponent,
    AcercaDeComponent,
    ProyectosComponent,
    SkillsComponent,
    EducacionComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    NgChartsModule
  ]
})
export class ComponentsModule { }
