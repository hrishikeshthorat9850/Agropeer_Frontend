import {FaSignOutAlt} from "react-icons/fa";
export default function LogoutButton({onClick}){
    return(
        <button
            onClick={onClick}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition font-medium"
        >
            <FaSignOutAlt className="text-lg" />
            Logout
        </button>
    )

}