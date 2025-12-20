// Form validation utilities

export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d@$!%*?&]{8,}$/;

export const validateEmail = (email) => {
  if (!email) return "Email is required";
  if (!emailRegex.test(email)) return "Please enter a valid email address";
  return null;
};

export const validatePassword = (password) => {
  if (!password) return "Password is required";
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!passwordRegex.test(password)) {
    return "Password must contain at least one uppercase letter, one lowercase letter, and one number";
  }
  return null;
};

export const validateForm = (formData, rules) => {
  const errors = {};
  
  Object.keys(rules).forEach(field => {
    const value = formData[field];
    const rule = rules[field];
    
    if (rule.required && !value) {
      errors[field] = rule.message || `${field} is required`;
      return;
    }
    
    if (value && rule.validator) {
      const error = rule.validator(value);
      if (error) {
        errors[field] = error;
      }
    }
  });
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  return input.trim().replace(/[<>]/g, '');
};
