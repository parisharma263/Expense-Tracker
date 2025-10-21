import { useState, useContext } from "react";
import { SIDE_MENU_DATA } from "../../utils/data";
import { UserContext } from "../../context/userContext";
import { useNavigate } from "react-router-dom";
import CharAvatar from "../Cards/CharAvatar";
import Modal from "../Modal";
import ConfirmAlert from "../ConfirmAlert";

const SideMenu = (props) => {
    const { activeMenu } = props;

    const { user, clearUser } = useContext(UserContext);
    const navigate = useNavigate();

    const handleClick = (route) => {
        if (route === "/logout") {
            setOpenLogoutModal(true);
            return;
        }
        navigate(route);
    }

    const handleLogout = () => {
        localStorage.removeItem("token");
        clearUser();
        navigate("/login");
    }

    const [openLogoutModal, setOpenLogoutModal] = useState(false);

    return (
        <>
            <div className="w-64 h-[calc(100vh-61px)] bg-white border-r border-gray-200/50 p-5 sticky top-[61px] z-20">
                <div className="flex flex-col items-center justify-center gap-3 mt-3 mb-7">
                    {user?.profileImageUrl ? (
                        <img
                            src={user?.profileImageUrl}
                            alt="Profile"
                            className="w-20 h-20 bg-state-400 rounded-full"
                        />) : (
                        <CharAvatar
                            fullName={user?.fullName}
                            width="w-20"
                            height="h-20"
                            style="text-xl"
                        />
                    )}
                    <h5 className="text-gray-950 font-medium leading-6">
                        {user?.fullName || ""}
                    </h5>
                </div>

                {SIDE_MENU_DATA.map((item, index) => (
                    <button
                        key={`menu_${index}`}
                        onClick={() => handleClick(item.path)}
                        className={
                            `w-full flex items-center gap-4 text-[15px]
                        ${activeMenu === item.label ? "text-white bg-primary " : ""}
                        hover:${activeMenu !== item.label ? "bg-purple-50 hover:text-purple-500" : ""}
                        py-3 px-6 rounded-lg mb-3 cursor-pointer`
                        }
                    >
                        <item.icon className="text-xl" />
                        {item.label}
                    </button>
                ))}
            </div >
            <Modal
                isOpen={openLogoutModal}
                onClose={() => setOpenLogoutModal(false)}
                title="Logout"
            >
                <ConfirmAlert
                    content="Are you sure you want to logout?"
                    onConfirm={handleLogout}
                    confirmContent="Logout"
                    color="error"
                />
            </Modal>
        </>
    )
};

export default SideMenu;