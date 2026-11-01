import { useEffect, useState } from 'react';

/**
 * True on devices where decorative motion should be switched off: few CPU
 * cores, data-saver mode, or a narrow viewport. Adds `low-power` to <html>
 * so CSS-only effects can respond too.
 */
export function useLowPower(): boolean {
  const [lowPower, setLowPower] = useState(false);

  useEffect(() => {
    const nav = navigator as Navigator & { connection?: { saveData?: boolean } };
    const narrow = window.matchMedia('(max-width: 767px)');
    const evaluate = () => {
      const fewCores = (nav.hardwareConcurrency ?? 8) <= 4;
      const saveData = nav.connection?.saveData === true;
      const value = fewCores || saveData || narrow.matches;
      setLowPower(value);
      document.documentElement.classList.toggle('low-power', value);
    };
    evaluate();
    narrow.addEventListener('change', evaluate);
    return () => narrow.removeEventListener('change', evaluate);
  }, []);

  return lowPower;
}
