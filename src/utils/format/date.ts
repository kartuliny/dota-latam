export const formatDateToPeruTime = (timestamp: number): string => {
    // Crear un objeto Date a partir del timestamp
    const date = new Date(timestamp);

    // Definir las opciones de formato con el tipo correcto
    const options: Intl.DateTimeFormatOptions = {
        weekday: 'long', // Día de la semana completo
        year: 'numeric',
        month: 'long', // Mes completo
        day: 'numeric',
        hour: '2-digit', // Hora en formato 2 dígitos
        minute: '2-digit', // Minutos en formato 2 dígitos
        second: '2-digit', // Segundos en formato 2 dígitos
        timeZoneName: 'short' // Abreviación de la zona horaria
    };

    // Convertir a hora y fecha de Perú (GMT-5)
    return date.toLocaleString('es-PE', { timeZone: 'America/Lima', ...options });
}
