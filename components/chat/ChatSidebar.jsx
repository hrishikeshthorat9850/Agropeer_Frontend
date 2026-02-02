import { motion, AnimatePresence } from "framer-motion";
import { FaSearch, FaTimes, FaComments } from "react-icons/fa";
import ContactRow from "./ContactRow";
import UnreadBadge from "./UnreadBadge";
import { useLanguage } from "@/Context/languagecontext";
import Link from "next/link";

export default function ChatSidebar({
  showContacts,
  handleFaTimesClick,
  contacts,
  onSelectUser,
  selected,
}) {
  const { t } = useLanguage();

  // useEffect(() => {
  //     if (showContacts) {
  //       document.documentElement.style.overflow = "hidden";
  //       document.body.style.overflow = "hidden";
  //       document.body.style.position = "fixed";
  //       document.body.style.width = "100%";
  //       document.body.style.touchAction = "none";
  //     } else {
  //       document.documentElement.style.overflow = "auto";
  //       document.body.style.overflow = "auto";
  //       document.body.style.position = "static";
  //       document.body.style.touchAction = "auto";
  //     }
  //
  //     return () => {
  //       document.documentElement.style.overflow = "auto";
  //       document.body.style.overflow = "auto";
  //       document.body.style.position = "static";
  //       document.body.style.touchAction = "auto";
  //     };
  //   }, [showContacts]);
  const isNative =
    typeof window !== "undefined"
      ? window.Capacitor?.isNativePlatform?.()
      : false;

  return (
    <AnimatePresence>
      {showContacts && (
        <motion.aside
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ type: "spring", stiffness: 80, damping: 15 }}
          className="fixed md:static inset-0 md:inset-auto bg-white dark:bg-neutral-900 border 
        dark:border-neutral-800 md:rounded-2xl p-4 z-10 w-full md:w-[340px] flex flex-col 
        shadow-lg md:h-full overflow-hidden"
          style={{
            top: "var(--mobile-navbar-height)",
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-4 flex-shrink-0">
            <div>
              <h1 className="font-bold text-xl text-sky-700 dark:text-sky-300">
                AgroPeer
              </h1>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {t("chats_sidebar_title")}
              </p>
            </div>

            <div className="flex gap-2">
              {/* Close button for mobile */}
              {/* If you want visible close button uncomment */}
              {/* <button
                onClick={handleFaTimesClick}
                className="md:hidden p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-800"
              >
                <FaTimes />
              </button> */}
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex items-center gap-2 bg-gray-50 dark:bg-neutral-800 rounded-lg px-3 py-2 border dark:border-neutral-700 flex-shrink-0">
            <FaSearch className="text-gray-400" />
            <input
              placeholder={t("search_chat_placeholder")}
              className="bg-transparent outline-none flex-1 text-sm text-gray-700 dark:text-gray-200"
            />
          </div>

          {/* Contact List or Empty State */}
          <div
            className="mt-4 flex-1 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-neutral-700"
            style={{
              paddingBottom: isNative
                ? "calc(100px + env(safe-area-inset-bottom, 0px))"
                : "0px",
            }}
          >
            {!contacts?.length ? (
              <div className="flex flex-col items-center justify-center py-10 px-4 text-center min-h-[200px]">
                <div className="w-14 h-14 rounded-full bg-sky-100 dark:bg-sky-900/40 flex items-center justify-center mb-4">
                  <FaComments className="w-7 h-7 text-sky-600 dark:text-sky-400" />
                </div>
                <h3 className="text-base font-medium text-gray-800 dark:text-gray-200 mb-1">
                  {t("chat_sidebar_no_contacts")}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-5 max-w-[260px]">
                  {t("chat_sidebar_no_contacts_hint")}
                </p>
                <Link
                  href="/market"
                  className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-sky-600 hover:bg-sky-700 text-white text-sm font-medium transition-colors"
                >
                  {t("chat_sidebar_browse_cta")}
                </Link>
              </div>
            ) : (
              contacts.map((c) => (
                <div key={c?.conversation_id || c?.id} className="relative">
                  <ContactRow
                    user={c}
                    active={
                      selected?.id === c?.id ||
                      selected?.conversation_id === c?.conversation_id
                    }
                    onClick={(contact) => {
                      if (onSelectUser) onSelectUser(contact);
                      handleFaTimesClick();
                    }}
                  />

                  {/* Unread badge */}
                  {c.unread_count > 0 && (
                    <div className="absolute right-4 bottom-2 flex justify-end">
                      <UnreadBadge count={c.unread_count} />
                    </div>
                  )}
                </div>
              ))
            )}
          </div>
        </motion.aside>
      )}
    </AnimatePresence>
  );
}
