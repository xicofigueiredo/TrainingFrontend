import { TestBed } from '@angular/core/testing';

import { ColaboratorsService } from './colaborators.service';

describe('ColaboratorsService', () => {
  let service: ColaboratorsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ColaboratorsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
