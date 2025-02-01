// const probabilidad = [
//     1.221, 29.096, 9.457, 1.72, 4.788, 1, 1.096, 4.29, 6.004, 1.014,
//     2.91, 1.776, 2.912, 11.462, 3.003, 2.838, 1.36, 2.072, 1.305, 1.733,
//     0.632, 0.855, 0.38, 0.405, 1.174, 1.186, 1.766, 1.279, 1.266
// ];

const prices = [
    18.12, 0.13, 0.40, 2.20, 0.79, 3.78, 3.45, 5.16, 0.63, 3.73,
    1.30, 2.13, 7.60, 0.33, 7.37, 7.80, 16.27, 10.68, 16.97, 12.77,
    35.02, 25.87, 58.21, 54.68, 18.85, 18.67, 12.53, 17.30, 17.49
];

function simulateProbabilities(values: number[], probabilities: number[], numSimulations: number): number[] {
    // Escalar las probabilidades multiplicando por 100000
    const scaledProbabilities = probabilities.map(prob => prob / 100 * 100000);
    
    // Acumulación de probabilidades
    const cumulativeProbabilities = scaledProbabilities.reduce((acc, prob) => {
        acc.push(prob + (acc.length > 0 ? acc[acc.length - 1] : 0));
        return acc;
    }, [] as number[]);

    console.log("Cumulative probabilities:", cumulativeProbabilities);

    // Función para simular
    let results: number[] = [];

    for (let i = 0; i < numSimulations; i++) {
        // Generamos un número aleatorio entre 1 y 100000
        const randomValue = Math.floor(Math.random() * 100000) + 1;

        // Encontramos el índice del valor correspondiente al número aleatorio
        const index = cumulativeProbabilities.findIndex(cumulativeProb => cumulativeProb >= randomValue);

        // Almacenamos el valor correspondiente a la probabilidad seleccionada
        results.push(values[index]);
    }

    return results;
}

function calculateAverage(results: number[]): number {
    // Sumar todos los resultados y dividir por el número de simulaciones
    const totalSum = results.reduce((sum, value) => sum + value, 0);
    return totalSum / results.length;
}

// Ejemplo de uso:
const values = [10, 20, 30, 40]; // Los valores de la variable que estamos simulando
const probabilities = [0.1, 0.3, 0.4, 0.2]; // Las probabilidades de que cada valor sea elegido
const numSimulations = 1000; // Número de simulaciones que queremos realizar

// Ejemplo de uso:


// Función para calcular el MCD de dos números
function gcd(a: number, b: number): number {
    if (b === 0) return a;
    return gcd(b, a % b);
}

// Función para calcular el MCM de dos números
function lcm(a: number, b: number): number {
    return Math.abs(a * b) / gcd(a, b);
}

// Función para calcular el MCM de una lista de números, tanto enteros como decimales
function lcmOfNumbers(numbers: number[]): number {
    // Encontramos el mayor número de decimales
    const maxDecimalPlaces = Math.max(...numbers.map(num => num.toString().split('.')[1]?.length || 0));
    
    // Convertimos todos los números a enteros
    const factor = Math.pow(10, maxDecimalPlaces);
    const integers = numbers.map(num => Math.round(num * factor));

    // Calculamos el MCM de los números enteros
    let result = integers[0];
    for (let i = 1; i < integers.length; i++) {
        result = lcm(result, integers[i]);
    }

    // Devolvemos el MCM en formato decimal
    return result / factor;
}



// const prices = [
//     1, 1, 3,1,1,2,10,10,10,10,30, 200
// ];

let probabilidad: number[] = [];

