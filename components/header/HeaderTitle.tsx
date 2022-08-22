import { HeaderTitleProps } from "./header.types";

const HeaderTitle = ({ title }: HeaderTitleProps) => {
    return (
        <div className="my-10 text-3xl font-bold text-center md:my-20">
            {title}
        </div>
    );
};

export default HeaderTitle;
