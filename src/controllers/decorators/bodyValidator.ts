import "reflect-metadata";
import { MetadataKeys } from "./MetadataKeys";

// Add metadata with a list of fields from a request body
export function bodyValidator(...keys: string[]) {
  return function (target: any, key: string, desc: PropertyDescriptor) {
    Reflect.defineMetadata(MetadataKeys.validator, keys, target, key);
  };
}
