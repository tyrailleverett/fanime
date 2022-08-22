import { useState } from "react";
import { SynopsisSectionProps } from "./animepage.types";

const SynopsisSection = ({ synopsis }: SynopsisSectionProps) => {
    const [showFullSynopsis, setShowFullSynopsis] = useState(false);

    return (
        <div className="p-4 my-4 rounded-md bg-base-300 md:p-8">
            <h2 className="text-lg underline">Synopsis</h2>
            <p
                className={`p-4 ${
                    showFullSynopsis ? "line-clamp-none" : "line-clamp-8"
                } `}>
                {synopsis}
            </p>
            <p
                onClick={() => setShowFullSynopsis(!showFullSynopsis)}
                className="flex justify-end pt-2 font-bold hover:underline hover:cursor-pointer">
                {showFullSynopsis ? "Show Less" : "Show More"}
            </p>
        </div>
    );
};

export default SynopsisSection;
