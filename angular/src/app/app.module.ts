import {BrowserModule} from '@angular/platform-browser';
import {NgModule, Provider} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {AuthenticationModule} from './authentication/authentication.module';
import {StoreModule} from '@ngrx/store';
import {StoreDevtoolsModule} from '@ngrx/store-devtools';
import {RouterStateSerializer, StoreRouterConnectingModule} from '@ngrx/router-store';
import {environment} from '../environments/environment';
import {metaReducers, reducers} from './store';
import {RouterStateUrlSerializer} from './shared';
import {EffectsModule} from '@ngrx/effects';
import {AuthenticationEffects} from './authentication/store/authentication-effects.service';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {AutoFocusDirective} from './auto-focus.directive';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {XRequestedWithInterceptor} from './interceptors/x-requested-with-interceptor.service';
import {BaseUrlInterceptor} from './interceptors/base-url-interceptor.service';
import {MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule} from '@angular/material';
import { PageNotFoundComponent } from './components/page-not-found.component';
import { ForbiddenComponent } from './components/forbidden.component';
import {ChatModule} from './chat/chat.module';
import {StompService} from "./services/stomp.service";
import {StompRService} from "@stomp/ng2-stompjs";
import {CookieService} from "ngx-cookie-service";

const HTTP_INTERCEPTOR_PROVIDERS: Provider[] = [
  {provide: HTTP_INTERCEPTORS, useClass: XRequestedWithInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: BaseUrlInterceptor, multi: true},
];

@NgModule({
  declarations: [
    AppComponent,
    AutoFocusDirective,
    PageNotFoundComponent,
    ForbiddenComponent,
  ],
  imports: [
    AuthenticationModule,
    ChatModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    StoreModule.forRoot(reducers, {metaReducers}),
    StoreDevtoolsModule.instrument({
      name: 'angular-spring-websocket Store',
      logOnly: environment.production
    }),
    StoreRouterConnectingModule.forRoot({
      stateKey: 'router'
    }),
    EffectsModule.forRoot([AuthenticationEffects]),
  ],
  providers: [
    HTTP_INTERCEPTOR_PROVIDERS,
    CookieService,
    StompRService,
    StompService,
    {provide: RouterStateSerializer, useClass: RouterStateUrlSerializer},
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
