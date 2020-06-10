import { Injectable } from '@angular/core';
import { NGXLogger, NGXLoggerMonitor, NGXLogInterface, NgxLoggerLevel } from 'ngx-logger';
import { AppConfigService } from './app-config.service';

@Injectable({
  providedIn: 'root',
})
export class LoggingService {
  env: string;
  canDebug: boolean;
  consoleLogger: NGXLogger;

  constructor(private logger: NGXLogger) {
    // TRACE|DEBUG|INFO|LOG|WARN|ERROR|FATAL|OFF
    this.env = AppConfigService.settings.env.name;
    this.canDebug = AppConfigService.settings.logging.debug;
    console.log(
      'This environment ',
      this.env,
      ' debugging enabled ',
      this.canDebug
    );

    if (this.canDebug) {
      console.log('Dropping into debug mode');
      this.logger.updateConfig({ level: NgxLoggerLevel.TRACE });
    }
  }

  // very detailed tracing
  // we might send this to documentDB, or just push to console.
  // the idea is we wouldn't leave this on very long, only long enough
  // to get info for debugging issues.
  sendTraceLevelMessage(message, source, error) {
    this.logger.trace(message, source, error);
  }

  // Relatively detailed tracing used by application developers.
  // Like the TRACE level, we might send this to documentDB, or just push to console.
  // the idea is we wouldn't leave this on very long, only long enough
  // to get info for debugging issues.
  sendDebugLevelMessage(message, source, error) {
    this.logger.debug(message, source, error);
  }

  // Informational messages that might make sense to end users and
  // system administrators, and highlight the progress of the application.
  // we'll only send these to console
  sendInfoLevelMessage(message) {
    this.logger.info(message);
  }

  // in tandum with the INFO level, these are more informational. We would
  // want to collect more data here and send to our cloud store, for
  // usage data statistics
  sendLogLevelMessage(message, source, error) {
    this.logger.log(message, source, error);
  }

  // Potentially harmful situations of interest to end users or system managers
  // that indicate potential problems. We want these to go to our cloud data store
  sendWarnLevelMessage(message, error) {
    this.logger.warn(message, error);
  }

  // Error events of considerable importance that will
  // prevent normal program execution, but might still allow the application to continue running.
  // We probably want these to go to both console and cloud data store
  sendErrorLevelMessage(message, source, error) {
    this.logger.error(message, source, error);
  }

  // Very severe error events that might cause the application to terminate.
  // we only send these to cloud data store, as fatal errors would have the app reload
  sendFatalLevelMessage(message, source, error) {
    this.logger.fatal(message, source, error);
  }
}

export class MyLoggerMonitor implements NGXLoggerMonitor {
  onLog(logObject: NGXLogInterface): void {
    console.log('logging stuff to an API', logObject);
  }
}
