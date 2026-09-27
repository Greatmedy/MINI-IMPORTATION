const Terms = () => (
  <div className="container-app max-w-3xl py-12 pt-28">
    <h1 className="font-display text-3xl font-semibold">Terms of Use</h1>
    <p className="mt-2 text-sm text-charcoal/50">FOA Importation Ltd</p>

    <div className="prose-sm mt-8 space-y-5 text-charcoal/80">
      <p>
        By accessing or using the FOA Mini Importation website, you agree to these Terms of Use.
        Please read them carefully before placing an order, enrolling in the Academy, or applying
        for membership.
      </p>

      <h2 className="font-display text-lg font-semibold text-charcoal">Accounts</h2>
      <p>
        You must provide accurate registration information, including your full name, email, phone
        number, and delivery address. You are responsible for keeping your password confidential
        and for all activity under your account.
      </p>

      <h2 className="font-display text-lg font-semibold text-charcoal">Orders & Payment</h2>
      <p>
        All goods are priced in Nigerian Naira (₦). Orders are paid by direct bank transfer to FOA
        Importation Ltd's company account and confirmed manually on WhatsApp once you send your
        payment receipt. Stock levels shown on the site are updated regularly but are not
        guaranteed until your order is confirmed.
      </p>

      <h2 className="font-display text-lg font-semibold text-charcoal">FOA Academy</h2>
      <p>
        Academy enrollment costs ₦15,000, paid once. Access to lesson videos is granted only after
        our team confirms your payment and marks your account as a Registered Student. Lesson
        content is for your personal learning only and may not be redistributed, recorded for
        resale, or shared with non-paying users.
      </p>

      <h2 className="font-display text-lg font-semibold text-charcoal">Membership</h2>
      <p>
        Membership costs ₦5,000 per month. Verified access lasts 30 days from the date our team
        confirms your payment. You must pay again each month and wait for re-confirmation to keep
        verified access and order-handling benefits.
      </p>

      <h2 className="font-display text-lg font-semibold text-charcoal">Reviews</h2>
      <p>
        Customers who create an account may leave one honest review per product purchased. We may
        remove reviews that are abusive, fraudulent, or unrelated to the product.
      </p>

      <h2 className="font-display text-lg font-semibold text-charcoal">Limitation of Liability</h2>
      <p>
        FOA Importation Ltd is not liable for delays caused by customs, freight carriers, or events
        outside our reasonable control. Our total liability for any order is limited to the amount
        you paid for that order.
      </p>

      <h2 className="font-display text-lg font-semibold text-charcoal">Contact</h2>
      <p>
        Questions about these terms can be sent to{" "}
        <a href="mailto:foaimportation.ltd@gmail.com" className="font-semibold text-brand-700 hover:underline">
          foaimportation.ltd@gmail.com
        </a>
        .
      </p>
    </div>
  </div>
);

export default Terms;
