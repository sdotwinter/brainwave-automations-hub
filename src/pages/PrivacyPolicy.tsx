const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <div className="mx-auto max-w-3xl px-6 py-16">
        <h1 className="mb-2 text-3xl font-bold">Privacy Policy</h1>
        <p className="mb-8 text-sm text-muted-foreground">Effective date: March 5, 2026</p>

        <section className="mb-6 space-y-3">
          <h2 className="text-xl font-semibold">Who we are</h2>
          <p>
            Brainwave Automations Hub provides automation and marketing services, including lead form workflows and
            campaign operations.
          </p>
        </section>

        <section className="mb-6 space-y-3">
          <h2 className="text-xl font-semibold">Information we collect</h2>
          <p>
            We may collect information you submit through forms, including name, email address, phone number, and any
            case-related details you choose to provide.
          </p>
        </section>

        <section className="mb-6 space-y-3">
          <h2 className="text-xl font-semibold">How we use information</h2>
          <p>We use submitted information to:</p>
          <ul className="list-disc space-y-1 pl-6">
            <li>review potential legal investigation intake submissions,</li>
            <li>contact users about requested follow-up, and</li>
            <li>improve campaign and lead qualification workflows.</li>
          </ul>
        </section>

        <section className="mb-6 space-y-3">
          <h2 className="text-xl font-semibold">Sharing and retention</h2>
          <p>
            We do not sell personal data. Information may be shared with trusted service providers and legal partners
            when needed to review or process an inquiry. We retain data only as long as necessary for operational,
            legal, or compliance purposes.
          </p>
        </section>

        <section className="mb-6 space-y-3">
          <h2 className="text-xl font-semibold">Your choices</h2>
          <p>
            You may request access, correction, or deletion of your submitted information by contacting us at the email
            below.
          </p>
        </section>

        <section className="space-y-3">
          <h2 className="text-xl font-semibold">Contact</h2>
          <p>
            For privacy requests or questions, contact:{" "}
            <a className="underline" href="mailto:seanegjwinter@gmail.com">
              seanegjwinter@gmail.com
            </a>
            .
          </p>
        </section>
      </div>
    </main>
  );
};

export default PrivacyPolicy;
