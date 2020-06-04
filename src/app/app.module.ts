import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatInputModule,
  MatButtonModule,
  MatFormFieldModule,
} from '@angular/material';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoggingService } from './services/logging.service';

// NullInjectorError: StaticInjectorError(AppModule)[NGXLogger -> LoggerConfig]
import { LoggerModule, NgxLoggerLevel, LoggerConfig } from 'ngx-logger';

// NullInjectorError: StaticInjectorError(AppModule)[NGXLoggerHttpService -> HttpBackend]:
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    HttpClientModule,
    LoggerModule.forRoot({
      level: NgxLoggerLevel.TRACE,
      serverLogLevel: NgxLoggerLevel.TRACE,
    }),
  ],

  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
