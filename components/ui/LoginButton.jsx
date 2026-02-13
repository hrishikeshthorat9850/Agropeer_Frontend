import { FaSignInAlt } from "react-icons/fa";
import { useLanguage } from "@/Context/languagecontext";

export default function LoginButton({ onClick }) {
    const { t } = useLanguage();
    return (
        <button
            onClick={onClick}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-medium"
        >
            <FaSignInAlt className="text-lg" />
            Login
        </button>
    )

}