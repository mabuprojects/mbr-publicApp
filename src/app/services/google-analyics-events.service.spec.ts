import { TestBed, inject } from '@angular/core/testing';

import { GoogleAnalyicsEventsService } from './google-analyics-events.service';

describe('GoogleAnalyicsEventsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GoogleAnalyicsEventsService]
    });
  });

  it('should be created', inject([GoogleAnalyicsEventsService], (service: GoogleAnalyicsEventsService) => {
    expect(service).toBeTruthy();
  }));
});
