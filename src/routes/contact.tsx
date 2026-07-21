import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowRight, ArrowLeft, Check, Mail, Phone, MapPin, Instagram, MessageCircle } from "lucide-react";
import { z } from "zod";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Enquire — Pause Pictures" },
      { name: "description", content: "Begin your enquiry — tell us about your story, date, destination, and vision." },
      { property: "og:title", content: "Enquire — Pause Pictures" },
      { property: "og:description", content: "A multi-step, considered enquiry form for weddings, brands, and campaigns." },
    ],
  }),
  component: Contact,
});

const schema = z.object({
  name: z.string().trim().min(2, "Please enter your name").max(80),
  email: z.string().trim().email("A valid email is required").max(160),
  phone: z.string().trim().max(30).optional().or(z.literal("")),
  service: z.string().min(1, "Please select a service"),
  date: z.string().max(30).optional().or(z.literal("")),
  destination: z.string().trim().max(120).optional().or(z.literal("")),
  budget: z.string().min(1, "Please select an investment range"),
  story: z.string().trim().min(20, "Please share a little more about your story").max(2000),
});

type Form = z.infer<typeof schema>;

const services = ["Documentary Wedding", "Commercial Film", "Corporate Shoot", "Influencer / Social", "FPV / Aerial", "Something else"];
const budgets = ["Under ₹2L", "₹2L — ₹5L", "₹5L — ₹10L", "₹10L — ₹25L", "₹25L+", "Not sure yet"];

const steps = [
  { n: "01", t: "About You" },
  { n: "02", t: "The Project" },
  { n: "03", t: "Your Story" },
] as const;

