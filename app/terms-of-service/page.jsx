"use client";
import { motion } from "framer-motion";
import { FaGavel, FaUserCheck, FaBan, FaExclamationTriangle, FaBalanceScale, FaFileContract } from "react-icons/fa";

export default function TermsOfService() {
  const sections = [
    {
      icon: <FaFileContract className="w-6 h-6" />,
      title: "1. Acceptance of Terms",
      content: `By accessing or using AgroPeer ("the Service"), you agree to be bound by these Terms of Service ("Terms"). If you disagree with any part of these Terms, you may not access the Service.

These Terms apply to all users of the Service, including without limitation users who are browsers, vendors, customers, merchants, and contributors of content.

We reserve the right to update, change, or replace any part of these Terms at any time. It is your responsibility to check this page periodically for changes. Your continued use of the Service following the posting of any changes constitutes acceptance of those changes.`,
    },
    {
      icon: <FaUserCheck className="w-6 h-6" />,
      title: "2. User Accounts and Registration",
      content: `2.1 Account Creation:
- You must provide accurate, current, and complete information during registration
- You are responsible for maintaining the confidentiality of your account credentials
- You are responsible for all activities that occur under your account
- You must notify us immediately of any unauthorized use of your account

2.2 Account Eligibility:
- You must be at least 13 years old (or the minimum age in your jurisdiction) to use the Service
- You must have the legal capacity to enter into these Terms
- You may not create multiple accounts or transfer your account to another person

2.3 Account Termination:
- You may delete your account at any time through account settings
- We reserve the right to suspend or terminate accounts that violate these Terms
- Upon termination, your right to use the Service will immediately cease`,
    },
    {
      title: "3. User Responsibilities and Conduct",
      content: `3.1 Acceptable Use:
You agree to use the Service only for lawful purposes and in accordance with these Terms. You agree NOT to:

- Post false, misleading, or fraudulent information
- Harass, abuse, or harm other users
- Violate any applicable laws or regulations
- Infringe upon intellectual property rights
- Transmit viruses, malware, or harmful code
- Attempt to gain unauthorized access to the Service
- Interfere with or disrupt the Service or servers
- Use automated systems to access the Service without permission
- Collect or harvest information about other users without consent
- Impersonate any person or entity

3.2 Content Standards:
All content you post must:
- Be accurate and truthful
- Not violate any third-party rights
- Not contain illegal, harmful, or offensive material
- Comply with community guidelines and applicable laws`,
    },
    {
      icon: <FaBan className="w-6 h-6" />,
      title: "4. Prohibited Activities",
      content: `You are expressly prohibited from:

4.1 Commercial Activities:
- Using the Service for unauthorized commercial purposes
- Selling or reselling access to the Service
- Using the Service to compete with AgroPeer

4.2 Fraudulent Activities:
- Creating fake reviews or ratings
- Manipulating market prices or data
- Engaging in fraudulent transactions
- Misrepresenting your identity or qualifications

4.3 Harmful Activities:
- Posting content that promotes illegal activities
- Sharing false agricultural advice that could cause harm
- Distributing spam or unsolicited communications
- Engaging in any activity that could damage the Service or other users`,
    },
    {
      title: "5. Intellectual Property Rights",
      content: `5.1 Our Intellectual Property:
- The Service and its original content, features, and functionality are owned by AgroPeer
- Our trademarks, logos, and brand names are our property
- You may not use our intellectual property without our written permission

5.2 Your Content:
- You retain ownership of content you post on the Service
- By posting content, you grant us a worldwide, non-exclusive, royalty-free license to use, reproduce, modify, and distribute your content
- This license allows us to operate, promote, and improve the Service
- You represent that you have the right to grant this license

5.3 Third-Party Content:
- The Service may contain content from third parties
- We are not responsible for third-party content
- You may not use third-party content without permission from the owner`,
    },
    {
      title: "6. Service Availability and Modifications",
      content: `6.1 Service Availability:
- We strive to provide continuous access to the Service but do not guarantee uninterrupted availability
- The Service may be unavailable due to maintenance, updates, or technical issues
- We are not liable for any loss or damage resulting from Service unavailability

6.2 Service Modifications:
- We reserve the right to modify, suspend, or discontinue any part of the Service at any time
- We may add, remove, or change features without prior notice
- We are not obligated to maintain or support any specific feature

6.3 Updates:
- We may release updates to the Service, including mobile applications
- You are responsible for installing updates to ensure optimal functionality
- Some updates may be mandatory for continued use of the Service`,
    },
    {
      icon: <FaExclamationTriangle className="w-6 h-6" />,
      title: "7. Disclaimers and Limitations of Liability",
      content: `7.1 Service Disclaimer:
THE SERVICE IS PROVIDED "AS IS" AND "AS AVAILABLE" WITHOUT WARRANTIES OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO:
- Accuracy of agricultural advice, market prices, or weather forecasts
- Fitness for a particular purpose
- Non-infringement of third-party rights

7.2 Agricultural Information:
- Agricultural advice, market prices, and weather forecasts are provided for informational purposes only
- We do not guarantee the accuracy, completeness, or reliability of such information
- You should verify information independently before making farming decisions
- We are not liable for any losses resulting from reliance on information provided through the Service

7.3 Limitation of Liability:
TO THE MAXIMUM EXTENT PERMITTED BY LAW, AGROPEER SHALL NOT BE LIABLE FOR:
- Indirect, incidental, special, consequential, or punitive damages
- Loss of profits, data, or business opportunities
- Personal injury or property damage
- Any damages exceeding the amount you paid to us in the past 12 months

7.4 Third-Party Services:
- The Service may integrate with third-party services
- We are not responsible for third-party services or their availability
- Your use of third-party services is subject to their terms and conditions`,
    },
    {
      title: "8. Marketplace and Transactions",
      content: `8.1 Marketplace Services:
- AgroPeer provides a platform for users to buy and sell agricultural products
- We are not a party to transactions between users
- We do not guarantee the quality, safety, or legality of products listed

8.2 User Responsibilities:
- Buyers and sellers are responsible for their own transactions
- You must comply with all applicable laws and regulations
- You are responsible for payment, delivery, and dispute resolution

8.3 Disputes:
- We are not responsible for resolving disputes between users
- Users should resolve disputes directly or through appropriate legal channels
- We may, at our discretion, assist in dispute resolution but are not obligated to do so`,
    },
    {
      title: "9. Indemnification",
      content: `You agree to indemnify, defend, and hold harmless AgroPeer, its officers, directors, employees, and agents from and against any claims, damages, obligations, losses, liabilities, costs, or debt arising from:
- Your use of the Service
- Your violation of these Terms
- Your violation of any third-party rights
- Any content you post on the Service`,
    },
    {
      icon: <FaBalanceScale className="w-6 h-6" />,
      title: "10. Governing Law and Dispute Resolution",
      content: `10.1 Governing Law:
These Terms shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions.

10.2 Dispute Resolution:
- Any disputes arising from these Terms or the Service shall first be attempted to be resolved through good faith negotiations
- If negotiations fail, disputes shall be resolved through binding arbitration in accordance with Indian Arbitration and Conciliation Act
- The arbitration shall be conducted in [Your City], India
- You waive any right to a jury trial or to participate in a class-action lawsuit

10.3 Jurisdiction:
For matters not subject to arbitration, you agree to submit to the exclusive jurisdiction of the courts located in [Your City], India.`,
    },
    {
      title: "11. Privacy",
      content: `Your use of the Service is also governed by our Privacy Policy. Please review our Privacy Policy to understand how we collect, use, and protect your information.`,
    },
    {
      title: "12. Severability",
      content: `If any provision of these Terms is found to be unenforceable or invalid, that provision shall be limited or eliminated to the minimum extent necessary, and the remaining provisions shall remain in full force and effect.`,
    },
    {
      title: "13. Entire Agreement",
      content: `These Terms, together with our Privacy Policy, constitute the entire agreement between you and AgroPeer regarding the use of the Service and supersede all prior agreements and understandings.`,
    },
    {
      icon: <FaGavel className="w-6 h-6" />,
      title: "14. Contact Information",
      content: `If you have any questions about these Terms of Service, please contact us:

Email: admin@agropeer.com
Address: [Your Company Address]
Phone: +1 (555) 123-4567

We will respond to your inquiries within a reasonable timeframe.`,
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
              <FaGavel className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-farm-900 mb-4 dark:text-white">
            Terms of Service
          </h1>
          <p className="text-farm-700 text-lg dark:text-gray-300">
            Last Updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
          <p className="text-farm-600 mt-2 dark:text-gray-400">
            Please read these terms carefully before using our Service.
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
            By using AgroPeer, you acknowledge that you have read, understood, and agree to be bound by these Terms of Service.
            If you do not agree with these Terms, please do not use our Service.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