// const probabilidad: number[] = [
//     0.013,
//     0.012,
//     0.012,
//     0.041,
//     0.041,
//     0.04,
//     0.039,
//     0.036,
//     0.036,
//     0.032,
//     0.031,
//     0.028,
//     0.129,
//     0.117,
//     0.115,
//     0.104,
//     0.099,
//     0.081,
//     0.199,
//     0.171,
//     0.158,
//     0.133,
//     0.11,
//     0.068,
//     0.064,
//     0.039,
//     0.032,
//     0.023,
//     0.233,
//     0.165,
//     0.162,
//     0.13,
//     0.12,
//     0.103,
//     0.099,
//     0.068,
//     0.066,
//     0.034,
//     0.042,
//     0.038,
//     0.034,
//     9.186,
//     8.432,
//     7.052,
//     0.308,
//     0.274,
//     0.263,
//     0.181,
//     0.16,
//     0.099,
//     0.055,
//     0.383,
//     0.293,
//     0.234,
//     0.182,
//     0.138,
//     0.098,
//     0.205,
//     0.186,
//     0.175,
//     0.156,
//     0.117,
//     0.116,
//     0.114,
//     0.109,
//     13.494,
//     10.885,
//     10.799,
//     7.859,
//     7.059,
//     5.911,
//     5.886,
//     0.33,
//     0.253,
//     0.187,
//     0.054,
//     0.045,
//     0.028,
//     0.022,
//     0.017,
//     0.036,
//     0.035,
//     0.026,
//     0.172,
//     0.141,
//     0.123,
//     0.102,
//     0.096,
//     0.092,
//     0.087,
//     0.073,
//     0.059,
//     0.045,
//     0.266,
//     0.227,
//     0.145,
//     0.111,
//     0.081,
//     0.049,
//     0.201,
//     0.169,
//     0.122,
//     0.336,
//     0.314,
//     0.189,
//     0.122,
//     0.249,
//     0.191,
//     0.174,
//     0.165,
//     0.134,
//     0.272,
//     0.119,
//     0.095,
//     0.082,
//     0.071,
//     0.113,
//     0.105,
//     0.086,
//     0.083,
// ]

// const prices = [
//     2700.23,
//     2700.53,
//     2749.14,
//     795.67,
//     796.68,
//     830.91,
//     846.80,
//     896.26,
//     919.71,
//     1049.71,
//     1059.54,
//     1153.83,
//     255.37,
//     281.07,
//     287.11,
//     317.57,
//     333.95,
//     407.00,
//     166.06,
//     192.14,
//     208.52,
//     248.28,
//     298.85,
//     490.18,
//     508.93,
//     840.41,
//     1051.83,
//     1405.16,
//     141.14,
//     200.07,
//     203.94,
//     254.22,
//     274.17,
//     320.58,
//     331.66,
//     486.65,
//     496.37,
//     965.34,
//     775.21,
//     863.83,
//     962.50,
//     51.56,
//     56.17,
//     67.17,
//     106.89,
//     120.01,
//     125.41,
//     182.26,
//     206.64,
//     333.26,
//     597.26,
//     86.01,
//     112.34,
//     140.97,
//     181.29,
//     239.00,
//     335.48,
//     161.23,
//     176.85,
//     187.87,
//     210.96,
//     280.74,
//     284.05,
//     289.00,
//     302.53,
//     35.10,
//     43.51,
//     43.86,
//     60.26,
//     67.10,
//     80.14,
//     80.47,
//     99.61,
//     129.99,
//     176.82,
//     608.61,
//     735.61,
//     1160.25,
//     1471.07,
//     2034.32,
//     907.24,
//     942.65,
//     1265.00,
//     191.58,
//     233.39,
//     266.26,
//     324.29,
//     342.84,
//     356.51,
//     378.45,
//     451.86,
//     555.44,
//     743.12,
//     123.55,
//     145.26,
//     227.55,
//     296.13,
//     405.63,
//     680.70,
//     163.75,
//     195.00,
//     268.35,
//     97.93,
//     105.02,
//     174.44,
//     271.75,
//     132.05,
//     171.92,
//     189.57,
//     200.54,
//     245.58,
//     121.19,
//     278.03,
//     345.25,
//     405.30,
//     460.89,
//     291.42,
//     313.87,
//     382.17,
//     397.35,
// ]
function solveEquations(totalMaxRateWin: number, lowQty: number, hightQty: number, lowMcmSum: number, highMcmSum: number) {
    // Primero, despejamos Y en términos de Z de la ecuación: 440 - 5Z = 5Y
    // Y = (440 - 5Z) / 5

    // Ahora, sustituimos Y en la ecuación (23Y / 6) + (9Z / 20) = 100
    // Sustituyendo Y = (440 - 5Z) / 5

    // La ecuación resultante es:
    // (23 / 6) * ((440 - 5Z) / 5) + (9Z / 20) = 100

    // Simplificamos esta ecuación para Z:
    // const A = 23 / 6 / 5;  // coeficiente de Z en el primer término
    // const B = 9 / 20;      // coeficiente de Z en el segundo término
    const A = lowMcmSum / lowQty;  // coeficiente de Z en el primer término
    const B = highMcmSum;      // coeficiente de Z en el segundo término

    // Expresión simplificada de la ecuación
    // (A * (440 - 5Z)) + B * Z = 100

    // Despejamos Z:
    // (A * (440)) - 5A * Z + B * Z = 100
    // ( -5A + B ) * Z = 100 - (A * 440)
    const Z = (100 - A * totalMaxRateWin) / (-hightQty * A + B);

    // Ahora calculamos Y usando Y = (440 - 5Z) / 5
    const Y = (totalMaxRateWin - hightQty * Z) / lowQty;

    return { Y, Z };
}


