let timeout: ReturnType<typeof setTimeout> | null = null;
export const debounce = <F extends (...args: any[]) => any>(func: F, waitFor: number) => {
  const debounced = function (...args: Parameters<F>)  {
    if (timeout !== null) {
      clearTimeout(timeout);
      timeout = null;
    }
    timeout = setTimeout(() => func(...args), waitFor);
  };
  return debounced as (...args: Parameters<F>) => ReturnType<F>;
};