import { MessageCircle } from 'lucide-react';
import { business } from '../config/business';

export function WhatsApp() {
  return (
    <a
      aria-label="Escríbenos por WhatsApp"
      href={`https://wa.me/${business.whatsapp}`}
      target="_blank"
      rel="noreferrer"
      className="fixed bottom-6 left-6 z-40 rounded-full border-2 border-butter bg-[#25d366] p-3.5 text-white shadow-pink transition hover:scale-105"
    >
      <MessageCircle size={23} />
    </a>
  );
}
