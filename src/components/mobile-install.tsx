import { useState, useEffect } from 'react';

export function InstallPrompt() {
  const [isIOS, setIsIOS] = useState(false);
  const [isStandalone, setIsStandalone] = useState(false);

  useEffect(() => {
    const isIOS =
      /iPad|iPhone|iPod/.test(navigator.userAgent) ||
      (navigator.maxTouchPoints > 1 && /Macintosh/.test(navigator.userAgent));
    setIsIOS(isIOS);

    setIsStandalone(window.matchMedia('(display-mode: standalone)').matches);
  }, []);

  if (isStandalone) {
    return null; // Don't show install button if already installed
  }

  return (
    <div className='max-w-md mx-auto mt-10 rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm'>
      <h3 className='mb-3 text-xl font-semibold text-zinc-800'>📲 Install App</h3>

      <button className='w-full rounded-xl bg-zinc-900 py-2 text-sm font-medium text-white hover:bg-zinc-800'>
        Add to Home Screen
      </button>

      {isIOS && (
        <p className='mt-4 rounded-xl bg-zinc-50 p-4 text-sm text-zinc-600'>
          Para instalar esta app en iOS, toca el botón de compartir{' '}
          <span className='mx-1 inline-block'>⎋</span>y luego selecciona{' '}
          <span className='font-medium text-zinc-800'>“Add to Home Screen”</span>{' '}
          <span className='mx-1 inline-block'>➕</span>
        </p>
      )}
    </div>
  );
}
