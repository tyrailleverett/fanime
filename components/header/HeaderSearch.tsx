import { FaSearch } from "react-icons/fa";
import { HeaderSearchProps } from "./header.types";

const HeaderSearch = ({
    setSearchTerm,
    searchAnime,
    searchTerm
}: HeaderSearchProps) => {
    return (
        <div className="order-4 w-4/5 md:order-2">
            <div className="form-control">
                <form onSubmit={searchAnime} className="input-group">
                    <input
                        type="text"
                        placeholder="Search for an Anime"
                        className="w-full input input-bordered focus:outline-none"
                        value={searchTerm}
                        required
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                        }}
                    />
                    <button type="submit" className="btn btn-square">
                        <FaSearch className=" hover:cursor-pointer" />
                    </button>
                </form>
            </div>
        </div>
    );
};

export default HeaderSearch;
