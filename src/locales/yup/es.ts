const yupLocale = {
    mixed: {
        default: 'Campo no es válido',
        required: 'Este campo es obligatorio',
        oneOf: 'Debe ser uno de los siguientes valores: ${values}',
        notOneOf: 'No debe ser uno de los siguientes valores: ${values}',
        nospace: 'No debe contener espacios',
        nospecialchar: 'No debe contener caracteres especiales (e.j. ñ,á,é,í,ó,ú,?,!,etc.)',
    },
    string: {
        length: 'Debe tener exactamente ${length} caracteres',
        min: 'Debe tener al menos ${min} caracteres',
        max: 'Debe tener como máximo ${max} caracteres',
        email: 'Debe ser un correo electrónico válido',
        url: 'Debe ser una URL válida',
        ip: 'Debe ser una IP válida',
        trim: 'No debe contener espacios al inicio o al final',
        lowercase: 'Debe estar en minúsculas',
        uppercase: 'Debe estar en mayúsculas',
    },
    number: {
        min: 'Debe ser mayor o igual que ${min}',
        max: 'Debe ser menor o igual que ${max}',
        lessThan: 'Debe ser menor que ${less}',
        moreThan: 'Debe ser mayor que ${more}',
        notEqual: 'No debe ser igual a ${notEqual}',
    },
    date: {
        min: 'Debe ser posterior a ${min}',
        max: 'Debe ser anterior a ${max}',
    },
    array: {
        min: 'Debe tener al menos ${min} elementos',
        max: 'Debe tener como máximo ${max} elementos',
    },
};

export default yupLocale;