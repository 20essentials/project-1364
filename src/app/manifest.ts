import { LOGO_PATH } from '@/lib/consts';
import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Next.js PWA',
    short_name: 'NextPWA',
    description: 'A Progressive Web App built with Next.js',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    icons: [
      {
        src: LOGO_PATH,
        sizes: '192x192',
        type: 'image/png'
      },
      {
        src: LOGO_PATH,
        sizes: '512x512',
        type: 'image/png'
      }
    ]
  };
}
