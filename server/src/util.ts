import { ParsedQs } from "qs";
export function queryToWhere<T = string>(
  query?: ParsedQs | string | string[] | ParsedQs[],
  filterFn?: (value: any) => value is T
) {
  let where = undefined;
  const filter = filterFn ?? (() => true);

  if (typeof query == "string") {
    if (filter(query)) {
      where = query as T;
    }
  }

  if (Array.isArray(query)) {
    where = {
      in: (query as any).filter(
        (it: any) => typeof it == "string" && filter(it)
      ) as T[],
    };
  }

  return where;
}

export function isArrayEnum<T>(object: T[]): (value: any) => value is T {
  function isInObject(value: any): value is T {
    return object.includes(value);
  }

  return isInObject;
}

export function isObjectEnum<T>(object: Record<any, T>) {
  return isArrayEnum(Object.values(object));
}
