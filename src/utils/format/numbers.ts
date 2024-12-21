export const formatNumber = (num: number): string => {
    const formatWithSuffix = (value: number, suffix: string): string => {
        // Convertir a número entero si no hay decimales significativos
        const formattedValue = value % 1 === 0 ? value.toFixed(0) : value.toFixed(2);
        return formattedValue + " " + suffix;
    };

    if (num >= 1_000_000_000) {
        // Formatear en billones (B)
        return formatWithSuffix(num / 1_000_000_000, "B");
    } else if (num >= 1_000_000) {
        // Formatear en millones (M)
        return formatWithSuffix(num / 1_000_000, "M");
    } else if (num >= 1_000) {
        // Formatear en miles (K)
        return formatWithSuffix(num / 1_000, "K");
    } else {
        // Devolver el número tal cual, redondeado a 2 decimales si es necesario
        return num % 1 === 0 ? num.toString() : num.toFixed(2);
    }
};