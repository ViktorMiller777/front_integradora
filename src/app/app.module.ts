import { NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NbThemeModule, NbButtonModule, NbSelectModule, NbLayoutModule, NbCardModule, NbFormFieldModule } from '@nebular/theme';
import { NbEvaIconsModule } from '@nebular/eva-icons';

// Importacion de modulos de los componentes
import { HomeModule } from './components/home/home.module';
import { RegisterModule } from './components/register/register.module';
import { LoginModule } from './components/login/login.module';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { PerfilModule } from './components/perfil/perfil.module';
import { MisDipositivosModule } from './components/mis-dipositivos/mis-dipositivos.module';
import { SensoresModule } from './components/sensores/sensores.module';
import { VerificarCodigoModule } from './components/verificar-codigo/verificar-codigo.module';
import { RecuperarContrasenaModule } from './components/recuperar-contrasena/recuperar-contrasena.module';
import { NuevaContrasenaModule } from './components/nueva-contrasena/nueva-contrasena.module';
import { CookieService } from 'ngx-cookie-service';
import { SocketIoConfig } from 'ngx-socket-io';
import { SocketIoModule } from 'ngx-socket-io';
import { NbButtonGroupModule } from '@nebular/theme';

const conf: SocketIoConfig = { url:'http://64.23.129.36:3333', options:{transports:['websocket']}}


@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    //nota, no importar el componente aqui porque ya se importa desde el module del propio componente
  ],
  imports: [
    // modulos de compontentes, solo se importa el componente y desde aqui ya se importa el component
    NuevaContrasenaModule,
    RecuperarContrasenaModule,
    RegisterModule,
    HomeModule,
    LoginModule,
    PerfilModule,
    MisDipositivosModule,
    SensoresModule,
    VerificarCodigoModule,
    SocketIoModule.forRoot(conf),

    NbButtonGroupModule,
    NbSelectModule,
    NbFormFieldModule,
    NbCardModule,
    NbButtonModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NbThemeModule.forRoot({ name: 'default' }),
    NbLayoutModule,
    NbEvaIconsModule
  ],
  providers: [
    CookieService
  ],
  bootstrap: [AppComponent],
  schemas: []
})
export class AppModule { }
