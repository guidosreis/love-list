import { TestBed, inject } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ThingsService } from './things.service';
import { Thing } from '../thing-section/thing.model';

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
      const mock: Thing[] = [
        {
          name: 'Javascript',
          rating: 0
        },
        {
          name: 'Angular',
          rating: 0
        }
      ];

      service.getThings().subscribe(things => {
        expect(things.length).toBe(2);
        expect(things).toEqual(mock);
      });

      const req = httpMock.expectOne('assets/things.json');
      expect(req.request.method).toBe('GET');
      req.flush(mock);
    });
  });
});
