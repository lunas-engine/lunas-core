/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

/**
 * Service class to manage a collection of services.
 */
export class Service {
  /**
   * The service container that holds all the services.
   */
  private static readonly CONTAINER: Record<string, any> = {};

  /**
   * Gets a service by name.
   * @param name - The name of the service to get.
   * @returns The service instance. Throws an error if the service does not exist.
   */
  static get(name: string): any {
    const service = Service.CONTAINER[name];

    if (!service) {
      throw new Error(`Error: Service "${name}" does not exist.`);
    }

    return service;
  }

  /**
   * Add a service to the container.
   * @param name - The name of the service to add.
   * @param service - The service instance to add.
   */
  static add(name: string, service: any): void {
    Service.CONTAINER[name] = service;
  }

  /**
   * Records a service from the container.
   * @param name - The name of the service to remove.
   */
  static remove(name: string): void {
    if (Service.CONTAINER[name]) {
      delete Service.CONTAINER[name];
    }
  }

  /**
   * Clears all services from the container.
   */
  static clear(): void {
    for (const name in Service.CONTAINER) {
      delete Service.CONTAINER[name];
    }
  }
}
