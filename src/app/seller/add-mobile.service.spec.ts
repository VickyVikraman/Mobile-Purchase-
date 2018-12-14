import { TestBed } from '@angular/core/testing';

import { AddMobileService } from './add-mobile.service';

describe('AddMobileService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: AddMobileService = TestBed.get(AddMobileService);
    expect(service).toBeTruthy();
  });
});
