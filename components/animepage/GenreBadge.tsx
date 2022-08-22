import { GenreBadgeProps } from "./animepage.types";

const GenreBadge = ({ name }: GenreBadgeProps) => {
    return <ul className="p-1 rounded-lg bg-base-200">{name}</ul>;
};

export default GenreBadge;
