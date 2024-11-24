import { TestBed } from '@angular/core/testing';

import { FandaUiService } from './fanda-ui.service';

describe('FandaUiService', () => {
  let service: FandaUiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FandaUiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
