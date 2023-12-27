const TermsConditions = () => {
  return (
    <div className="font-sans bg-gray-100 h-screen dark:bg-[#1F1F1F] text-gray-800 dark:text-gray-200">
      <section className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-4">Terms and Conditions</h2>
        {/* Acceptance of Terms */}
        <h3 className="text-xl font-semibold mb-2">Acceptance of Terms:</h3>
        <p className="mb-4">
          By using our services, you agree to comply with and be bound by these
          terms.
        </p>
        {/* Use of Services */}
        <h3 className="text-xl font-semibold mb-2">Use of Services:</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>You retain ownership of the content you create.</li>
          <li>Prohibited conduct: No unlawful or prohibited activities.</li>
        </ul>
        {/* Limitation of Liability */}
        <h3 className="text-xl font-semibold mb-2">Limitation of Liability:</h3>
        <p className="mb-4">
          We are not liable for any damages arising from your use of our
          services.
        </p>
        {/* Changes to Terms */}
        <h3 className="text-xl font-semibold mb-2">Changes to Terms:</h3>
        <p className="mb-4">
          We may modify these terms; your continued use after changes
          constitutes acceptance.
        </p>
        {/* Contact Information */}
        <h3 className="text-xl font-semibold mb-2">Contact Information:</h3>
        <p className="mb-4">
          For questions or concerns, contact us at{" "}
          <a
            href="mailto:sahal-p@outlook.com"
            className="text-blue-500 hover:underline"
          >
            sahal-p@outlook.com
          </a>
          .
        </p>
      </section>
    </div>
  );
};

export default TermsConditions;
