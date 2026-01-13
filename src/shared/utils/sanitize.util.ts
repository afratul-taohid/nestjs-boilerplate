export function sanitizeData<T>(data: T, excludeFields: string[]): T {
  if (!data) return data;

  if (Array.isArray(data)) {
    return data.map(item => sanitizeData(item, excludeFields)) as T;
  }

  if (typeof data === 'object') {
    const clone: any = { ...data };
    excludeFields.forEach(field => delete clone[field]);
    return clone;
  }

  return data;
}