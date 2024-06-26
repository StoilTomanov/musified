import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthHandlerService } from './auth-handler.service';
import { AuthModule } from './auth/auth.module';
import { UserService } from './auth/user.service';
import { CoreModule } from './core/core.module';
import { SharedModule } from './shared/shared.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
    declarations: [
        AppComponent,
    ],
    imports: [
        BrowserModule,
        CoreModule,
        SharedModule,
        AuthModule,
        AppRoutingModule,
        HttpClientModule,
        BrowserAnimationsModule
    ],
    providers: [
        UserService,
        {
            provide: AuthHandlerService,
            useClass: AuthHandlerService
        },
        AuthHandlerService,
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
