import { normalize, Schema, NormalizedSchema } from 'normalizr';

export type Entities<T extends {}> = {
  [K in keyof T]: {
    [id: string]: T[K];
  };
};

export const normalizeData = <K extends {}, T = {}>(
  responseData: T[],
  schema: Schema
): NormalizedSchema<Entities<K>, number[]> => {
  return normalize(responseData, schema);
};
