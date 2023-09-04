export const PasswordRegExp = /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[^A-Za-z0-9])(?!.*\s).{8,25}$/;
export const PasswordPattern = PasswordRegExp.toString().slice(1,-2);
export const UsernameRegExp = /^[a-zA-Z0-9_\.]{3,20}$/;
export const UsernamePattern = UsernameRegExp.toString().slice(1,-2);