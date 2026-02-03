'use client';
import { useState, useEffect } from 'react';
import { subscribeUser, unsubscribeUser, sendNotification } from './actions';
import { urlBase64ToUint8Array } from '@/lib/utils';
import { InstallPrompt } from '@/components/mobile-install';

function PushNotificationManager() {
  const [isSupported, setIsSupported] = useState(false);
  const [subscription, setSubscription] = useState<PushSubscription | null>(null);
  const [message, setMessage] = useState('');

  async function registerServiceWorker() {
    const registration = await navigator.serviceWorker.register('/sw.js', {
      scope: '/',
      updateViaCache: 'none'
    });
    const sub = await registration.pushManager.getSubscription();
    setSubscription(sub);
  }

  useEffect(() => {
    if ('serviceWorker' in navigator && 'PushManager' in window) {
      setIsSupported(true);
      registerServiceWorker();
    }
  }, []);

  async function subscribeToPush() {
    const registration = await navigator.serviceWorker.ready;
    const sub = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!
      )
    });
    setSubscription(sub);
    const serializedSub = JSON.parse(JSON.stringify(sub));
    await subscribeUser(serializedSub);
  }

  async function unsubscribeFromPush() {
    await subscription?.unsubscribe();
    setSubscription(null);
    await unsubscribeUser();
  }

  async function sendTestNotification() {
    if (subscription) {
      await sendNotification(message);
      setMessage('');
    }
  }

  if (!isSupported) {
    return <p>Push notifications are not supported in this browser.</p>;
  }

  return (
    <div className='max-w-md mx-auto mt-10 rounded-2xl border border-zinc-200 bg-white p-8 shadow-sm'>
      <h3 className='mb-6 text-2xl font-semibold text-zinc-800'>
        🔔 Push Notifications
      </h3>

      {subscription ? (
        <div className='space-y-6'>
          <p className='text-sm font-medium text-emerald-600'>
            Estás suscrito a las notificaciones push.
          </p>

          <div className='flex gap-3'>
            <input
              type='text'
              placeholder='Mensaje de prueba…'
              value={message}
              onChange={e => setMessage(e.target.value)}
              className='flex-1 rounded-xl border border-zinc-300 px-4 py-3 text-sm focus:border-zinc-500 focus:outline-none'
            />
            <button
              onClick={sendTestNotification}
              className='rounded-xl bg-zinc-900 px-5 py-3 text-sm font-medium text-white hover:bg-zinc-800'
            >
              Enviar
            </button>
          </div>

          <button
            onClick={unsubscribeFromPush}
            className='w-full rounded-xl border border-red-200 bg-red-50 py-3 text-sm font-medium text-red-600 hover:bg-red-100'
          >
            Cancelar suscripción
          </button>
        </div>
      ) : (
        <div className='space-y-6'>
          <p className='text-sm text-zinc-500'>
            No estás suscrito a las notificaciones push.
          </p>
          <button
            onClick={subscribeToPush}
            className='w-full rounded-xl bg-emerald-600 py-3 text-sm font-medium text-white hover:bg-emerald-500'
          >
            Suscribirme
          </button>
        </div>
      )}
    </div>
  );
}

export default function Page() {
  return (
    <div className='p-4'>
      <PushNotificationManager />
      <InstallPrompt />
    </div>
  );
}
