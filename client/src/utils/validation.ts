export const validateEntryValue = (text: string): string => {
  if (!text) {
    return 'Must not be empty.';
  }
  if (isNaN(Number(text))) {
    return 'Must be numeric.';
  }
  if (Number(text) < 0) {
    return 'Must be positive.';
  }
  return '';
};

export const validateDescription = (text: string): string => {
  if (!text) {
    return 'Must not be empty.';
  }
  if (text.length > 50) {
    return 'Must be shorter than 50 characters.';
  }

  return '';
};

export const validateRecurringMonths = (text: string): string => {
  if (!text) {
    return 'Must not be empty.';
  }
  if (isNaN(Number(text))) {
    return 'Must be numeric.';
  }
  if (Number(text) < 0) {
    return 'Must be positive.';
  }
  return '';
};

export const validateUsername = (text: string): string => {
  if (!text) {
    return 'Must not be empty.';
  }
  if (text.length <= 5) {
    return 'Must be longer than 5 characters.';
  }
  return '';
};

export const validatePassword = (text: string): string => {
  if (!text) {
    return 'Must not be empty.';
  }
  if (text.length <= 6) {
    return 'Must be longer than 6 characters.';
  }
  return '';
};
