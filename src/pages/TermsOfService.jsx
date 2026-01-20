import React from 'react';
import { FileText, ArrowLeft } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const TermsOfService = () => {
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
          <h1 className="text-4xl font-bold text-gray-900 mb-2">Terms of Service</h1>
          <p className="text-gray-500 mb-8">Effective Date: June 2025</p>

          <div className="prose prose-gray max-w-none">
            {/* Introduction */}
            <section className="mb-8">
              <p className="text-gray-600">
                Welcome to Zen Transcript ("Zen Transcript," "we," "us," or "our"). These Terms of Service ("Terms") govern your access to and use of our website (the "Site"), mobile applications (the "Apps"), and all related services, including AI-powered audio and video transcription, captioning, summarization, and related features (collectively, the "Services"). By accessing or using the Services, you agree to be bound by these Terms, our <Link to="/privacy-policy" className="text-[#006D5B] hover:text-purple-700">Privacy Policy</Link>, and any additional terms referenced herein. If you do not agree, you must not use the Services.
              </p>
            </section>

            {/* Section 1 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">1. Eligibility</h2>
              <p className="text-gray-600">
                You must be at least 18 years old or the age of majority in your jurisdiction to use the Services. By using the Services, you represent that you meet these requirements and have the authority to bind any entity on whose behalf you use the Services.
              </p>
            </section>

            {/* Section 2 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">2. Accounts and Registration</h2>
              <p className="text-gray-600">
                To access certain features, you must create an account ("Account") by providing accurate information. You are responsible for maintaining the confidentiality of your Account credentials and for all activities under your Account. Notify us immediately at <a href="mailto:support@zentranscript.com" className="text-[#006D5B] hover:text-purple-700">support@zentranscript.com</a> of any unauthorized use. We reserve the right to suspend or terminate Accounts for violations of these Terms.
              </p>
            </section>

            {/* Section 3 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">3. Description of Services</h2>
              <p className="text-gray-600 mb-4">
                Zen Transcript provides AI-driven tools for transcribing audio and video files into text, generating captions, summaries, and other derivative works. You may upload content ("Your Content") via the Site, Apps, or integrations (e.g., Zoom, Google Meet). Services may include automated speech recognition (ASR), human review options, and hosting of transcripts.
              </p>
              <p className="text-gray-600">
                We process Your Content using proprietary AI models. Transcripts are generated based on the provided audio/video quality, accents, background noise, and other factors. We strive for high accuracy but make no guarantees of perfection.
              </p>
            </section>

            {/* Section 4 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">4. User Content and Licenses</h2>

              <h3 className="text-xl font-medium text-gray-800 mb-3">4.1 Your Content</h3>
              <p className="text-gray-600 mb-4">
                You retain ownership of Your Content, including any copyrights, trademarks, or other intellectual property rights. By uploading Your Content, you represent and warrant that:
              </p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li>You have all necessary rights, consents, and permissions (including from third parties featured in the content) to upload and process it.</li>
                <li>It does not violate laws, third-party rights (e.g., privacy, publicity), or these Terms.</li>
                <li>It is not harmful, defamatory, obscene, or otherwise objectionable.</li>
              </ul>
              <p className="text-gray-600 mb-6">
                You grant Zen Transcript a worldwide, non-exclusive, royalty-free, sublicensable, and transferable license to use, reproduce, modify, distribute, and process Your Content solely to provide the Services (e.g., generating transcripts, storing temporarily for processing). This license ends when Your Content is deleted from our systems.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">4.2 Our Content</h3>
              <p className="text-gray-600">
                We own all rights to the Services, Site, Apps, AI models, and any output formats (excluding Your Content). You receive no ownership interest in transcripts or summaries ("Work Product"). Subject to these Terms, we grant you a limited, non-exclusive, revocable license to access and use Work Product for your personal or internal business purposes.
              </p>
            </section>

            {/* Section 5 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">5. Prohibited Uses</h2>
              <p className="text-gray-600 mb-4">You agree not to:</p>
              <ul className="list-disc list-inside text-gray-600 mb-4 space-y-2">
                <li>Upload illegal, harmful, or infringing content.</li>
                <li>Use the Services for commercial purposes without prior written approval (e.g., reselling transcripts).</li>
                <li>Reverse engineer, scrape, or interfere with the Services.</li>
                <li>Impersonate others or violate privacy laws (e.g., GDPR, CCPA).</li>
                <li>Use the Services in ways that could damage our systems or expose us to liability.</li>
              </ul>
              <p className="text-gray-600">
                We may remove violating content without notice and terminate your access.
              </p>
            </section>

            {/* Section 6 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">6. Payments and Subscriptions</h2>
              <p className="text-gray-600">
                Services are offered on a subscription basis (e.g., monthly/annual plans) or pay-per-use. Payments are processed via third-party providers (e.g., Stripe). Subscriptions auto-renew unless canceled. Late payments may incur fees; unpaid accounts may be suspended. Fees are non-refundable except as required by law. We may update pricing with 30 days' notice. Taxes are your responsibility.
              </p>
            </section>

            {/* Section 7 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">7. Confidentiality and Data Privacy</h2>
              <p className="text-gray-600 mb-4">
                Your Content may contain sensitive information. We treat it as confidential and do not use it to train AI models without explicit consent. All processing complies with our <Link to="/privacy-policy" className="text-[#006D5B] hover:text-purple-700">Privacy Policy</Link>, which details data collection, storage, and security. We use reasonable measures (e.g., encryption) to protect data but cannot guarantee absolute security.
              </p>
              <p className="text-gray-600 mb-4">
                Calls or support interactions may be recorded for quality assurance.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">7.1 Data Security</h3>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Files are stored securely on our servers and encrypted during transmission using 2048-bit encryption.</li>
                <li>Your personal data, including name, address, and payment information, may be processed in accordance with our Privacy Policy and submitted to credit reference agencies where required.</li>
              </ul>
            </section>

            {/* Section 8 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">8. Accuracy and Disclaimers</h2>
              <p className="text-gray-600">
                Transcripts may contain errors due to AI limitations (e.g., accents, noise). Always verify Work Product for critical uses. The Services are provided "AS IS" without warranties, express or implied, including merchantability, fitness for a particular purpose, or non-infringement. We do not warrant uninterrupted access or error-free operation.
              </p>
            </section>

            {/* Section 9 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">9. Limitation of Liability</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <p className="text-yellow-800 font-semibold">THE CUSTOMER'S ATTENTION IS PARTICULARLY DRAWN TO THIS CLAUSE</p>
              </div>

              <h3 className="text-xl font-medium text-gray-800 mb-3">9.1 Mandatory Liability</h3>
              <p className="text-gray-600 mb-4">Nothing in these Terms limits or excludes Zen Transcript's liability for:</p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Death or personal injury caused by negligence.</li>
                <li>Fraud or fraudulent misrepresentation.</li>
                <li>Breach of terms implied by applicable law which cannot be limited.</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">9.2 Excluded Liability</h3>
              <p className="text-gray-600 mb-4">Subject to clause 9.1, Zen Transcript shall not be liable for:</p>
              <ul className="list-disc list-inside text-gray-600 mb-6 space-y-2">
                <li>Loss of profits, sales, or business;</li>
                <li>Loss of agreements or contracts;</li>
                <li>Loss of anticipated savings or goodwill;</li>
                <li>Loss of use or corruption of software, data, or information;</li>
                <li>Any indirect or consequential loss.</li>
              </ul>

              <h3 className="text-xl font-medium text-gray-800 mb-3">9.3 Total Liability</h3>
              <p className="text-gray-600 mb-6">
                Subject to clauses 9.1 and 9.2, total liability is limited to fees paid by the Customer in the prior 12 months.
              </p>

              <h3 className="text-xl font-medium text-gray-800 mb-3">9.4 Customer Remedies</h3>
              <p className="text-gray-600">
                If the Customer is dissatisfied with the Work, the sole remedy is correction of errors or termination of the Agreement without payment for such work.
              </p>
            </section>

            {/* Section 10 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">10. Termination</h2>
              <p className="text-gray-600">
                Either party may terminate with 30 days' written notice under certain circumstances, including non-payment, material breach, insolvency, or cessation of business. On termination, outstanding invoices are payable immediately. Certain clauses survive termination, including intellectual property rights, confidentiality, limitation of liability, and governing law.
              </p>
            </section>

            {/* Section 11 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">11. Force Majeure</h2>
              <p className="text-gray-600">
                Zen Transcript is not liable for delays caused by events beyond reasonable control (natural disasters, pandemics, war, government action, strikes, etc.). Performance is extended for the duration of the event. If a force majeure event continues for more than 6 months, either party may terminate with 30 days' notice.
              </p>
            </section>

            {/* Section 12 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">12. Changes, Waiver, and Severability</h2>
              <p className="text-gray-600">
                Zen Transcript reserves the right to modify these Terms at any time. Failure to exercise a right is not a waiver. Invalid provisions will be modified or removed without affecting the remainder of the Terms.
              </p>
            </section>

            {/* Section 13 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">13. Governing Law and Dispute Resolution</h2>
              <p className="text-gray-600">
                These Terms are governed by the laws of USA. Disputes shall be resolved through binding arbitration or in courts of competent jurisdiction.
              </p>
            </section>

            {/* Section 14 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">14. Entire Agreement</h2>
              <p className="text-gray-600">
                These Terms constitute the entire agreement between you and Zen Transcript and supersede all prior agreements regarding the subject matter.
              </p>
            </section>

            {/* Section 15 */}
            <section className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">15. Contact</h2>
              <p className="text-gray-600">
                Questions? Email <a href="mailto:support@zentranscript.com" className="text-[#006D5B] hover:text-purple-700">support@zentranscript.com</a>
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

export default TermsOfService;
