"use client";
import { motion } from "framer-motion";
import { FaShieldAlt, FaLock, FaUserShield, FaGlobe, FaMobileAlt, FaDatabase } from "react-icons/fa";

export default function PrivacyPolicy() {
  const sections = [
    {
      icon: <FaUserShield className="w-6 h-6" />,
      title: "1. Introduction",
      content: `AgroPeer ("we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our website and mobile application (collectively, the "Service"). By using our Service, you agree to the collection and use of information in accordance with this policy.`,
    },
    {
      icon: <FaDatabase className="w-6 h-6" />,
      title: "2. Information We Collect",
      content: `We collect several types of information from and about users of our Service:

2.1 Personal Information:
- Name, email address, phone number
- Profile information (bio, location, profile picture)
- Account credentials and authentication data
- Payment information (if applicable)

2.2 Location Data:
- GPS coordinates and location information
- IP address and approximate location
- Location-based preferences for weather and market data

2.3 Usage Information:
- Posts, comments, reviews, and other content you create
- Crop data, farming information, and field details
- Search queries and browsing history
- Interactions with other users (likes, comments, shares)

2.4 Device Information:
- Device type, operating system, and version
- Mobile device identifiers (IMEI, Android ID)
- Push notification tokens (FCM tokens)
- App version and installation information

2.5 Technical Information:
- Log files and analytics data
- Cookies and similar tracking technologies
- Network information and connection data`,
    },
    {
      icon: <FaGlobe className="w-6 h-6" />,
      title: "3. How We Use Your Information",
      content: `We use the collected information for the following purposes:

3.1 Service Provision:
- To provide, maintain, and improve our Service
- To personalize your experience and deliver relevant content
- To process transactions and manage your account
- To provide weather forecasts, market prices, and farming recommendations

3.2 Communication:
- To send you notifications, updates, and important information
- To respond to your inquiries and provide customer support
- To send marketing communications (with your consent)

3.3 Analytics and Improvement:
- To analyze usage patterns and improve our Service
- To conduct research and develop new features
- To detect, prevent, and address technical issues

3.4 Legal Compliance:
- To comply with legal obligations
- To enforce our Terms of Service
- To protect our rights and prevent fraud`,
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: "4. Information Sharing and Disclosure",
      content: `We do not sell your personal information. We may share your information in the following circumstances:

4.1 Service Providers:
- Third-party service providers who perform services on our behalf (hosting, analytics, payment processing)
- These providers are contractually obligated to protect your information

4.2 Business Transfers:
- In connection with any merger, sale, or acquisition of our business

4.3 Legal Requirements:
- When required by law or to respond to legal process
- To protect our rights, property, or safety, or that of our users

4.4 With Your Consent:
- We may share information with your explicit consent

4.5 Public Information:
- Information you choose to make public (posts, reviews, profile information) is visible to other users`,
    },
    {
      icon: <FaLock className="w-6 h-6" />,
      title: "5. Data Security",
      content: `We implement appropriate technical and organizational security measures to protect your personal information:

- Encryption of data in transit and at rest
- Secure authentication and access controls
- Regular security assessments and updates
- Limited access to personal information on a need-to-know basis

However, no method of transmission over the Internet or electronic storage is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.`,
    },
    {
      icon: <FaMobileAlt className="w-6 h-6" />,
      title: "6. Mobile Application Specific Information",
      content: `Our Android application may collect and use additional information:

6.1 Device Permissions:
- Location Services: To provide location-based weather and market data
- Camera/Photos: To upload images in posts and profile pictures
- Storage: To cache data for offline access
- Notifications: To send push notifications about important updates

6.2 Offline Functionality:
- Some data may be stored locally on your device for offline access
- This data is encrypted and protected by device security measures

6.3 Third-Party Services:
- Google Play Services for authentication and analytics
- Firebase Cloud Messaging (FCM) for push notifications
- Location services provided by your device's operating system`,
    },
    {
      title: "7. Cookies and Tracking Technologies",
      content: `We use cookies and similar tracking technologies to track activity on our Service:

- Essential Cookies: Required for the Service to function properly
- Analytics Cookies: Help us understand how users interact with our Service
- Preference Cookies: Remember your settings and preferences

You can control cookies through your browser settings, but disabling cookies may affect Service functionality.`,
    },
    {
      title: "8. Your Rights and Choices",
      content: `Depending on your location, you may have the following rights:

8.1 Access and Portability:
- Request access to your personal information
- Receive a copy of your data in a portable format

8.2 Correction and Deletion:
- Request correction of inaccurate information
- Request deletion of your personal information

8.3 Opt-Out:
- Opt-out of marketing communications
- Disable location tracking (may affect Service features)
- Disable push notifications through device settings

8.4 Account Management:
- Update your profile information through account settings
- Delete your account and associated data

To exercise these rights, contact us at admin@agropeer.com or through the contact information provided below.`,
    },
    {
      title: "9. Data Retention",
      content: `We retain your personal information for as long as necessary to:
- Provide our Service to you
- Comply with legal obligations
- Resolve disputes and enforce agreements

When you delete your account, we will delete or anonymize your personal information, except where we are required to retain it for legal purposes.`,
    },
    {
      title: "10. Children's Privacy",
      content: `Our Service is not intended for children under the age of 13 (or the minimum age in your jurisdiction). We do not knowingly collect personal information from children. If you believe we have collected information from a child, please contact us immediately.`,
    },
    {
      title: "11. International Data Transfers",
      content: `Your information may be transferred to and processed in countries other than your country of residence. These countries may have different data protection laws. We ensure appropriate safeguards are in place to protect your information in accordance with this Privacy Policy.`,
    },
    {
      title: "12. Third-Party Links",
      content: `Our Service may contain links to third-party websites or services. We are not responsible for the privacy practices of these third parties. We encourage you to read their privacy policies.`,
    },
    {
      title: "13. Changes to This Privacy Policy",
      content: `We may update this Privacy Policy from time to time. We will notify you of any changes by:
- Posting the new Privacy Policy on this page
- Updating the "Last Updated" date
- Sending you an email notification (for material changes)
- Displaying a notice in our Service

Your continued use of the Service after changes become effective constitutes acceptance of the updated Privacy Policy.`,
    },
    {
      title: "14. Contact Us",
      content: `If you have questions about this Privacy Policy or our privacy practices, please contact us:

Email: admin@agropeer.com
Address: [Your Company Address]
Phone: +1 (555) 123-4567

For users in the European Union, you also have the right to lodge a complaint with your local data protection authority.`,
    },
  ];

  return (
    <div className="min-h-[calc(100vh-122px)]">
      <div className="container mx-auto px-4 py-12 md:px-6 max-w-4xl">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-gradient-to-r from-farm-500 to-farm-600 rounded-2xl flex items-center justify-center shadow-lg">
              <FaShieldAlt className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-farm-900 mb-4 dark:text-white">
            Privacy Policy
          </h1>
          <p className="text-farm-700 text-lg dark:text-gray-300">
            Last Updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
          <p className="text-farm-600 mt-2 dark:text-gray-400">
            Your privacy is important to us. Please read this policy carefully.
          </p>
        </motion.div>

        {/* Content */}
        <div className="space-y-6">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
              className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-farm-200 dark:bg-[#272727] dark:border-white/20"
            >
              <div className="flex items-start gap-4 mb-4">
                {section.icon && (
                  <div className="text-farm-600 flex-shrink-0 mt-1">
                    {section.icon}
                  </div>
                )}
                <h2 className="text-2xl font-bold text-farm-900 dark:text-white">
                  {section.title}
                </h2>
              </div>
              <div className="text-farm-700 leading-relaxed whitespace-pre-line dark:text-gray-300">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 p-6 bg-farm-100 rounded-xl border border-farm-200 text-center dark:bg-[#1E1E1E] dark:border-white/20"
        >
          <p className="text-sm text-farm-700 dark:text-gray-400">
            By using AgroPeer, you acknowledge that you have read and understood this Privacy Policy.
            If you do not agree with this policy, please do not use our Service.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
