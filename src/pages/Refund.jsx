const Refund = () => (
  <div className="container-app max-w-3xl py-12 pt-28">
    <h1 className="font-display text-3xl font-semibold">Refund Policy</h1>
    <p className="mt-2 text-sm text-charcoal/50">FOA Importation Ltd</p>

    <div className="prose-sm mt-8 space-y-5 text-charcoal/80">
      <p>
        All orders on FOA Mini Importation are paid by direct bank transfer and confirmed manually
        by our team on WhatsApp after you send your payment receipt. This policy explains when a
        refund or replacement is available.
      </p>

      <h2 className="font-display text-lg font-semibold text-charcoal">48-Hour Review Window</h2>
      <p>
        If your order has not yet been marked "Paid" or "Packaged" by our team, you may request a
        full refund within 48 hours of sending your payment receipt by messaging us on WhatsApp. We
        will confirm and process the refund within 5 business days to the account you paid from.
      </p>

      <h2 className="font-display text-lg font-semibold text-charcoal">Once an Order Has Shipped</h2>
      <p>
        Refunds are not available once an order has been marked "Shipped" or later, because your
        goods are already in transit. If an item arrives damaged, defective, or significantly
        different from what was described, contact us within 48 hours of delivery with photos, and
        we will arrange a replacement or partial refund at our discretion.
      </p>

      <h2 className="font-display text-lg font-semibold text-charcoal">Academy Enrollment & Membership</h2>
      <p>
        The ₦15,000 Academy enrollment fee is non-refundable once a student has been marked
        "Registered" and academy lessons have been unlocked. Monthly ₦5,000 membership payments are
        non-refundable once verification has been granted for that month, since access and support
        for that period have already begun.
      </p>

      <h2 className="font-display text-lg font-semibold text-charcoal">When Refunds Are Refused</h2>
      <p>
        We reserve the right to refuse a refund where the 48-hour window has passed, where goods
        have already shipped, where academy or membership access has already been granted for the
        period paid, or where there is evidence of misuse.
      </p>

      <h2 className="font-display text-lg font-semibold text-charcoal">How to Request a Refund</h2>
      <p>
        Message us on WhatsApp at +234 810 352 6784 or email{" "}
        <a href="mailto:foaimportation.ltd@gmail.com" className="font-semibold text-brand-700 hover:underline">
          foaimportation.ltd@gmail.com
        </a>{" "}
        with your order ID and reason for the request.
      </p>
    </div>
  </div>
);

export default Refund;
