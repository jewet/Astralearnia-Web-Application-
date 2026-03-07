"use client";
// ═══════════════════════════════════════
// SAVE THIS AS: app/privacy/page.tsx
// ═══════════════════════════════════════

const sections = [
  { heading: "Information We Collect", body: "We collect information you provide directly (name, email, organisation, usage data), information collected automatically when you use our platform (log data, device information, cookies), and information from third-party services you connect to our platform." },
  { heading: "How We Use Your Information", body: "We use your data to provide and improve our services, communicate with you about your account and our products, process transactions, detect and prevent fraud, comply with legal obligations, and with your consent, send marketing communications." },
  { heading: "Data Sharing", body: "We do not sell your personal data. We may share data with service providers who process it on our behalf (infrastructure, payment processing, email delivery), with your consent, or where required by law. All third-party processors are contractually bound to GDPR-compliant standards." },
  { heading: "Data Retention", body: "We retain personal data for as long as necessary to provide our services and comply with legal obligations. Enterprise client data is retained per contract terms. You may request deletion of your account data at any time by contacting privacy@astralearnia.com." },
  { heading: "Your Rights (GDPR)", body: "You have the right to access, correct, delete, restrict processing of, and port your personal data. You may withdraw consent at any time. To exercise these rights, contact us at privacy@astralearnia.com. We respond within 30 days." },
  { heading: "Data Security", body: "We implement AES-256 encryption at rest, TLS 1.3 in transit, regular penetration testing, SOC 2 Type II compliance, and role-based access controls. No security system is perfect; we maintain an incident response plan and will notify affected users within 72 hours of a breach." },
  { heading: "Cookies", body: "We use essential cookies for authentication and security, and optional analytics cookies with your consent. See our Cookie Policy for full details and opt-out instructions." },
  { heading: "Contact", body: "Astralearnia Technologies Ltd · privacy@astralearnia.com · Lagos, Nigeria. Data Protection Officer: dpo@astralearnia.com." },
];

function LegalPage({ title, updated, sections }: { title: string; updated: string; sections: { heading: string; body: string }[] }) {
  return (
    <main className="bg-[#050810] min-h-screen text-white font-sans antialiased">
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_30%_at_50%_0%,rgba(0,200,255,0.05),transparent)]" />
      </div>
      <section className="relative z-10 pt-36 pb-28 px-6 lg:px-12 max-w-3xl mx-auto">
        <div className="text-xs font-black uppercase tracking-[0.22em] text-white/30 mb-6">Legal</div>
        <h1 className="font-black text-5xl sm:text-6xl tracking-[-0.04em] mb-4">
          <span style={{ background: "linear-gradient(135deg,#00c8ff,#7c5cff)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>{title}</span>
        </h1>
        <p className="text-sm text-white/35 mb-16 font-medium">Last updated: {updated}</p>

        <div className="flex flex-col gap-12">
          {sections.map((s, i) => (
            <div key={i}>
              <h2 className="text-xl font-black text-white mb-4">{s.heading}</h2>
              <p className="text-base text-white/60 leading-[1.8]">{s.body}</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default function PrivacyPage() {
  return <LegalPage title="Privacy Policy" updated="March 1, 2026" sections={sections} />;
}