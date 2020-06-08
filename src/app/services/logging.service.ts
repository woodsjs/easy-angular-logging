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

  // very detailed tracing
  sendTraceLevelMessage(message, source, error) {
    this.logger.trace(message, source, error);
  }

  // Relatively detailed tracing used by application developers.
  sendDebugLevelMessage(message, source, error) {
    this.logger.debug(message, source, error);
  }

  // Informational messages that might make sense to end users and
  // system administrators, and highlight the progress of the application.
  sendInfoLevelMessage(message) {
    this.logger.info(message);
  }

  sendLogLevelMessage(message, source, error) {
    this.logger.log(message, source, error);
  }

  // Potentially harmful situations of interest to end users or system managers that indicate potential problems.
  sendWarnLevelMessage(message, error) {
    this.logger.warn(message, error);
  }

  // Error events of considerable importance that will
  // prevent normal program execution, but might still allow the application to continue running.
  sendErrorLevelMessage(message, source, error) {
    this.logger.error(message, source, error);
  }

  // Very severe error events that might cause the application to terminate.
  sendFatalLevelMessage(message, source, error) {
    this.logger.fatal(message, source, error);
  }
}

export class MyLoggerMonitor implements NGXLoggerMonitor {
  onLog(logObject: NGXLogInterface): void {
    console.log('logging stuff ', logObject);
  }
}
