import type { FAQ } from "./seo-config";

export default function FAQSection({ faqs, title = "Frequently Asked Questions" }: { faqs: FAQ[]; title?: string }) {
  return (
    <section aria-labelledby="faq-heading" className="mx-auto max-w-4xl px-4 py-16">
      <h2 id="faq-heading" className="mb-8 text-center text-3xl font-bold">
        {title}
      </h2>
      <div className="space-y-3">
        {faqs.map((f) => (
          <details key={f.q} className="group rounded-xl border bg-card p-5 open:shadow-sm">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-lg font-semibold">
              <h3 className="text-base md:text-lg">{f.q}</h3>
              <span aria-hidden className="transition group-open:rotate-45">+</span>
            </summary>
            <p className="mt-3 leading-relaxed text-muted-foreground">{f.a}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