// function solveEquations(coefs: number[], totalSum: number): number[] {
//     // Verificar que haya al menos dos coeficientes
//     if (coefs.length < 2) {
//       throw new Error("Debe haber al menos dos coeficientes.");
//     }

//     // Calcular la suma total de los coeficientes
//     const totalCoefficient = coefs.reduce((acc, coef) => acc + coef, 0); // Suma total de coeficientes

//     // Calcular el valor base X
//     const X = totalSum / totalCoefficient;

//     // Crear un arreglo para almacenar los resultados de las otras variables
//     const results = coefs.map(coef => X * coef); // Para cada coeficiente, multiplicamos X por el coeficiente

//     return results;
//   }

//   // Ejemplo de uso con un número variable de coeficientes
//   const coefs = [4, 5, 6]; // Coeficientes de las variables X, Y, Z, A, M
//   const totalSum = 12; // Suma total de la ecuación

//   const result = solveEquations(coefs, totalSum);
//   console.log("Resultados:", result); // Imprime los valores de X, Y, Z

// function solveSystem(
//     lowQty: number,
//     highQty: number,
//     lowAvg: number,
//     highAvg: number,
//     totalPercentage: number,
//     totalExpected: number
// ): { x: number; y: number } {
//     console.log("LOW QTY", lowQty)
//     console.log("HIGH QTY", highQty)
//     console.log("LOW AVG", lowAvg)
//     console.log("HIGH AVG", highAvg)
//     console.log("TOTAL PERCENTAGE", totalPercentage)
//     console.log("TOTAL EXPECTED", totalExpected)
//     // Coeficientes de las ecuaciones:
//     // 1. lowQty * x + highQty * y = totalPercentage
//     // 2. lowAvg * x + highAvg * y = totalExpected

//     // Determinante del sistema
//     const determinant = lowQty * highAvg - highQty * lowAvg;
//     console.log("DETERMINANT", determinant)
//     if (determinant === 0) {
//       throw new Error("El sistema no tiene solución única.");
//     }

//     // Resolviendo para x y y usando la regla de Cramer
//     const x = (totalPercentage * highAvg - totalExpected * highQty) / determinant;
//     const y = (lowQty * totalExpected - lowAvg * totalPercentage) / determinant;

//     console.log("X RESULT", x * lowAvg / lowQty)

//     return { x, y };
// }

const priceTreasure = 5;
const winMax = 4.4;


// Filtrar precios bajos y altos

const totalMaxRateWin = 440;
const lowQty = 5;
const hightQty = 5;

const highMcmSum = 9 / 20;


