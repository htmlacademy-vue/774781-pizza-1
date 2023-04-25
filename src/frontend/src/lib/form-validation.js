/* eslint-disable */
const emailRegex =
  /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
/* eslint-enable */

const rulesDefinition = {
  required: {
    isValid: (value) => !!value?.trim(),
    message: "Поле обязательно для заполнения",
  },
  email: {
    isValid: (value) => value && emailRegex.test(String(value).toLowerCase()),
    message: "Электроная почта имеет неверный формат",
  },
};

export const validateForm = (fields) => {
  const result = new Map();
  if (fields.length === 0) {
    return result;
  }

  fields.forEach(({ name, value, rules }) => {
    const failedRules = [];
    rules.forEach((rule) => {
      if (!rulesDefinition[rule].isValid(value)) {
        const errorText = rulesDefinition[rule].message;
        failedRules.push(errorText);
      }
    });

    if (failedRules.length > 0) {
      result.set(name, failedRules);
    }
  });

  return result;
};
