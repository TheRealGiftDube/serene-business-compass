
export interface PasswordValidation {
  hasLowercase: boolean;
  hasUppercase: boolean;
  hasNumber: boolean;
  hasSymbol: boolean;
  hasMinLength: boolean;
  isValid: boolean;
}

export const validatePassword = (password: string): PasswordValidation => {
  const hasLowercase = /[a-z]/.test(password);
  const hasUppercase = /[A-Z]/.test(password);
  const hasNumber = /[0-9]/.test(password);
  const hasSymbol = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(password);
  const hasMinLength = password.length >= 8;
  
  const isValid = 
    hasLowercase && 
    hasUppercase && 
    hasNumber && 
    hasSymbol && 
    hasMinLength;
  
  return {
    hasLowercase,
    hasUppercase,
    hasNumber,
    hasSymbol,
    hasMinLength,
    isValid,
  };
};

export const passwordsMatch = (password: string, confirmPassword: string): boolean => {
  return password === confirmPassword && password !== '';
};
