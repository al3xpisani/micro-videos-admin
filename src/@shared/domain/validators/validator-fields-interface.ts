import { Notification } from './notification';

export type FieldsErrors =
  | {
      [field: string]: string[];
    }
  | string;

export interface IValidatorFields {
  errors: FieldsErrors | null;
  validate(data: any, fields: string[]): boolean;
}
