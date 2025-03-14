import { useState, useEffect } from 'react';

/**
 * Хук для создания отложенного значения, которое обновляется только после
 * указанной задержки после последнего изменения исходного значения.
 * Полезно для предотвращения частых запросов при вводе в поле поиска.
 * 
 * @param value Исходное значение, которое нужно отложить
 * @param delay Задержка в миллисекундах
 * @returns Отложенное значение
 */
export function useDebounce<T>(value: T, delay: number): T {
    const [debouncedValue, setDebouncedValue] = useState<T>(value);

    useEffect(() => {
        // Устанавливаем таймер для обновления отложенного значения
        const timer = setTimeout(() => {
            setDebouncedValue(value);
        }, delay);

        // Очищаем таймер при изменении value или unmount
        return () => {
            clearTimeout(timer);
        };
    }, [value, delay]);

    return debouncedValue;
} 