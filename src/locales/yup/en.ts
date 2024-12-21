const yupLocale = {
    mixed: {
        default: 'Invalid value',
        required: 'This field is required',
        oneOf: 'Must be one of the following values: ${values}',
        notOneOf: 'Cannot be one of the following values: ${values}',
        nospace: 'Must not contain spaces',
        nospecialchar: 'Must not contain special characters (e.g. ñ,á,é,í,ó,ú,?,!,etc.)',
    },
    string: {
        length: 'Must be exactly ${length} characters',
        min: 'Must be at least ${min} characters',
        max: 'Must be at most ${max} characters',
        email: 'Must be a valid email',
        url: 'Must be a valid URL',
        ip: 'Must be a valid IP',
        trim: 'Must not contain leading or trailing spaces',
        lowercase: 'Must be in lowercase',
        uppercase: 'Must be in uppercase',
    },
    number: {
        min: 'Must be greater than or equal to ${min}',
        max: 'Must be less than or equal to ${max}',
        lessThan: 'Must be less than ${less}',
        moreThan: 'Must be more than ${more}',
        notEqual: 'Must not be equal to ${notEqual}',
    },
    date: {
        min: 'Must be later than ${min}',
        max: 'Must be earlier than ${max}',
    },
    array: {
        min: 'Must have at least ${min} items',
        max: 'Must have at most ${max} items',
    },
};

export default yupLocale;