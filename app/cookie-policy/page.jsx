"use client";
import { motion } from "framer-motion";
import { FaCookie, FaShieldAlt, FaCog, FaChartLine, FaUsers, FaMobileAlt, FaTrash } from "react-icons/fa";

export default function CookiePolicy() {
  const cookieTypes = [
    {
      category: "Essential Cookies",
      icon: <FaShieldAlt className="w-5 h-5" />,
      color: "from-green-500 to-green-600",
      description: "These cookies are necessary for the Service to function and cannot be switched off.",
      cookies: [
        {
          name: "sb-* (Supabase Session)",
          purpose: "Authentication and session management",
          duration: "Session / Persistent",
          type: "First-party"
        },
        {
          name: "theme",
          purpose: "Stores your theme preference (light/dark mode)",
          duration: "1 year",
          type: "First-party"
        },
        {
          name: "locale",
          purpose: "Stores your language preference",
          duration: "1 year",
          type: "First-party"
        }
      ]
    },
    {
      category: "Functional Cookies",
      icon: <FaCog className="w-5 h-5" />,
      color: "from-blue-500 to-blue-600",
      description: "These cookies enable enhanced functionality and personalization.",
      cookies: [
        {
          name: "user_preferences",
          purpose: "Stores user preferences and settings",
          duration: "1 year",
          type: "First-party"
        },
        {
          name: "last_visited",
          purpose: "Remembers your last visited pages for better navigation",
          duration: "30 days",
          type: "First-party"
        }
      ]
    },
    {
      category: "Analytics Cookies",
      icon: <FaChartLine className="w-5 h-5" />,
      color: "from-purple-500 to-purple-600",
      description: "These cookies help us understand how visitors interact with our Service.",
      cookies: [
        {
          name: "_ga, _gid (Google Analytics)",
          purpose: "Distinguishes users and tracks page views",
          duration: "2 years / 24 hours",
          type: "Third-party"
        },
        {
          name: "analytics_session",
          purpose: "Tracks user session for analytics purposes",
          duration: "30 minutes",
          type: "First-party"
        }
      ]
    },
    {
      category: "Performance Cookies",
      icon: <FaUsers className="w-5 h-5" />,
      color: "from-orange-500 to-orange-600",
      description: "These cookies help us improve the performance of our Service.",
      cookies: [
        {
          name: "performance_metrics",
          purpose: "Collects performance data to optimize Service speed",
          duration: "7 days",
          type: "First-party"
        }
      ]
    }
  ];

  const sections = [
    {
      icon: <FaCookie className="w-6 h-6" />,
      title: "1. What Are Cookies?",
      content: `Cookies are small text files that are placed on your device (computer, tablet, or mobile phone) when you visit a website or use a mobile application. They are widely used to make websites and apps work more efficiently and provide information to the owners of the site or app.

Cookies allow a website or app to remember your actions and preferences (such as login information, language, font size, and other display preferences) over a period of time, so you don't have to keep re-entering them whenever you come back to the site or browse from one page to another.

Types of Cookies:
- Session Cookies: Temporary cookies that are deleted when you close your browser
- Persistent Cookies: Remain on your device for a set period or until you delete them
- First-Party Cookies: Set by the website or app you are visiting
- Third-Party Cookies: Set by domains other than the one you are visiting`,
    },
    {
      icon: <FaShieldAlt className="w-6 h-6" />,
      title: "2. How We Use Cookies",
      content: `AgroPeer uses cookies and similar tracking technologies to:

2.1 Essential Functions:
- Authenticate users and maintain secure sessions
- Remember your login status and preferences
- Ensure the Service functions correctly and securely

2.2 Personalization:
- Remember your language and theme preferences
- Customize content based on your location and interests
- Provide personalized farming recommendations

2.3 Analytics and Improvement:
- Understand how users interact with our Service
- Analyze usage patterns and identify areas for improvement
- Measure the effectiveness of our features and content

2.4 Performance:
- Monitor and improve Service performance
- Optimize loading times and user experience
- Identify and fix technical issues`,
    },
    {
      title: "3. Types of Cookies We Use",
      content: `We use the following categories of cookies on our Service:`,
    },
    {
      icon: <FaMobileAlt className="w-6 h-6" />,
      title: "4. Cookies in Our Mobile Application",
      content: `Our Android mobile application may use similar technologies to cookies:

4.1 Local Storage:
- We use local storage to cache data for offline access
- Store user preferences and settings
- Remember authentication tokens securely

4.2 Device Identifiers:
- Device identifiers may be used for analytics and security
- These are not shared with third parties without your consent
- You can reset device identifiers through your device settings

4.3 Push Notification Tokens:
- FCM (Firebase Cloud Messaging) tokens for push notifications
- These are stored securely and used only for notification delivery
- You can disable push notifications through app settings`,
    },
    {
      title: "5. Third-Party Cookies",
      content: `Some cookies on our Service are set by third-party services:

5.1 Analytics Services:
- Google Analytics: Helps us understand user behavior and improve our Service
- These services may set their own cookies

5.2 Authentication Services:
- Supabase: Provides authentication and database services
- May set session cookies for secure authentication

5.3 Social Media Integration:
- If we integrate social media features, those platforms may set cookies
- These are governed by the respective platform's privacy policies

5.4 Third-Party Privacy Policies:
- Google Analytics: https://policies.google.com/privacy
- Supabase: https://supabase.com/privacy

We do not control these third-party cookies. Please review the privacy policies of these third parties for more information.`,
    },
    {
      icon: <FaTrash className="w-6 h-6" />,
      title: "6. Managing and Controlling Cookies",
      content: `You have the right to accept or reject cookies. Most web browsers automatically accept cookies, but you can usually modify your browser settings to decline cookies if you prefer.

6.1 Browser Settings:
You can control cookies through your browser settings:

- Chrome: Settings > Privacy and Security > Cookies and other site data
- Firefox: Options > Privacy & Security > Cookies and Site Data
- Safari: Preferences > Privacy > Cookies and website data
- Edge: Settings > Privacy, search, and services > Cookies and site permissions

6.2 Mobile App Settings:
- You can clear app data through your device settings
- Disable location services if you don't want location-based cookies
- Manage notification permissions through app settings

6.3 Opt-Out Tools:
- Google Analytics Opt-Out: https://tools.google.com/dlpage/gaoptout
- Network Advertising Initiative: http://www.networkadvertising.org/choices/
- Digital Advertising Alliance: http://www.aboutads.info/choices/

6.4 Impact of Disabling Cookies:
Please note that disabling cookies may:
- Prevent you from logging into your account
- Limit certain features and functionality
- Affect the personalization of your experience
- Impact the performance of the Service`,
    },
    {
      title: "7. Do Not Track Signals",
      content: `Some browsers include a "Do Not Track" (DNT) feature that signals to websites you visit that you do not want to have your online activity tracked. Currently, there is no standard for how DNT signals should be interpreted. As a result, our Service does not currently respond to DNT browser signals or mechanisms.

However, you can control cookies through your browser settings as described in Section 6.`,
    },
    {
      title: "8. Similar Technologies",
      content: `In addition to cookies, we may use other similar technologies:

8.1 Web Beacons/Pixel Tags:
- Small images embedded in emails or web pages
- Used to track email opens and page views

8.2 Local Storage:
- HTML5 local storage for storing larger amounts of data
- Used for caching and offline functionality

8.3 Session Storage:
- Temporary storage that lasts only for the browser session
- Used for temporary data during your visit

8.4 IndexedDB:
- Browser database for storing structured data
- Used for offline functionality and data caching`,
    },
    {
      title: "9. Cookie Consent",
      content: `9.1 Consent Mechanism:
When you first visit our Service, we may display a cookie consent banner that allows you to:
- Accept all cookies
- Reject non-essential cookies
- Customize your cookie preferences

9.2 Withdrawing Consent:
You can withdraw your consent at any time by:
- Adjusting your browser settings
- Using our cookie preference center (if available)
- Contacting us at admin@agropeer.com

9.3 Essential Cookies:
Essential cookies do not require your consent as they are necessary for the Service to function. However, you can still block them through your browser settings, though this may affect Service functionality.`,
    },
    {
      title: "10. Children and Cookies",
      content: `Our Service is not intended for children under the age of 13. We do not knowingly collect personal information from children through cookies or other tracking technologies. If you believe we have collected information from a child, please contact us immediately.`,
    },
    {
      title: "11. Updates to This Cookie Policy",
      content: `We may update this Cookie Policy from time to time to reflect:
- Changes in our use of cookies
- Legal or regulatory requirements
- Improvements to our Service

We will notify you of any material changes by:
- Posting the updated policy on this page
- Updating the "Last Updated" date
- Sending you an email notification (for significant changes)
- Displaying a notice in our Service

Your continued use of the Service after changes become effective constitutes acceptance of the updated Cookie Policy.`,
    },
    {
      title: "12. Contact Us",
      content: `If you have questions about our use of cookies or this Cookie Policy, please contact us:

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
              <FaCookie className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-bold text-farm-900 mb-4 dark:text-white">
        Cookie Policy
      </h1>
          <p className="text-farm-700 text-lg dark:text-gray-300">
            Last Updated: {new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
          </p>
          <p className="text-farm-600 mt-2 dark:text-gray-400">
            Learn how we use cookies and similar technologies on AgroPeer.
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

          {/* Cookie Types Table */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="bg-white rounded-2xl p-6 md:p-8 shadow-lg border border-farm-200 dark:bg-[#272727] dark:border-white/20"
          >
            <h2 className="text-2xl font-bold text-farm-900 mb-6 dark:text-white">
              Detailed Cookie Information
            </h2>
            <div className="space-y-6">
              {cookieTypes.map((type, index) => (
                <div key={index} className="border border-farm-200 rounded-xl p-6 dark:border-white/20">
                  <div className="flex items-center gap-3 mb-4">
                    <div className={`w-10 h-10 bg-gradient-to-r ${type.color} rounded-lg flex items-center justify-center text-white`}>
                      {type.icon}
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-farm-900 dark:text-white">
                        {type.category}
                      </h3>
                      <p className="text-sm text-farm-600 dark:text-gray-400">
                        {type.description}
                      </p>
                    </div>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-farm-200 dark:border-white/20">
                          <th className="text-left py-2 px-3 font-semibold text-farm-900 dark:text-white">Cookie Name</th>
                          <th className="text-left py-2 px-3 font-semibold text-farm-900 dark:text-white">Purpose</th>
                          <th className="text-left py-2 px-3 font-semibold text-farm-900 dark:text-white">Duration</th>
                          <th className="text-left py-2 px-3 font-semibold text-farm-900 dark:text-white">Type</th>
                        </tr>
                      </thead>
                      <tbody>
                        {type.cookies.map((cookie, cookieIndex) => (
                          <tr key={cookieIndex} className="border-b border-farm-100 dark:border-white/10">
                            <td className="py-2 px-3 text-farm-700 dark:text-gray-300 font-mono text-xs">{cookie.name}</td>
                            <td className="py-2 px-3 text-farm-700 dark:text-gray-300">{cookie.purpose}</td>
                            <td className="py-2 px-3 text-farm-700 dark:text-gray-300">{cookie.duration}</td>
                            <td className="py-2 px-3 text-farm-700 dark:text-gray-300">{cookie.type}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
          </div>
        ))}
            </div>
          </motion.div>
      </div>

        {/* Footer Note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="mt-12 p-6 bg-farm-100 rounded-xl border border-farm-200 text-center dark:bg-[#1E1E1E] dark:border-white/20"
        >
          <p className="text-sm text-farm-700 dark:text-gray-400">
            By using AgroPeer, you acknowledge that you have read and understood this Cookie Policy.
            You can manage your cookie preferences through your browser settings or by contacting us.
          </p>
        </motion.div>
      </div>
    </div>
  );
}
