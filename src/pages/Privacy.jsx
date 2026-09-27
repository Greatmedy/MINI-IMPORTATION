const Privacy = () => (
  <div className="container-app max-w-3xl py-12 pt-28">
    <h1 className="font-display text-3xl font-semibold">Privacy Policy</h1>
    <p className="mt-2 text-sm text-charcoal/50">FOA Importation Ltd</p>

    <div className="prose-sm mt-8 space-y-5 text-charcoal/80">
      <p>
        FOA Importation Ltd ("FOA", "we", "us") respects your privacy. This policy explains what
        information we collect through the FOA Mini Importation website, how we use it, and the
        choices you have.
      </p>

      <h2 className="font-display text-lg font-semibold text-charcoal">Information We Collect</h2>
      <p>
        When you register, we collect your full name, email address, phone number, and delivery
        address. When you shop, enroll in the Academy, or apply for membership, we record your
        orders, enrollment, and membership requests. We do not collect card or bank login details,
        payments are made directly to our company bank account and confirmed manually on WhatsApp.
      </p>

      <h2 className="font-display text-lg font-semibold text-charcoal">How We Use Your Information</h2>
      <p>
        We use your details to process orders, confirm Academy enrollment and membership payments,
        deliver goods, communicate with you on WhatsApp or email, and improve our services. We do
        not sell your personal information to third parties.
      </p>

      <h2 className="font-display text-lg font-semibold text-charcoal">Cloudinary & Media Storage</h2>
      <p>
        Product photos, review images, and Academy lesson videos are stored securely with our media
        hosting provider, Cloudinary. Academy lesson videos are only accessible to registered,
        paying students through our protected API.
      </p>

      <h2 className="font-display text-lg font-semibold text-charcoal">Your Rights</h2>
      <p>
        You can update your name, phone number, and delivery address at any time from your account
        dashboard. To request deletion of your account or data, contact us at{" "}
        <a href="mailto:foaimportation.ltd@gmail.com" className="font-semibold text-brand-700 hover:underline">
          foaimportation.ltd@gmail.com
        </a>
        .
      </p>

      <h2 className="font-display text-lg font-semibold text-charcoal">Changes to This Policy</h2>
      <p>
        We may update this policy from time to time. Continued use of the site after changes means
        you accept the updated policy.
      </p>
    </div>
  </div>
);

export default Privacy;
