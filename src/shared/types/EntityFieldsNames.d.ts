/**
 * Interface of the entity fields names only (without functions)
 */
export declare type EntityFieldsNames<Entity = any> = {
  // tslint:disable-next-line:ban-types
  [P in keyof Entity]: Entity[P] extends Function ? never : P;
}[keyof Entity];
