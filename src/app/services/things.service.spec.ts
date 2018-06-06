import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ThingsService } from './things.service';
import { things } from '../thing-section/things.mock';

describe('ThingsService', () => {
  let service: ThingsService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ThingsService]
    });

    httpMock = TestBed.get(HttpTestingController);
    service = TestBed.get(ThingsService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getThings', () => {
    it('should return an Observable<Thing[]>', () => {
      service.getThings().subscribe(items => {
        expect(items.length).toBe(things.length);
        expect(items).toEqual(things);
      });

      const req = httpMock.expectOne('assets/things.json');
      expect(req.request.method).toBe('GET');
      req.flush(things);
    });
  });
});
