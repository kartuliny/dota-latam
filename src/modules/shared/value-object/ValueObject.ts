import { InvalidArgumentError } from "./InvalidArgumentError";

export type Primitives = String | string | number | Boolean | boolean | Date | File;

export abstract class ValueObject<T extends Primitives | undefined> {
  readonly value: T;

  constructor(value?: T) {
    this.ensureValueIsDefined(value);
    this.value = value as T;
  }

  private ensureValueIsDefined(value?: T): void {
    if (value === null) {
      throw new InvalidArgumentError('Value must not be null');
    }
  }

  equals(other: ValueObject<T>): boolean {
    return other.constructor.name === this.constructor.name && other.value === this.value;
  }

  toString(): string {
    return this.value?.toString() ?? "";
  }
}