import { TestBed, inject } from '@angular/core/testing';

import { RateThingEffectService } from './rate-thing-effect.service';

describe('RateThingEffectService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [RateThingEffectService]
    });
  });

  it('should be created', inject([RateThingEffectService], (service: RateThingEffectService) => {
    expect(service).toBeTruthy();
  }));
});
