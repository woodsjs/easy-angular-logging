import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { LoggingService } from './services/logging.service';

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

  // constructor(private fb: FormBuilder, private ws: LoggingService) {}
  constructor(private fb: FormBuilder, private ls: LoggingService) {}

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
  }

  successfulSubmit() {
    // this is how we often do it. We should use a logging library!
    console.log('Successful submit');
    this.ls.sendInfoLevelMessage('Message submitted', this, this.workingLoggedForm.controls.workingField);
  }

  brokenSubmit() {
    // console.log('Broken submit');
    // console.log('errors ', this.brokenLoggedForm.get('brokenField').errors);
    this.ls.sendErrorLevelMessage(
      'Submit went wrong',
      this.brokenLoggedForm,
      this.brokenLoggedForm.controls.brokenField.errors
    );
  }

  throwDNSError() {
    this.ls.sendDebugLevelMessage('Need to create a web call to URL that errors', this, {error: 'something went wrong'})
  }

  throwsError() {
    throw new Error('This is not your error');
  }
}
