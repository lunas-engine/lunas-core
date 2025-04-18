/* eslint-disable @typescript-eslint/no-explicit-any */
import { Service } from './service';

/**
 *
 * @param name - The name of the service to inject. If not provided, the field name will be used.
 * @returns A function that returns the required service.
 */
export function inject(name?: string) {
  return (_value: undefined, context: ClassMemberDecoratorContext): (() => any) | undefined => {
    if (context.kind === 'field') {
      // Use passed in name or else the field name.
      const serviceName = name || (context.name as string);

      // Return a getter function that returns the required service.
      return (): any => {
        return Service.get(serviceName);
      };
    }

    return;
  };
}
