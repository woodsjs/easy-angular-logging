import { Injectable } from '@angular/core';
import { NGXLogger, NGXLoggerMonitor, NGXLogInterface } from 'ngx-logger';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  constructor(private logger: NGXLogger) {
    // this.logger.registerMonitor(new MyLoggerMonitor());
    // TRACE|DEBUG|INFO|LOG|WARN|ERROR|FATAL|OFF
    // this.logger.trace('A trace level log');
    // this.logger.fatal('A fatal level log');
  }

  sendTraceLevelMessage(message, source, error) {
    this.logger.trace(message, source, error);
  }

  sendDebugLevelMessage(message, source, error) {
    this.logger.debug(message, source, error);
  }

  sendInfoLevelMessage(message, source, error) {
    this.logger.info(message, source, error);
  }

  sendLogLevelMessage(message, source, error) {
    this.logger.log(message, source, error);
  }

  sendWarnLevelMessage(message, source, error) {
    this.logger.warn(message, source, error);
  }

  sendErrorLevelMessage(message, source, error) {
    this.logger.error(message, source, error);
  }

  sendFatalLevelMessage(message, source, error) {
    this.logger.fatal(message, source, error);
  }
}

export class MyLoggerMonitor implements NGXLoggerMonitor {
  onLog(logObject: NGXLogInterface): void {
    console.log('logging stuff ', logObject);
  }
}
