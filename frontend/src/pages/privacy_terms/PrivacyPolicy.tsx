const PrivacyPolicy = () => {
  return (
    <div className="font-sans bg-gray-100 text-gray-800">
      <section className="container mx-auto p-8">
        <h2 className="text-3xl font-bold mb-4">Privacy Policy</h2>
        <p className="mb-4">
          We are committed to protecting your privacy. This Privacy Policy
          explains how we collect, use, and safeguard your personal information.
        </p>
        {/* Information We Collect */}
        <h3 className="text-xl font-semibold mb-2">Information We Collect:</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>
            We collect basic user information (e.g., username, email) to
            personalize your experience.
          </li>
          <li>
            Your notes and data are stored securely to provide the intended
            services.
          </li>
          <li>
            We gather usage information (pages visited, features used) to
            improve our services.
          </li>
        </ul>
        {/* How We Use Your Information */}
        <h3 className="text-xl font-semibold mb-2">
          How We Use Your Information:
        </h3>
        <ul className="list-disc ml-6 mb-4">
          <li>Personalize your experience.</li>
          <li>Improve and enhance our services.</li>
        </ul>
        {/* Data Security */}
        <h3 className="text-xl font-semibold mb-2">Data Security:</h3>
        <p className="mb-4">
          We take reasonable measures to protect your information.
        </p>
        {/* Third-Party Services */}
        <h3 className="text-xl font-semibold mb-2">Third-Party Services:</h3>
        <p className="mb-4">
          We may use third-party services; their use of your information is
          governed by their privacy policies.
        </p>
        {/* Your Choices */}
        <h3 className="text-xl font-semibold mb-2">Your Choices:</h3>
        <ul className="list-disc ml-6 mb-4">
          <li>Review and update your account information.</li>
          <li>Contact us to delete your account and associated data.</li>
        </ul>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
