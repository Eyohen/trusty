import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const PrivacyPolicy = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-white via-purple-50 to-white">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-purple-100 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div onClick={() => navigate('/')} className="flex items-center space-x-2 cursor-pointer">
              <FileText className="h-8 w-8 text-[#006D5B]" />
              <span className="text-2xl font-bold text-[#006D5B]">
                ZenTranscript
              </span>
            </div>
            <button
              onClick={() => navigate(-1)}
              className="text-[#006D5B] hover:text-purple-700 transition-colors flex items-center space-x-1"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </button>
          </div>
        </div>
      </nav>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-lg p-8 md:p-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Privacy Policy</h1>
          <p className="text-gray-500 mb-8">Last updated: June 2025</p>

          <div className="prose prose-gray max-w-none">
            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. About Us</h2>
              <p className="text-gray-600 mb-4">
                Zen Transcript Ltd. ("Zen Transcript," "we," "us," or "our") provides transcription, captioning, translation, and document-related services through our website (zentranscript.com) and affiliated digital platforms (collectively, the "Site" or "Services").
              </p>
              <p className="text-gray-600 mb-4">
                We are committed to protecting your personal information and respecting your privacy in compliance with applicable data protection laws, including the General Data Protection Regulation (GDPR), the California Privacy Rights Act (CPRA), and other relevant legislation.
              </p>
              <p className="text-gray-600">
                If you have any questions about this Privacy Policy, please contact our Data Protection Officer (DPO) at:
                <br />
                <a href="mailto:privacy@zentranscript.com" className="text-[#006D5B] hover:text-purple-700">privacy@zentranscript.com</a>
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Purpose of This Privacy Policy</h2>
              <p className="text-gray-600 mb-4">This Privacy Policy explains:</p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li>What personal data we collect and how we use it</li>
                <li>Your rights regarding your data</li>
                <li>How we protect your information</li>
                <li>When and why we share data with third parties</li>
              </ul>
              <p className="text-gray-600">
                By accessing or using our Services, you acknowledge that you have read, understood, and agree to this Privacy Policy. If you do not agree, please discontinue use of our Site and Services.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Data Protection Principles</h2>
              <p className="text-gray-600 mb-4">We adhere to the following core principles:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Lawfulness, fairness, and transparency</strong> — We process data legally and openly.</li>
                <li><strong>Purpose limitation</strong> — We collect data for specific, legitimate reasons only.</li>
                <li><strong>Data minimization</strong> — We only collect what we need.</li>
                <li><strong>Accuracy</strong> — We keep your information up to date.</li>
                <li><strong>Storage limitation</strong> — We retain data only as long as necessary.</li>
                <li><strong>Integrity and confidentiality</strong> — We secure your data using robust measures.</li>
              </ul>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. Types of Data We Collect</h2>
              <p className="text-gray-600 mb-4">We may collect the following categories of personal information:</p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li><strong>Identifiers:</strong> Name, title, email address, phone number, and mailing address.</li>
                <li><strong>Account and transaction data:</strong> Username, payment history, and order information.</li>
                <li><strong>Financial data:</strong> Payment instrument details (e.g., credit/debit card data).</li>
                <li><strong>Device and usage data:</strong> IP address, browser type, system activity, cookies, and log data.</li>
                <li><strong>Communications:</strong> Correspondence via email, chat, or feedback forms.</li>
                <li><strong>Location data:</strong> General geographic information inferred from your IP address.</li>
              </ul>
              <p className="text-gray-600">
                We typically do not collect "special categories" of data (e.g., race, religion, or political views).
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. How We Collect Information</h2>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Directly from you:</strong> When you register, place an order, submit a file, or contact us.</li>
                <li><strong>Automatically:</strong> Through cookies, web server logs, and similar technologies.</li>
                <li><strong>From third parties:</strong> Such as analytics providers, advertising partners, or affiliates who refer you to our services.</li>
              </ul>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. How We Use Your Information</h2>
              <p className="text-gray-600 mb-4">We process your personal data only when permitted by law. We use it to:</p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li>Provide and maintain our Services;</li>
                <li>Process and fulfill your orders and payments;</li>
                <li>Communicate with you about your projects, inquiries, and account;</li>
                <li>Improve our platform and customer experience;</li>
                <li>Prevent fraud, abuse, and security threats;</li>
                <li>Comply with legal obligations; and</li>
                <li>Send marketing or service updates (you can opt out anytime).</li>
              </ul>
              <p className="text-gray-600 font-semibold">We do not sell your personal information.</p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Legal Bases for Processing (GDPR)</h2>
              <p className="text-gray-600 mb-4">For users in the EU, UK, and EEA, we process your personal data based on:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li><strong>Contractual necessity</strong> – to deliver the Services you request.</li>
                <li><strong>Legitimate interest</strong> – to operate and improve our business.</li>
                <li><strong>Legal obligation</strong> – to meet regulatory requirements.</li>
                <li><strong>Consent</strong> – when required, such as for marketing communications.</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Data Sharing and Third Parties</h2>
              <p className="text-gray-600 mb-4">We may share data with trusted third-party service providers who help us operate our Services. These include:</p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li>Cloud storage and hosting providers</li>
                <li>Payment processors</li>
                <li>Translators and transcribers</li>
                <li>IT and cybersecurity services</li>
                <li>Analytics and communication tools</li>
              </ul>
              <p className="text-gray-600 mb-4">
                All third parties are contractually required to maintain confidentiality and protect your information in accordance with applicable data laws.
              </p>
              <p className="text-gray-600 mb-4">We may also disclose information:</p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>To comply with legal obligations or lawful requests;</li>
                <li>In connection with mergers, acquisitions, or business transfers;</li>
                <li>To protect the safety, rights, and property of Zen Transcript and its users.</li>
              </ul>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. International Data Transfers</h2>
              <p className="text-gray-600">
                Your information may be transferred to and processed in countries outside your own, including the United States and the United Kingdom. We ensure that such transfers occur under appropriate safeguards, such as Standard Contractual Clauses (SCCs) or equivalent mechanisms.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Data Security</h2>
              <p className="text-gray-600 mb-4">We use technical and organizational measures to secure your data against loss, misuse, unauthorized access, disclosure, or alteration. This includes:</p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li>Encryption of data in transit and at rest;</li>
                <li>Access controls and authentication mechanisms;</li>
                <li>Regular security audits and staff training.</li>
              </ul>
              <p className="text-gray-600">
                Despite our efforts, no system is entirely secure, and we cannot guarantee absolute protection of your data.
              </p>
            </section>

            {/* Section 11 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Data Retention</h2>
              <p className="text-gray-600">
                We retain your personal data only for as long as necessary to fulfill the purposes outlined in this policy, unless a longer period is required by law. After that, we securely delete or anonymize your data.
              </p>
            </section>

            {/* Section 12 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Cookies and Tracking Technologies</h2>
              <p className="text-gray-600 mb-4">We use cookies and similar technologies to:</p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li>Enable site functionality</li>
                <li>Analyze site traffic and performance</li>
                <li>Provide personalized experiences</li>
              </ul>
              <p className="text-gray-600">
                You may modify your browser settings to refuse cookies; however, doing so may limit certain functionalities.
              </p>
            </section>

            {/* Section 13 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Your Rights</h2>
              <p className="text-gray-600 mb-4">Depending on your jurisdiction, you may have the following rights:</p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li><strong>Access</strong> – Obtain a copy of your personal data.</li>
                <li><strong>Correction</strong> – Request corrections to inaccurate data.</li>
                <li><strong>Erasure</strong> – Ask us to delete your information.</li>
                <li><strong>Restriction</strong> – Limit processing under certain conditions.</li>
                <li><strong>Portability</strong> – Receive your data in a transferable format.</li>
                <li><strong>Objection</strong> – Object to processing based on legitimate interests.</li>
                <li><strong>Withdrawal of consent</strong> – Revoke consent at any time.</li>
              </ul>
              <p className="text-gray-600">
                To exercise your rights, contact <a href="mailto:privacy@zentranscript.com" className="text-[#006D5B] hover:text-purple-700">privacy@zentranscript.com</a>. We may verify your identity before processing your request.
              </p>
            </section>

            {/* Section 14 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Rights of California Residents</h2>
              <p className="text-gray-600 mb-4">Under the California Privacy Rights Act (CPRA), California residents have additional rights to:</p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li>Request details about data collected or disclosed in the past 12 months;</li>
                <li>Request deletion of personal information;</li>
                <li>Opt out of certain data-sharing activities; and</li>
                <li>Not be discriminated against for exercising privacy rights.</li>
              </ul>
              <p className="text-gray-600">
                Zen Transcript does not sell or share your data for monetary consideration.
              </p>
            </section>

            {/* Section 15 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Children's Privacy</h2>
              <p className="text-gray-600">
                Our Services are not directed toward children under 18. If we learn that we have collected data from a minor without parental consent, we will delete it promptly.
              </p>
            </section>

            {/* Section 16 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">16. Updates to This Policy</h2>
              <p className="text-gray-600">
                We may revise this Privacy Policy periodically to reflect changes in our practices or laws. Updates will be posted on this page with a revised "last updated" date. Substantial changes will be communicated directly to you when required by law.
              </p>
            </section>

            {/* Section 17 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">17. Contact Us</h2>
              <p className="text-gray-600 mb-4">If you have questions, concerns, or requests about this Privacy Policy, please contact us:</p>
              <p className="text-gray-600">
                <a href="mailto:privacy@zentranscript.com" className="text-[#006D5B] hover:text-purple-700">privacy@zentranscript.com</a>
                <br />
                <a href="https://zentranscript.com" className="text-[#006D5B] hover:text-purple-700" target="_blank" rel="noopener noreferrer">zentranscript.com</a>
              </p>
            </section>
          </div>
        </div>

        {/* Back to home link */}
        <div className="text-center mt-8">
          <button
            onClick={() => navigate('/')}
            className="text-[#006D5B] hover:text-purple-700 transition-colors"
          >
            ← Back to home
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8 px-4 mt-12">
        <div className="max-w-7xl mx-auto text-center">
          <div className="flex items-center justify-center space-x-2 mb-4">
            <FileText className="h-6 w-6 text-[#006D5B]" />
            <span className="text-xl font-bold">ZenTranscript</span>
          </div>
          <div className="flex justify-center space-x-6 mb-4">
            <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition-colors">Privacy Policy</Link>
            <Link to="/terms-of-service" className="text-gray-400 hover:text-white transition-colors">Terms of Service</Link>
          </div>
          <p className="text-gray-400">&copy; 2025 Zen Transcript. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default PrivacyPolicy;