const sumaTotal = winMax * 100
const lowPrices = prices.filter(price => price < priceTreasure);
console.log("Low prices:", lowPrices);
// const lowMcm = lcmOfArray(lowPrices);
const lowMcm = lowPrices.reduce((acc, price) => acc * price, 1);
const lowPriceAvg = lowPrices.reduce((acc, price) => acc + price, 0) / lowPrices.length;
const lowPriceSum = lowPrices.reduce((acc, price) => acc + price, 0);
const lowNumerator = lowPrices.reduce((acc, price) => acc + (lowMcm / price), 0);
console.log("lowMCM: " + lowMcm)
console.log("lowNumerator: " + lowNumerator)
console.log("Low prices avg:", lowPrices.reduce((acc, price) => acc + price, 0) / lowPrices.length);
const highPrices = prices.filter(price => price >= priceTreasure);
// const highMcm = lcmOfArray(highPrices);
const highMcm = highPrices.reduce((acc, price) => acc * price, 1);
const hightNumerator = highPrices.reduce((acc, price) => acc + (highMcm / price), 0);
console.log("highMCM: " + highMcm)
console.log("hightNumerator" + hightNumerator)
const hightPriceAvg = highPrices.reduce((acc, price) => acc + price, 0) / highPrices.length;
const hightPriceSum = highPrices.reduce((acc, price) => acc + price, 0);
const solveEqu = solveEquations(sumaTotal, lowPrices.length, highPrices.length, lowNumerator / lowMcm, hightNumerator / highMcm);
console.log("SOLVE EQU", solveEqu)
console.log("High prices:", highPrices);
console.log("High prices avg:", highPrices.reduce((acc, price) => acc + price, 0) / highPrices.length);

// Obtener el precio más alto de los precios bajos
// const hightestPriceFromLowPrices = lowPrices.reduce((acc, price) => Math.max(acc, price), 0);
// const hightestPriceFromLowPrices = 473.63
// const magicValues = solveSystem(lowPrices.length, highPrices.length, lowPriceSum, hightPriceSum, 100, winMax * 100);
// console.log("MAGIC VALUES", magicValues)
const hightestPriceFromLowPrices = solveEqu.Y;
// const hightestPriceFromLowPrices = 3.782529
console.log("Hightest price from low prices:", hightestPriceFromLowPrices);

// Calcular la suma total
// const sumaTotal = prices.reduce((acc, price) => acc + price, 0) * winMax / hightestPriceFromLowPrices;

console.log("Suma:", sumaTotal);

// Calcular el total de los precios bajos y la diferencia
const totalLow = lowPrices.length * hightestPriceFromLowPrices;
console.log("Total low:", totalLow);
const diff = sumaTotal - totalLow;
console.log("Diff:", diff);
let sumaHight: number = 0
let sumaLow: number = 0
// Calcular las probabilidades
prices.forEach((price, index) => {
    if (price <= priceTreasure) {
        // sumaLow += magicValues.x * price;
        sumaLow += hightestPriceFromLowPrices;
        // probabilidad[index] = magicValues.x;
        probabilidad[index] = Number((hightestPriceFromLowPrices / price).toFixed(3));
    } else {
        const toDivideHight = diff / highPrices.length;
        // sumaHight += magicValues.y * price;
        sumaHight += toDivideHight;
        console.log("toDivideHight" + toDivideHight)
        // probabilidad[index] = magicValues.y;
        probabilidad[index] = Number((toDivideHight / price).toFixed(3));
    }
});
const sumaProbabilidades = probabilidad.reduce((acc, prob) => acc + prob, 0);
const sumaProductos = prices.reduce((acc, price, index) => acc + (price * probabilidad[index]), 0);
console.log("SUMA PRODUCTOS", sumaProductos)
console.log("SUMA PRODUCTO LOW", sumaLow)
console.log("SUMA PRODUCTO Hight", sumaHight)
const totalProbabilidad = probabilidad.reduce((acc, p) => acc + p, 0);
console.log("total probabilidad:", totalProbabilidad);
const promedioPonderado = sumaProductos / totalProbabilidad;
console.log("Promedio ponderado:", promedioPonderado);

console.log("Probabilidad:", probabilidad);

const simulationResults = simulateProbabilities(prices, probabilidad, 1);
const average = calculateAverage(simulationResults);

console.log("Simulation Results:", simulationResults);
console.log("Average:", average);




