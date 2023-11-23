import { TestBed } from '@angular/core/testing';

import { OpenpaygoService } from './openpaygo.service';

describe('OpenpaygoService', () => {
  let service: OpenpaygoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OpenpaygoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
