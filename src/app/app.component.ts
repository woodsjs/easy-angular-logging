import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoggingService } from './services/logging.service';
import { AppConfigService } from './services/app-config.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'easy-angular-logging';

  workingLoggedForm: FormGroup;
  brokenLoggedForm: FormGroup;
  throwErrorForm: FormGroup;
  dnsErrorForm: FormGroup;

  env: string;
  canDebug: boolean;

  // constructor(private fb: FormBuilder, private ws: LoggingService) {}
  constructor(private fb: FormBuilder, private ls: LoggingService) {}


  // We want to put in an app initializer
  // https://stackoverflow.com/questions/49707830/angular-how-to-correctly-implement-app-initializer
  // https://devblogs.microsoft.com/premier-developer/angular-how-to-editable-config-files/
  ngOnInit(): void {
    this.workingLoggedForm = this.fb.group({
      workingField: [''],
    });

    this.brokenLoggedForm = this.fb.group({
      brokenField: ['', Validators.required],
    });

    this.dnsErrorForm = this.fb.group({
      dnsErrorField: [''],
    });

    this.throwErrorForm = this.fb.group({
      thisField: [''],
    });

    this.ls.sendDebugLevelMessage('ngOnInit message', this, {
      error: 'none',
    });

    this.env = AppConfigService.settings.env.name;
    this.canDebug = AppConfigService.settings.logging.debug;
  }

  successfulSubmit() {
    // this is how we often do it. We should use a logging library!
    this.ls.sendDebugLevelMessage('Debugging successful submit', this, {
      error: 'none',
    });
    this.ls.sendInfoLevelMessage('Message submitted successfully');
  }

  brokenSubmit() {
    // console.log('Broken submit');
    // console.log('errors ', this.brokenLoggedForm.get('brokenField').errors);
    this.ls.sendDebugLevelMessage('Debugging broken submit', this, {
      error: this.brokenLoggedForm.controls.brokenField.errors,
    });

    this.ls.sendWarnLevelMessage(
      'Submit went wrong',
      this.brokenLoggedForm.controls.brokenField.errors
    );
  }

  throwDNSError() {
    this.ls.sendDebugLevelMessage('Debugging DNS error on submit', this, {
      error: 'something went wrong',
    });

    this.ls.sendErrorLevelMessage(
      'Need to create a web call to URL that errors',
      this,
      { error: 'something went wrong' }
    );
  }

  throwsFatalError() {
    const fatalError = new Error('Something went very wrong');
    this.ls.sendFatalLevelMessage('This button is broken', this, fatalError);
    // here we would throw fatalError;
  }
}
