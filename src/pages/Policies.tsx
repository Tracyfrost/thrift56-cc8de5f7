import SiteNav from "@/components/SiteNav";
import SiteFooter from "@/components/SiteFooter";

const Policies = () => (
  <div className="min-h-screen bg-stone-950">
    <SiteNav />

    <section className="container py-16 md:py-24 max-w-3xl space-y-12">
      <div>
        <h1 className="font-heading text-3xl md:text-4xl uppercase tracking-tighter text-stone-100 mb-8">
          Policies
        </h1>
      </div>

      {/* Shipping */}
      <div>
        <h2 className="font-heading text-lg uppercase tracking-wider text-rust mb-3">
          Shipping Policy
        </h2>
        <div className="text-stone-400 text-sm leading-relaxed space-y-3">
          <p>All original and curated pieces ship within 5–7 business days via insured carrier (USPS Priority or UPS Ground). Tracking is provided for every order.</p>
          <p>Merch items (apparel, accessories) ship within 3–5 business days.</p>
          <p>Digital products are delivered instantly via email upon purchase. No physical shipment required.</p>
          <p>We currently ship within the continental United States. For international inquiries, please contact us directly.</p>
        </div>
      </div>

      {/* Returns */}
      <div>
        <h2 className="font-heading text-lg uppercase tracking-wider text-rust mb-3">
          Return & Refund Policy
        </h2>
        <div className="text-stone-400 text-sm leading-relaxed space-y-3">
          <p>We accept returns within 14 days of delivery for items in their original condition. Buyer is responsible for return shipping costs.</p>
          <p>Original 1-of-1 pieces: Due to the unique nature of these items, we encourage you to contact us before initiating a return so we can ensure proper handling and packaging instructions.</p>
          <p>Digital products are non-refundable once downloaded.</p>
          <p>To initiate a return, email us with your order number and reason for return. Refunds are processed within 5–7 business days of receiving the returned item.</p>
        </div>
      </div>

      {/* Safety */}
      <div>
        <h2 className="font-heading text-lg uppercase tracking-wider text-rust mb-3">
          Product Safety Notice
        </h2>
        <div className="text-stone-400 text-sm leading-relaxed space-y-3">
          <p>All transformed items are inspected for structural integrity before listing. We use non-toxic, archival-grade paints, stains, and sealants in our restoration process.</p>
          <p>Items labeled as "decorative" are intended for display purposes only and should not be used for food contact, unless the product description explicitly states it is food-safe.</p>
          <p>If you have questions about the specific materials used on any piece, please reach out to us before purchasing.</p>
          <p>In compliance with the Consumer Product Safety Commission (CPSC) guidelines, we do not sell items intended for children under 12 unless specifically noted and tested.</p>
        </div>
      </div>
    </section>

    <SiteFooter />
  </div>
);

export default Policies;
