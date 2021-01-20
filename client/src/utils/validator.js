import PasswordValidator from 'password-validator';

export const passwordValidatorSchema = new PasswordValidator()
    .has()
    .uppercase()
    .is()
    .min(8)
    .has()
    .lowercase()
    .has()
    .digits()
    .has()
    .not()
    .spaces();

export const validatePassword = (rule, value, callback) => {
    const errors = passwordValidatorSchema.validate(value, { list: true });

    if (errors.includes('min'))
        return callback('password must be at least 8 letters');
    if (errors.includes('uppercase'))
        return callback('password must have uppercase letters');
    if (errors.includes('lowercase'))
        return callback('password must have lowercase letters');
    if (errors.includes('digits'))
        return callback('password must have digits');
    if (errors.includes('spaces'))
        return callback('password must not indent spaces');
    return callback();
};
