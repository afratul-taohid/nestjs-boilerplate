import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { PrismaClient } from '../prisma/generated/client';

interface ErrorObject {
  [key: string]: string | string[];
}

/**
 * Generic HTTP error thrower
 */
export function throwError(errors: ErrorObject, message: string, code = 400): never {
  throw new HttpException({ message, errors }, code);
}

/**
 * Check if a field is unique in a Prisma model
 * @param prisma PrismaClient instance
 * @param modelName Prisma model name as string (must match PrismaClient property)
 * @param field Object containing a single field to check { email: "test@test.com" }
 * @param id Optional UUID of current entity (for update scenarios)
 */
export async function isFieldUnique(
  prisma: PrismaClient,
  modelName: keyof PrismaClient,
  field: Record<string, any>,
  id?: string
): Promise<boolean> {
  const fieldKey = Object.keys(field)[0];
  const fieldValue = field[fieldKey];

  // @ts-ignore
  const entity = await prisma[modelName].findFirst({
    where: {
      [fieldKey]: {
        equals: fieldValue,
        mode: 'insensitive' // case-insensitive
      }
    }
  });

  let isUnique = false;

  if (id) {
    if (!entity) isUnique = true;
    else isUnique = entity.id === id && entity[fieldKey]?.toLowerCase() === fieldValue.toLowerCase();
  } else isUnique = !entity;

  if (!isUnique) throwError({ [`${fieldKey}IsUnique`]: `${fieldKey} already exists.` }, 'Input data validation failed');

  return isUnique;
}

/**
 * Ensure a Prisma entity exists by ID
 * @param prisma PrismaClient instance
 * @param modelName Prisma model name
 * @param id UUID of the entity
 * @param errorMessage Optional custom error message
 */
export async function validateEntityExists(
  prisma: PrismaClient,
  modelName: keyof PrismaClient,
  id: string,
  errorMessage?: string
) {
  // @ts-ignore
  const entity = await prisma[modelName].findUnique({ where: { id } });

  if (!entity) {
    throwError({}, errorMessage || `${String(modelName)} with ID ${id} not found`, 404);
  }

  return entity;
}

/**
 * Simple email validator (optional)
 */
export function validateEmail(email: string) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) throwError({ email: 'Invalid email format' }, 'Validation failed');
}
