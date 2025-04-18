import { afterAll, beforeAll, describe, expect, it } from 'vitest';

import { inject } from './inject';
import { Service } from './service';

describe('di/inject', () => {
  beforeAll(() => {
    Service.add('testService', new TestService());
  });

  afterAll(() => {
    Service.clear();
  });

  it('should inject a service into a field', () => {
    const testClass = new TestClass();

    expect(testClass.testService.testValue).toBe('this is a test');
  });

  it('should inject a service with a name', () => {
    const testClass = new TestClass();

    expect(testClass.testService.testValue).toBe('this is a test');
  });
});

class TestService {
  testValue: string;

  constructor() {
    this.testValue = 'this is a test';
  }
}

class TestClass {
  @inject()
  testService!: TestService;

  @inject('testService')
  test!: TestService;

  constructor() {}
}
