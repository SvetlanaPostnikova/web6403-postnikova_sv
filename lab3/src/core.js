/**
 * Напишите функцию, которая проверяет, является ли число целым используя побитовые операторы
 * @param {*} n
 */
function isInteger(n) {
    // n | 0 отбрасывает дробную часть (приводит к 32-битному целому).
    // Если после этого число не изменилось - оно было целым.
    // Для NaN и строк результат не совпадёт с n, поэтому вернётся false.
    return (n | 0) === n;
}

/**
 * Напишите функцию, которая возвращает массив четных чисел от 2 до 20 включительно
 */
function even() {
    const result = [];

    for (let i = 2; i <= 20; i += 2) {
        result.push(i);
    }

    return result;
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя цикл
 * @param {*} n
 */
function sumTo(n) {
    let sum = 0;

    for (let i = 1; i <= n; i++) {
        sum += i;
    }

    return sum;
}

/**
 * Напишите функцию, считающую сумму чисел до заданного используя рекурсию
 * @param {*} n
 */
function recSumTo(n) {
    // Базовый случай: останавливаем рекурсию
    if (n <= 0) {
        return 0;
    }

    // Рекурсивный случай: n + сумма всех чисел до (n - 1)
    return n + recSumTo(n - 1);
}

/**
 * Напишите функцию, считающую факториал заданного числа
 * @param {*} n
 */
function factorial(n) {
    let result = 1;

    for (let i = 2; i <= n; i++) {
        result *= i;
    }

    return result;
}

/**
 * Напишите функцию, которая определяет, является ли число двойкой, возведенной в степень
 * @param {*} n
 */
function isBinary(n) {
    // У степени двойки в двоичной записи ровно одна единица (8 = 1000).
    // Тогда n - 1 состоит из одних единиц (7 = 0111), и n & (n - 1) === 0.
    // Условие n > 0 нужно, чтобы 0 не считался степенью двойки.
    return n > 0 && (n & (n - 1)) === 0;
}

/**
 * Напишите функцию, которая находит N-е число Фибоначчи
 * @param {*} n
 */
function fibonacci(n) {
    let previous = 0;
    let current = 1;

    for (let i = 1; i < n; i++) {
        [previous, current] = [current, previous + current];
    }

    // При n = 0 вернётся 0, при n = 1 и n = 2 - 1
    return n === 0 ? 0 : current;
}

/** Напишите функцию, которая принимает начальное значение и функцию операции
 * и возвращает функцию - выполняющую эту операцию.
 * Если функция операции (operatorFn) не задана - по умолчанию всегда
 * возвращается начальное значение (initialValue)
 * @param initialValue
 * @param operatorFn - (storedValue, newValue) => {operation}
 * @example
 * const sumFn =  getOperationFn(10, (a,b) => a + b);
 * console.log(sumFn(5)) - 15
 * console.log(sumFn(3)) - 18
 */
function getOperationFn(initialValue, operatorFn) {
    // storedValue живёт в замыкании: возвращаемая функция "помнит" его
    // между вызовами, а снаружи до него не добраться.
    let storedValue = initialValue;

    return (newValue) => {
        if (typeof operatorFn === 'function') {
            storedValue = operatorFn(storedValue, newValue);
        }

        return storedValue;
    };
}

/**
 * Напишите функцию создания генератора арифметической последовательности.
 * При ее вызове, она возвращает новую функцию генератор - generator().
 * Каждый вызов функции генератора возвращает следующий элемент последовательности.
 * Если начальное значение не передано, то оно равно 0.
 * Если шаг не указан, то по дефолту он равен 1.
 * Генераторов можно создать сколько угодно - они все независимые.
 *
 * @param {number} start - число с которого начинается последовательность
 * @param {number} step  - число шаг последовательности
 * @example
 * const generator = sequence(5, 2);
 * console.log(generator()); // 5
 * console.log(generator()); // 7
 * console.log(generator()); // 9
 */
function sequence(start = 0, step = 1) {
    // Каждый вызов sequence создаёт свою переменную current,
    // поэтому генераторы независимы друг от друга.
    let current = start;

    return () => {
        const value = current;
        current += step;

        return value;
    };
}

/**
 * Напишите функцию deepEqual, которая принимает два значения
 * и возвращает true только в том случае, если они имеют одинаковое значение
 * или являются объектами с одинаковыми свойствами,
 * значения которых также равны при сравнении с рекурсивным вызовом deepEqual.
 * Учитывать специфичные объекты(такие как Date, RegExp и т.п.) не обязательно
 *
 * @param {object} firstObject - первый объект
 * @param {object} secondObject - второй объект
 * @returns {boolean} - true если объекты равны(по содержанию) иначе false
 * @example
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 33], text: 'text'}) // true
 * deepEqual({arr: [22, 33], text: 'text'}, {arr: [22, 3], text: 'text2'}) // false
 */
function deepEqual(firstObject, secondObject) {
    // Одинаковые значения и одинаковые ссылки (в том числе функции)
    if (firstObject === secondObject) {
        return true;
    }

    // NaN не равен самому себе, поэтому проверяем отдельно
    if (Number.isNaN(firstObject) && Number.isNaN(secondObject)) {
        return true;
    }

    // typeof null === 'object' - это особенность языка, поэтому проверяем null
    const areObjects =
        typeof firstObject === 'object' &&
        firstObject !== null &&
        typeof secondObject === 'object' &&
        secondObject !== null;

    if (!areObjects) {
        return false;
    }

    // Массив и обычный объект с такими же ключами не равны
    if (Array.isArray(firstObject) !== Array.isArray(secondObject)) {
        return false;
    }

    const firstKeys = Object.keys(firstObject);
    const secondKeys = Object.keys(secondObject);

    if (firstKeys.length !== secondKeys.length) {
        return false;
    }

    // Каждый ключ должен быть и во втором объекте, а значения - равны рекурсивно
    return firstKeys.every(
        (key) =>
            Object.prototype.hasOwnProperty.call(secondObject, key) &&
            deepEqual(firstObject[key], secondObject[key])
    );
}

module.exports = {
    isInteger,
    even,
    sumTo,
    recSumTo,
    factorial,
    isBinary,
    fibonacci,
    getOperationFn,
    sequence,
    deepEqual,
};
