import SiteNav from "@/components/SiteNav";
import Seo from "@/components/Seo";
import SiteFooter from "@/components/SiteFooter";

const Policies = () => (
  <div className="min-h-screen bg-stone-950">
    <SiteNav />
      <Seo title="Policies — Shipping, Returns, Safety | Thrift 56" description="Thrift 56 shipping, return, refund, and product safety policies for original art, prints, curated finds, and merch." path="/policies" />

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
        <p className="text-stone-500 text-xs uppercase tracking-wider mb-4">Effective 5/17/2026</p>
        <div className="text-stone-400 text-sm leading-relaxed space-y-4">
          <p className="font-heading uppercase tracking-wider text-rust text-base">All Sales Final.</p>
          <p>At Thrift 56, every piece has a story. Most items are vintage, thrifted, secondhand, artist-transformed, collectible, handmade, or one-of-one. Signs of age, wear, imperfections, patina, repair, texture variation, or irregularities are part of each item's character. Please review all photos, measurements, descriptions, and condition notes carefully before purchasing.</p>

          <div>
            <p className="font-heading uppercase tracking-wider text-stone-200 text-xs mb-2">No returns, exchanges, or cancellations for:</p>
            <ul className="list-disc list-inside space-y-1 text-stone-400">
              <li>Buyer's remorse or change of mind</li>
              <li>Incorrect fit or sizing assumptions</li>
              <li>Color variation due to screen/device settings</li>
              <li>Vintage wear or imperfections disclosed in listing</li>
              <li>Natural aging, patina, distressing, or character marks</li>
              <li>Carrier delays</li>
              <li>Discounted, clearance, mystery, raffle, custom, transformed, or limited-release items</li>
            </ul>
          </div>

          <div>
            <p className="font-heading uppercase tracking-wider text-stone-200 text-xs mb-2">Exceptions (case-by-case review):</p>
            <ul className="list-disc list-inside space-y-1 text-stone-400">
              <li>Item arrived damaged in shipping</li>
              <li>Wrong item received</li>
              <li>Major undisclosed defect significantly affecting usability</li>
            </ul>
            <p className="mt-2">Contact us within <span className="text-stone-200">48 hours of delivery</span> with clear photos of the item, packaging, shipping label, and the issue. Keep all original packaging until the review is completed. Requests outside the 48-hour window may not qualify.</p>
          </div>

          <div>
            <p className="font-heading uppercase tracking-wider text-stone-200 text-xs mb-2">Shipping damage claims</p>
            <p>If an item arrives damaged in transit, we work with the carrier and review case-by-case. Approved resolutions may include partial refund, store credit, replacement (if available), or full refund upon approved return. Thrift 56 reserves the right to determine the appropriate resolution.</p>
          </div>

          <div>
            <p className="font-heading uppercase tracking-wider text-stone-200 text-xs mb-2">Lost or stolen packages</p>
            <p>Thrift 56 is not responsible for packages marked as delivered by the carrier. Contact the carrier directly and check with neighbors or local delivery offices.</p>
          </div>

          <div>
            <p className="font-heading uppercase tracking-wider text-stone-200 text-xs mb-2">Order cancellations</p>
            <p>Orders cannot be canceled once payment has been processed.</p>
          </div>

          <div>
            <p className="font-heading uppercase tracking-wider text-stone-200 text-xs mb-2">Contact</p>
            <p>Email <a href="mailto:tracie@thrift56.com" className="text-rust underline">tracie@thrift56.com</a> with order number, full name, photos of the issue, and a brief description.</p>
          </div>
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
