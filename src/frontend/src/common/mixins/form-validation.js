import { validateForm } from '../../lib/form-validation';

export default {
  data() {
    return {
      formValidation: {
        errors: new Map(),
      },
    }
  },
  methods: {
    validateForm,
  }
};
