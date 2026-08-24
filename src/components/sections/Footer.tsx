import { MapPin, Phone, Mail, Clock } from "lucide-react";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M20.52 3.48A11.87 11.87 0 0012.08 0C5.54 0 .22 5.32.22 11.86c0 2.09.55 4.13 1.6 5.93L.12 24l6.35-1.67a11.86 11.86 0 005.61 1.43h.01c6.54 0 11.86-5.32 11.86-11.86 0-3.17-1.23-6.15-3.43-8.42zM12.09 21.76h-.01a9.86 9.86 0 01-5.03-1.38l-.36-.21-3.77.99 1.01-3.67-.23-.38a9.85 9.85 0 01-1.51-5.25c0-5.44 4.43-9.86 9.87-9.86 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 012.89 6.99c0 5.44-4.43 9.87-9.85 9.87zm5.41-7.39c-.3-.15-1.77-.87-2.05-.97-.28-.1-.48-.15-.68.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.68-1.64-.93-2.25-.24-.59-.49-.51-.68-.52h-.58c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.5 0 1.47 1.07 2.9 1.22 3.1.15.2 2.1 3.21 5.1 4.5.71.31 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.77-.72 2.02-1.42.25-.7.25-1.3.17-1.42-.07-.13-.27-.2-.57-.35z" />
    </svg>
  );
}

function FacebookIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  );
}

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  );
}

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-slate-950 border-t border-slate-800/60">
      {/* Main footer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-500 to-teal-600 flex items-center justify-center shadow-lg shadow-emerald-500/30">
                <span className="text-white font-black text-sm">G</span>
              </div>
              <div>
                <div className="text-white font-bold text-lg leading-tight">GGEA</div>
                <div className="text-slate-500 text-xs">Garage Général Electronique Automobile</div>
              </div>
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-sm mb-6">
              Service de checking automobile à domicile à Kinshasa. Diagnostic professionnel,
              techniciens certifiés, rapport écrit fourni. Évitez les mauvaises surprises.
            </p>
            {/* Social links */}
            <div className="flex gap-3">
              {[
                { icon: WhatsAppIcon, href: "https://wa.me/243829688222", label: "WhatsApp", color: "hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:text-emerald-400" },
                { icon: FacebookIcon, href: "https://www.facebook.com/profile.php?id=61593497135212", label: "Facebook", color: "hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-blue-400" },
                { icon: InstagramIcon, href: "https://www.instagram.com/garage_ggea/", label: "Instagram", color: "hover:bg-pink-500/20 hover:border-pink-500/50 hover:text-pink-400" },
              ].map(({ icon: Icon, href, label, color }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className={`w-10 h-10 rounded-lg border border-slate-700 bg-slate-800/60 flex items-center justify-center text-slate-400 transition-all duration-200 ${color}`}
                >
                  <Icon className="size-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-white font-semibold mb-5">Nos Services</h4>
            <ul className="space-y-3 text-slate-400 text-sm">
              {[
                "Diagnostic OBD2",
                "Contrôle moteur",
                "Système de freinage",
                "Suspension & direction",
                "Électricité & batterie",
                "Inspection carrosserie",
              ].map((s) => (
                <li key={s} className="flex items-center gap-2 hover:text-emerald-400 transition-colors cursor-default">
                  <span className="text-emerald-500 text-xs">✓</span>
                  {s}
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-white font-semibold mb-5">Contact & Horaires</h4>
            <ul className="space-y-4 text-slate-400 text-sm">
              <li className="flex items-start gap-3">
                <MapPin className="size-4 text-emerald-400 mt-0.5 shrink-0" />
                <span>Kinshasa, République Démocratique du Congo</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="size-4 text-emerald-400 shrink-0" />
                <a href="tel:+243829688222" className="hover:text-white transition-colors">
                  +243 85 44 55 818
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-emerald-400 shrink-0" />
                <a href="mailto:contact.ggea@gmail.com" className="hover:text-white transition-colors">
                  contact.ggea@gmail.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock className="size-4 text-emerald-400 mt-0.5 shrink-0" />
                <div>
                  <div>Lun – Ven: 7h30 – 18h00</div>
                  <div>Sam – Dim: 8h00 – 16h00</div>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-800/60">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-slate-500 text-sm">
            © GGEA {year} — Garage Général Electronique Automobile. Tous droits réservés.
          </p>
          <div className="flex items-center gap-1 text-slate-500 text-xs">
            <span>Fait avec</span>
            <span className="text-red-400">♥</span>
            <span>à Kinshasa, DRC</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
