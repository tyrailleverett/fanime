import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import { ToastContainer } from "react-toastify";
import Header from "../header/Header";

const Layout = ({ children }: any) => {
    const { systemTheme } = useTheme();
    const router = useRouter();

    if (
        router.pathname.includes("/signin") ||
        router.pathname.includes("/signup")
    )
        return (
            <>
                <ToastContainer
                    toastStyle={{
                        width: "max-content",
                        background: systemTheme === "dark" ? "#161A1D" : "#fff",
                        border: "2px solid",
                        borderColor:
                            systemTheme === "dark" ? "#0d7377" : "#2195ed",
                        color: systemTheme === "dark" ? "#fff" : "#000"
                    }}
                    hideProgressBar={true}
                    autoClose={2000}
                    position="top-center"
                />
                {children}
            </>
        );

    return (
        <>
            <ToastContainer
                toastStyle={{
                    width: "max-content",
                    background: systemTheme === "dark" ? "#161A1D" : "#fff",
                    border: "2px solid",
                    borderColor: systemTheme === "dark" ? "#0d7377" : "#2195ed",
                    color: systemTheme === "dark" ? "#fff" : "#000"
                }}
                hideProgressBar={true}
                autoClose={2000}
                position="top-center"
            />
            <Header />
            {children}
        </>
    );
};

export default Layout;
