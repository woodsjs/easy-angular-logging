import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { environment} from '../../environments/environment';
import { IAppConfig } from '../app-config.model';

@Injectable({
  providedIn: 'root',
})
export class AppConfigService {
  static settings: IAppConfig;

  constructor(private http: HttpClient) {}

  load() {
    const jsonFile = `assets/config/config.${environment.name}.json`;
    console.log('json file is ', jsonFile);

    return new Promise<void>((resolve, reject) => {
      this.http
        .get(jsonFile)
        .toPromise()
        .then((response: IAppConfig) => {
          AppConfigService.settings = response as IAppConfig;
          resolve();
        })
        .catch((response: any) => {
          reject(
            `Could not load file '${jsonFile}': ${JSON.stringify(response)}`
          );
        });
    });
  }
}
