/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { afterAll, beforeEach, describe, expect, it } from 'vitest';

import { Service } from './service';

describe('lunas/di/service', () => {
  beforeEach(() => {
    Service.clear();
  });

  afterAll(() => {
    Service.clear();
  });

  it('should add and retrieve a service', () => {
    const testService = { name: 'TestService' };
    Service.add('test', testService);

    const service = Service.get('test');
    expect(service).toBe(testService);
  });

  it('should throw an error when retrieving a non-existent service', () => {
    expect(() => Service.get('nonExistent')).toThrowError('Error: Service "nonExistent" does not exist.');
  });

  it('should remove a service', () => {
    const testService = { name: 'TestService' };
    Service.add('test', testService);

    Service.remove('test');
    expect(() => Service.get('test')).toThrowError('Error: Service "test" does not exist.');
  });

  it('should clear all services', () => {
    const service1 = { name: 'Service1' };
    const service2 = { name: 'Service2' };

    Service.add('service1', service1);
    Service.add('service2', service2);

    Service.clear();

    expect(() => Service.get('service1')).toThrowError('Error: Service "service1" does not exist.');
    expect(() => Service.get('service2')).toThrowError('Error: Service "service2" does not exist.');
  });

  it('should overwrite an existing service with the same name', () => {
    const service1 = { name: 'Service1' };
    const service2 = { name: 'Service2' };

    Service.add('test', service1);
    Service.add('test', service2);

    const service = Service.get('test');
    expect(service).toBe(service2);
  });
});
