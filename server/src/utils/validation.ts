export const validateFieldsExistence = (
  object: Record<string, unknown>,
  fields: string[]
): string[] => {
  const missingFields: string[] = [];
  fields.forEach((field) => {
    if (!object[field]) {
      missingFields.push(field);
    }
  });
  return missingFields;
};
