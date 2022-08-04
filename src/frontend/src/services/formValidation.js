/* eslint-disable */
export const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/* eslint-enable */

const rulesDefinition = {
  required: {
    isCorrect: (value) => !!value?.trim(),
    message: "Поле обязательно для заполнения",
  },
  email: {
    isCorrect: (value) => value && emailRegex.test(String(value).toLowerCase()),
    message: "Электроная почта имеет неверный формат",
  },
};

/**
 * Validate form fields
 * @param {{
 *  name: string,
 *  value: string,
 *  rules: string[]
 * }[]} fileds
 * @returns {[{ name: string, failedRules: string[] }]}
 */
export const validateForm = (fileds) => {
  if (fileds.length === 0) {
    return;
  }

  const errors = [];

  fileds.forEach(({ name, value, rules }) => {
    const failedRules = [];

    rules.forEach((rule) => {
      if (!rulesDefinition[rule].isCorrect(value)) {
        const errorText = rulesDefinition[rule].message;
        failedRules.push(errorText);
      }
    });

    if (failedRules.length > 0) {
      errors.push({ name, failedRules });
    }
  });

  return errors;
};

/**
 * get error message for field
 * @param {string} name
 * @param {string[]} errors
 * @returns {string[]} errors
 */
export const getFieldErrors = (name, errors) => {
  return errors.find((error) => error.name === name)?.failedRules;
};
