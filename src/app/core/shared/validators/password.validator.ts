import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function passwordValidator(): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) {
      return null;
    }

    const hasUpperCase = /[A-Z]+/.test(value);

    const hasNumber = /[0-9]+/.test(value);

    const hasMinLength = value.length >= 8;

    const passwordValid = hasUpperCase && hasNumber && hasMinLength;

    return !passwordValid
      ? { passwordStrength: 'A senha deve ter pelo menos 8 caracteres, incluindo 1 letra maiúscula e 1 número.' }
      : null;
  };
}