// const priceTreasure = 5;
// const winMax = 4.4;
// const lowPrices = prices.filter(price => price < priceTreasure);
// const highPrices = prices.filter(price => price >= priceTreasure);
// const hightestPriceFromLowPrices = lowPrices.reduce((acc, price) => Math.max(acc, price), 0);
// console.log("Hightest price from low prices:", hightestPriceFromLowPrices);

// const sumaTotal = prices.reduce((acc, price) => acc + price, 0) * winMax / hightestPriceFromLowPrices;
// console.log("Suma:", sumaTotal);
// const totalLow = lowPrices.length * hightestPriceFromLowPrices
// console.log("Total low:", totalLow)
// const diff = sumaTotal - totalLow;
// console.log("Diff:", diff);
// prices.forEach((price, index) => {
//     if (price < hightestPriceFromLowPrices) {
//         probabilidad[index] = hightestPriceFromLowPrices / price;
//     } else {
//         {
//             console.log("Total low", totalLow)
//             const toDivideHight = diff / highPrices.length
//             probabilidad[index] = toDivideHight / price;
//         }
//     }
// })

// console.log(probabilidad)

//Calculamos el promedio ponderado
// const totalProbabilidad = probabilidad.reduce((acc, p) => acc + p, 0);
// const sumaProductos = prices.reduce((acc, price, index) => acc + (price * probabilidad[index]), 0);


// console.log("total probabilidad:", totalProbabilidad);
// const promedioPonderado = sumaProductos / totalProbabilidad;
// console.log("Promedio ponderado:", promedioPonderado);

// let data: number = 0
// console.log(probabilidad)
// prices.forEach((price, index) => {
//     data += price * probabilidad[index];
//     console.log(price * probabilidad[index])
// })

// console.log("ECOOOOO " + data + "   " + data / 100)


// const getUsersAvg = (prices: number[], usersQuantity: number, probabilidadesAjustadas?: number[]) => {
//     let rangePrices: { min: number, max: number, price: number }[] = [];
//     let totalGanancia = 0;

//     const inversePrices = getInverse(prices);
//     const sumInversePrices = inversePrices.reduce((acc, price) => acc + price, 0);
//     const percentageInversePrices = inversePrices.map((price) => price / sumInversePrices * 100000);

//     if (probabilidadesAjustadas) {
//         probabilidadesAjustadas.forEach((price, index) => {
//             const min = index === 0 ? 0 : rangePrices[index - 1].max + 1;
//             const max = index === 0 ? price : rangePrices[index - 1].max + price;
//             rangePrices.push({ min, max, price: prices[index] })
//         })
//     } else {
//         percentageInversePrices.forEach((price, index) => {
//             const min = index === 0 ? 0 : rangePrices[index - 1].max + 1;
//             const max = index === 0 ? price : rangePrices[index - 1].max + price;
//             rangePrices.push({ min, max, price: prices[index] })
//         })
//     }


//     for (let i = 0; i < usersQuantity; i++) {
//         const randomNumber = Math.floor(Math.random() * 100000) + 1;
//         for (let range of rangePrices) {
//             if (randomNumber >= range.min && randomNumber <= range.max) {
//                 totalGanancia += range.price;
//                 break;
//             }
//         }
//     }

//     return totalGanancia.toFixed(2);
// }





// const getInverse = (prices: number[]) => {
//     return prices.map((price) => 1 / price);
// }

// const inversePrices = prices.map((price) => 1 / price);
// const sumInversePrices = inversePrices.reduce((acc, price) => acc + price, 0);
// const percentageInversePrices = inversePrices.map((prob) => prob / sumInversePrices * 100);
// const pagoActualPromedio = prices.reduce((acc, price, index) => acc + price * percentageInversePrices[index], 0); //1.45
// const pagoObjetivo = 3.78;
// const factorAjuste = pagoObjetivo / pagoActualPromedio;

// const probabilidadesAjustadas = percentageInversePrices.map((prob) => prob * factorAjuste);
// console.log(probabilidadesAjustadas)
// const suma = probabilidadesAjustadas.reduce((acc, price) => acc + price, 0);

// const resultado = probabilidadesAjustadas.map(prob => prob / sumInversePrices * 100);

