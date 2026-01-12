import { ValidationError } from 'class-validator';

export function buildValidationErrors(errors: ValidationError[]): string[] {
  const result: string[] = [];

  errors.forEach(error => {
    // Direct constraints
    if (error.constraints) {
      result.push(...Object.values(error.constraints));
    }

    // Nested validation errors (recursive)
    if (error.children?.length) {
      result.push(...buildValidationErrors(error.children));
    }
  });

  return result;
}