function Contact() {
  const [step, setStep] = useState(0);
  const [form, setForm] = useState<Form>({
    name: "", email: "", phone: "", service: "", date: "", destination: "", budget: "", story: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof Form, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  const update = (k: keyof Form, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const validateStep = (): boolean => {
    const partial: Partial<Record<keyof Form, string>> = {};
    if (step === 0) {
      if (form.name.trim().length < 2) partial.name = "Please enter your name";
      if (!/^\S+@\S+\.\S+$/.test(form.email)) partial.email = "A valid email is required";
    }
    if (step === 1) {
      if (!form.service) partial.service = "Please select a service";
      if (!form.budget) partial.budget = "Please select an investment range";
    }
    if (step === 2) {
      if (form.story.trim().length < 20) partial.story = "Please share a little more about your story";
    }
    setErrors(partial);
    return Object.keys(partial).length === 0;
  };

  const next = () => { if (validateStep()) setStep((s) => Math.min(s + 1, steps.length - 1)); };
  const back = () => setStep((s) => Math.max(s - 1, 0));

  const submit = () => {
    const result = schema.safeParse(form);
    if (!result.success) {
      const partial: Partial<Record<keyof Form, string>> = {};
      result.error.issues.forEach((i) => {
        const key = i.path[0] as keyof Form;
        partial[key] = i.message;
      });
      setErrors(partial);
      return;
    }
    setSubmitted(true);
  };

  return (
    <div className="paper-grain">
      <Nav />
      <PageHero
        variant="signal"
        timecode="00:00:47:03"
        eyebrow="Enquire · Begin a Project"
        title={<>Let's craft something <span className="italic font-serif gold-gradient-text">timeless</span>.</>}
        subtitle="A short, considered enquiry — three steps. We'll respond personally within 48 hours."
      />

      <section className="section-y container-x">
        <div className="grid lg:grid-cols-12 gap-12 lg:gap-16">
          {/* Left — form */}
          <Reveal className="lg:col-span-8">
            <div className="soft-card rounded-[2px] p-6 sm:p-10 md:p-14 relative overflow-hidden">
              <div aria-hidden className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-[100px] opacity-40"
                style={{ background: "radial-gradient(circle, rgba(197,168,128,0.5), transparent 60%)" }} />

              {submitted ? (
                <div className="relative text-center py-12">
                  <div className="w-16 h-16 rounded-full bg-gold text-gold-foreground mx-auto grid place-items-center gold-pulse">
                    <Check size={26} />
                  </div>
                  <h2 className="mt-8 font-display text-4xl md:text-5xl leading-tight">
                    Thank you, <span className="italic font-serif gold-gradient-text">{form.name.split(" ")[0]}</span>.
                  </h2>
                  <p className="mt-5 text-muted-foreground max-w-md mx-auto">
                    Your enquiry has landed. We'll be in touch within 48 hours with a considered response.
                  </p>
                </div>
              ) : (
                <div className="relative">
                  {/* Stepper */}
                  <div className="flex items-center gap-3 mb-10">
                    {steps.map((s, i) => (
                      <div key={s.n} className="flex-1 flex items-center gap-3">
                        <div className={`flex items-center gap-2 transition-colors ${i <= step ? "text-gold" : "text-muted-foreground/60"}`}>
                          <span className="font-display italic text-lg">{s.n}</span>
                          <span className="text-[10px] tracking-[0.3em] uppercase hidden sm:inline">{s.t}</span>
                        </div>
                        {i < steps.length - 1 && (
                          <div className={`h-px flex-1 transition-colors ${i < step ? "bg-gold" : "bg-foreground/10"}`} />
                        )}
                      </div>
                    ))}
                  </div>

                  {/* Step 0 */}
                  {step === 0 && (
                    <div className="space-y-6 reveal-up">
                      <Field label="Full name" error={errors.name}>
                        <input type="text" value={form.name} onChange={(e) => update("name", e.target.value)}
                          placeholder="Ananya Iyer" className={inputCls} />
                      </Field>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <Field label="Email" error={errors.email}>
                          <input type="email" value={form.email} onChange={(e) => update("email", e.target.value)}
                            placeholder="hello@yourname.com" className={inputCls} />
                        </Field>
                        <Field label="Phone (optional)">
                          <input type="tel" value={form.phone} onChange={(e) => update("phone", e.target.value)}
                            placeholder="+91 98000 00000" className={inputCls} />
                        </Field>
                      </div>
                    </div>
                  )}

                  {/* Step 1 */}
                  {step === 1 && (
                    <div className="space-y-6 reveal-up">
                      <Field label="Service" error={errors.service}>
                        <div className="flex flex-wrap gap-2">
                          {services.map((s) => (
                            <button
                              key={s} type="button"
                              onClick={() => update("service", s)}
                              className={`px-4 py-2.5 rounded-full text-xs tracking-wide border transition-all ${
                                form.service === s
                                  ? "bg-gold text-gold-foreground border-gold"
                                  : "border-foreground/15 text-foreground/70 hover:border-gold hover:text-gold"
                              }`}
                            >{s}</button>
                          ))}
                        </div>
                      </Field>
                      <div className="grid sm:grid-cols-2 gap-6">
                        <Field label="Date (optional)">
                          <input type="date" value={form.date} onChange={(e) => update("date", e.target.value)} className={inputCls} />
                        </Field>
                        <Field label="Destination (optional)">
                          <input type="text" value={form.destination} onChange={(e) => update("destination", e.target.value)}
                            placeholder="Udaipur, India" className={inputCls} />
                        </Field>
                      </div>
                      <Field label="Investment range" error={errors.budget}>
                        <div className="grid sm:grid-cols-3 gap-2">
                          {budgets.map((b) => (
                            <button
                              key={b} type="button"
                              onClick={() => update("budget", b)}
                              className={`px-4 py-3 rounded-[2px] text-xs tracking-wide border transition-all ${
                                form.budget === b
                                  ? "bg-gold text-gold-foreground border-gold"
                                  : "border-foreground/15 text-foreground/70 hover:border-gold hover:text-gold"
                              }`}
                            >{b}</button>
                          ))}
                        </div>
                      </Field>
                    </div>
                  )}

                  {/* Step 2 */}
                  {step === 2 && (
                    <div className="space-y-6 reveal-up">
                      <Field label="Tell us your story" error={errors.story}>
                        <textarea rows={8} value={form.story} onChange={(e) => update("story", e.target.value)}
                          placeholder="How did you meet? What kind of film do you dream of? Any references or vibes you love?"
                          className={`${inputCls} resize-none`} />
                      </Field>
                      <p className="text-xs text-muted-foreground">By submitting, you agree to be contacted by Pause Pictures regarding your enquiry.</p>
                    </div>
                  )}

                  {/* Nav */}
                  <div className="mt-10 flex items-center justify-between gap-4">
                    <button
                      type="button" onClick={back} disabled={step === 0}
                      className="inline-flex items-center gap-2 px-5 py-3 text-xs tracking-[0.25em] uppercase text-foreground/70 hover:text-gold transition-colors disabled:opacity-30 disabled:pointer-events-none"
                    >
                      <ArrowLeft size={14} /> Back
                    </button>
                    {step < steps.length - 1 ? (
                      <button type="button" onClick={next}
                        className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-foreground text-background text-xs tracking-[0.25em] uppercase hover:bg-gold hover:text-gold-foreground transition-all">
                        Continue <ArrowRight size={14} />
                      </button>
                    ) : (
                      <button type="button" onClick={submit}
                        className="inline-flex items-center gap-3 px-7 py-3.5 rounded-full bg-gold text-gold-foreground text-xs tracking-[0.25em] uppercase hover:bg-foreground hover:text-background transition-all">
                        Send Enquiry <ArrowRight size={14} />
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          </Reveal>

          {/* Right — info */}
          <Reveal delay={150} className="lg:col-span-4">
            <div className="space-y-8">
              <div>
                <p className="text-[10px] tracking-[0.4em] uppercase text-gold mb-3">Studio</p>
                <p className="font-display text-3xl leading-tight">Chennai, India</p>
                <p className="text-muted-foreground text-sm mt-2">Available for travel — India & worldwide.</p>
              </div>

              <div className="gold-divider" />

              <ul className="space-y-4 text-sm">
                <li className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-gold/15 text-gold grid place-items-center"><Mail size={14} /></span>
                  <a href="mailto:hello@prasathfilms.in" className="link-gold">hello@prasathfilms.in</a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-gold/15 text-gold grid place-items-center"><Phone size={14} /></span>
                  <a href="tel:+919800000000" className="link-gold">+91 98000 00000</a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-gold/15 text-gold grid place-items-center"><MapPin size={14} /></span>
                  <span>Chennai · Worldwide</span>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-gold/15 text-gold grid place-items-center"><Instagram size={14} /></span>
                  <a href="#" className="link-gold">@prasathfilms.in</a>
                </li>
                <li className="flex items-center gap-3">
                  <span className="w-9 h-9 rounded-full bg-gold/15 text-gold grid place-items-center"><MessageCircle size={14} /></span>
                  <a href="https://wa.me/919800000000" target="_blank" rel="noreferrer" className="link-gold">WhatsApp us directly</a>
                </li>
              </ul>

              <div className="gold-divider" />

              <div className="text-sm text-muted-foreground leading-relaxed">
                <p className="italic font-serif text-foreground text-lg">"A quiet room. A warm light. A story worth remembering."</p>
                <p className="mt-3 text-xs tracking-[0.3em] uppercase text-gold">— Studio Motto</p>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <Footer />
    </div>
  );
}

const inputCls =
  "input-underline w-full bg-transparent outline-none px-0 py-3 text-foreground placeholder:text-muted-foreground/60";

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{label}</span>
      <div className="mt-1">{children}</div>
      {error && <span className="mt-1 text-[11px] text-destructive block">{error}</span>}
    </label>
  );
}