// console.log(percentageInversePrices);
// console.log(resultado)


// Pago objetivo

// console.log("SUM", getUsersAvg(prices, 1000000));
// console.log("SUM 2", getUsersAvg(prices, 1000000, probabilidadesAjustadas));








// function calcularGanancia(cantidadUsuarios: number): number {
//     // Rango de usuarios y sus precios
//     const rangos = [
//         { min: 1, max: 1221, precio: 18.12 },
//         { min: 1222, max: 30317, precio: 0.13 },
//         { min: 30318, max: 39774, precio: 0.40 },
//         { min: 39775, max: 41494, precio: 2.20 },
//         { min: 41495, max: 46282, precio: 0.79 },
//         { min: 46283, max: 47282, precio: 3.78 },
//         { min: 47283, max: 48378, precio: 3.45 },
//         { min: 48379, max: 52668, precio: 5.16 },
//         { min: 52669, max: 58672, precio: 0.63 },
//         { min: 58673, max: 59686, precio: 3.73 },
//         { min: 59687, max: 62596, precio: 1.30 },
//         { min: 62597, max: 64372, precio: 2.13 },
//         { min: 64373, max: 67284, precio: 7.60 },
//         { min: 67285, max: 78746, precio: 0.33 },
//         { min: 78747, max: 81749, precio: 7.37 },
//         { min: 81750, max: 84587, precio: 7.80 },
//         { min: 84588, max: 85947, precio: 16.27 },
//         { min: 85948, max: 88019, precio: 10.68 },
//         { min: 88020, max: 89324, precio: 16.97 },
//         { min: 89325, max: 91057, precio: 12.77 },
//         { min: 91058, max: 91689, precio: 35.02 },
//         { min: 91690, max: 92544, precio: 25.87 },
//         { min: 92545, max: 92924, precio: 58.21 },
//         { min: 92925, max: 93329, precio: 54.68 },
//         { min: 93330, max: 94503, precio: 18.85 },
//         { min: 94504, max: 95689, precio: 18.67 },
//         { min: 95690, max: 97455, precio: 12.53 },
//         { min: 97456, max: 98734, precio: 17.30 },
//         { min: 98735, max: 100000, precio: 17.49 }
//     ];

//     let totalGanancia = 0;

//     // Simular la cantidad de usuarios
//     for (let i = 0; i < cantidadUsuarios; i++) {
//         // Generar un número aleatorio entre 1 y 100,000
//         const numeroAleatorio = Math.floor(Math.random() * 100000) + 1;

//         // Comprobar en qué rango cae el número aleatorio
//         for (let rango of rangos) {
//             if (numeroAleatorio >= rango.min && numeroAleatorio <= rango.max) {
//                 totalGanancia += rango.precio; // Sumar el precio correspondiente
//                 break; // Salir del bucle cuando se encuentre el rango
//             }
//         }
//     }

//     return totalGanancia;
// }

// // Ejemplo de uso:
// let cantidadUsuarios = 1000000; // Número de usuarios como entrada
// let ganancia = calcularGanancia(cantidadUsuarios);
// console.log(`Ganancia para ${cantidadUsuarios} usuarios: $${ganancia.toFixed(2)}`);

import { createApp } from 'vue';
import './style.css'
import "bootstrap-icons/font/bootstrap-icons.css";
import "@/assets/scss/globals/_index.scss"
import "@/assets/scss/elements/_index.scss"
import toastPlugin from "./utils/plugins/toast/ToastPlugin";
import loadingDirective from "./utils/directives/Loading";

import { router } from "./router";
import { i18n } from './i18n';
import App from './sections/App.vue';
import { store } from "./store";

const app = createApp(App).use(router).use(store);
app.config.globalProperties.$staticUrl = import.meta.env.VITE_STATIC_URL;
app.config.globalProperties.$staticBackUrl = import.meta.env.VITE_MODE == 'dev'? import.meta.env.VITE_BACKEND_BASE_URL+'/assets' : import.meta.env.VITE_STATIC_URL+'/assets';
app.use(i18n)
app.use(toastPlugin);
app.directive('loading', loadingDirective);
app.mount('#app');