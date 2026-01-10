import { FaSignOutAlt } from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";

export default function LogoutButton({ onClick }) {
    const { t } = useLanguage();
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-medium"
        >
            <FaSignOutAlt className="text-lg" />
            {t("logout_button")}
        </button>
    )

}