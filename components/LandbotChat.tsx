'use client'
import { useEffect } from 'react';

const LandbotChat = () => {
  useEffect(() => {
    const handleInteraction = (event: { type: string }) => {
      if (event.type === 'mouseover' || event.type === 'touchstart') {
        if (typeof window !== 'undefined') {
          const script = document.createElement('script');
          script.type = 'text/javascript';
          script.async = true;
          script.src = 'https://cdn.landbot.io/landbot-3/landbot-3.0.0.js';
          script.addEventListener('load', () => {
           // @ts-expect-error: The Landbot object is added dynamically, so TypeScript doesn't recognize it
            new window.Landbot.Livechat({
              configUrl: 'https://storage.googleapis.com/landbot.online/v3/H-2715346-G6WA6MN0Z0HN60EG/index.json',
            });
          });
          document.head.appendChild(script);
        }
      }
    };

    window.addEventListener('mouseover', handleInteraction, { once: true });
    window.addEventListener('touchstart', handleInteraction, { once: true });

    return () => {
      window.removeEventListener('mouseover', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, []);

  return null; // This component does not render anything to the DOM
};

export default LandbotChat;
