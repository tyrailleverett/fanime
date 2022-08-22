import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useState } from "react";
import {
    FaCog,
    FaEye,
    FaSignInAlt,
    FaSignOutAlt,
    FaUserCircle
} from "react-icons/fa";

const HeaderMenu = () => {
    const { data: session } = useSession();
    const router = useRouter();

    const [showDropdown, setShowDropdown] = useState(false);

    const handleClick = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <div
            onClick={handleClick}
            className="order-2 mb-5 md:my-0 md:order5 dropdown ">
            <label tabIndex={0}>
                <FaUserCircle className="text-4xl rounded-full hover:cursor-pointer hover:ring-2" />
            </label>

            {showDropdown && (
                <ul
                    tabIndex={0}
                    className="flex p-2 border shadow w:40 md:w-56 dropdown-content menu bg-base-300 rounded-box">
                    {session ? (
                        <li
                            className="order-last"
                            onClick={() =>
                                signOut({
                                    redirect: true,
                                    callbackUrl: "/signin"
                                })
                            }>
                            <p className="p-2 ">
                                <FaSignOutAlt /> Sign out
                            </p>
                        </li>
                    ) : (
                        <li className="" onClick={() => router.push("/signin")}>
                            <p className="p-2">
                                <FaSignInAlt /> Sign In
                            </p>
                        </li>
                    )}
                    {!session && <div className="p-0 m-0 divider"></div>}
                    <li onClick={() => router.push("/user/userwatchlist")}>
                        <p className="p-2">
                            <FaEye />
                            View Watched Anime
                        </p>
                    </li>
                    <div className="p-0 m-0 divider"></div>
                    <li onClick={() => router.push("/user/userprofile")}>
                        <p className="p-2">
                            <FaCog />
                            Settings
                        </p>
                    </li>
                    {session && <div className="p-0 m-0 divider"></div>}
                </ul>
            )}
        </div>
    );
};

export default HeaderMenu;
