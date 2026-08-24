import { MapPin, Phone, Mail, Clock, Facebook, Instagram, MessageCircle } from "lucide-react";

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
                { icon: MessageCircle, href: "https://wa.me/243000000000", label: "WhatsApp", color: "hover:bg-emerald-500/20 hover:border-emerald-500/50 hover:text-emerald-400" },
                { icon: Facebook, href: "https://facebook.com/GGEAKinshasa", label: "Facebook", color: "hover:bg-blue-500/20 hover:border-blue-500/50 hover:text-blue-400" },
                { icon: Instagram, href: "https://instagram.com/ggea.kinshasa", label: "Instagram", color: "hover:bg-pink-500/20 hover:border-pink-500/50 hover:text-pink-400" },
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
                <a href="tel:+243000000000" className="hover:text-white transition-colors">
                  +243 000 000 000
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail className="size-4 text-emerald-400 shrink-0" />
                <a href="mailto:contact@ggea.cd" className="hover:text-white transition-colors">
                  contact@ggea.cd
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
