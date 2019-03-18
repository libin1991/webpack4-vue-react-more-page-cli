import { useState, useEffect } from 'react';

function useDetectPrint() {
  const [isPrinting, toggleStatus] = useState(false);

  useEffect(() => {
    const printMq = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('print');
    if (printMq) {
      const mqEvent = (mqList: MediaQueryListEvent) => toggleStatus(!!mqList.matches);

      printMq.addListener(mqEvent);
      return () => printMq.removeListener(mqEvent);
    }
    return () => {}
  }, []);

  return isPrinting;
}

export default useDetectPrint;