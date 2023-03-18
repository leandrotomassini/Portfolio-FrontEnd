import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';

// módulos para el cliente http y los formularios
import {DragDropModule} from '@angular/cdk/drag-drop'
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { LoginComponent } from './auth/login/login.component';
import { interceptorProvider } from './services/producto-interceptor.service';
import { AdminComponent } from './users/admin/admin.component';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { PerfilUsuarioComponent } from './portfolio/perfil-usuario/perfil-usuario.component';
import { EducacionComponent } from './portfolio/educacion/educacion.component';
import { ExperienciaComponent } from './portfolio/experiencia/experiencia.component';
import { HabilidadesComponent } from './portfolio/habilidades/habilidades.component';
import { ProyectosComponent } from './portfolio/proyectos/proyectos.component';
import { FooterComponent } from './portfolio/footer/footer.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EditarPerfilUsuarioComponent } from './portfolio/perfil-usuario/editar-perfil-usuario/editar-perfil-usuario.component';
import { AgregarEducacionComponent } from './portfolio/educacion/agregar-educacion/agregar-educacion.component';
import { EditarEducacionComponent } from './portfolio/educacion/editar-educacion/editar-educacion.component';
import { AgregarExperienciaComponent } from './portfolio/experiencia/agregar-experiencia/agregar-experiencia.component';
import { EditarExperienciaComponent } from './portfolio/experiencia/editar-experiencia/editar-experiencia.component';
import { AgregarHabilidadesComponent } from './portfolio/habilidades/agregar-habilidades/agregar-habilidades.component';
import { EditarHabilidadesComponent } from './portfolio/habilidades/editar-habilidades/editar-habilidades.component';
import { AgregarProyectoComponent } from './portfolio/proyectos/agregar-proyecto/agregar-proyecto.component';
import { EditarProyectoComponent } from './portfolio/proyectos/editar-proyecto/editar-proyecto.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DetalleProyectoComponent } from './portfolio/proyectos/detalle-proyecto/detalle-proyecto.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    AdminComponent,
    PortfolioComponent,
    PerfilUsuarioComponent,
    EducacionComponent,
    ExperienciaComponent,
    HabilidadesComponent,
    ProyectosComponent,
    FooterComponent,
    EditarPerfilUsuarioComponent,
    AgregarEducacionComponent,
    EditarEducacionComponent,
    AgregarExperienciaComponent,
    EditarExperienciaComponent,
    AgregarHabilidadesComponent,
    EditarHabilidadesComponent,
    AgregarProyectoComponent,
    EditarProyectoComponent,
    DetalleProyectoComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NgbModule,
    BrowserModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    DragDropModule,
  
  ],
  providers: [interceptorProvider],
  bootstrap: [AppComponent],
  entryComponents: [EditarEducacionComponent],
})
export class AppModule {}
