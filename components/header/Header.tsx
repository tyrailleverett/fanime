import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import HeaderMenu from "./HeaderMenu";
import HeaderSearch from "./HeaderSearch";

const Header = () => {
    const [searchTerm, setSearchTerm] = useState("");
    const router = useRouter();

    const searchAnime = () => {
        router.push({
            pathname: "/animesearch",
            query: { search: searchTerm }
        });
        setSearchTerm("");
    };

    return (
        <div className="grid my-10 place-items-center md:grid-cols-3">
            <Link href={"/"}>
                <h1 className="order-first mb-6 text-4xl font-bold uppercase md:mb-0 hover:cursor-pointer hover:underline">
                    Fanime
                </h1>
            </Link>
            <HeaderSearch
                searchAnime={searchAnime}
                setSearchTerm={setSearchTerm}
                searchTerm={searchTerm}
            />
            <HeaderMenu />
        </div>
    );
};

export default Header;
