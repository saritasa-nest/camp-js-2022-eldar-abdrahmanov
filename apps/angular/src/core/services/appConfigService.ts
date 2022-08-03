import { Injectable } from '@angular/core';

import { environment } from '../../environments/environment.prod';

/** Provides access to environment variables. */
@Injectable({
  providedIn: 'root',
})

export class AppConfigService {
  /** Base api  url. */
  public readonly baseUrl = environment.baseUrl;

  /** Api key. */
  public readonly apiKey = environment.apiKey;
}
