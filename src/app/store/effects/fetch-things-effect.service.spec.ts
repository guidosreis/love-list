import { TestBed, inject } from '@angular/core/testing';

import { FetchThingsEffectService } from './fetch-things-effect.service';

describe('FetchThingsEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [FetchThingsEffectService]
    });
  });

  it('should be created', inject([FetchThingsEffectService], (service: FetchThingsEffectService) => {
    expect(service).toBeTruthy();
  }));
});
