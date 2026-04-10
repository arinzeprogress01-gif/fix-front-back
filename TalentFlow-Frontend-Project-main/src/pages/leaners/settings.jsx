import { LuBell, LuLock, LuSave, LuUser } from "react-icons/lu";
import SideBar from "./components/sidebar";
import { Link } from "react-router-dom";

export default function ProfileSettings(){
    return(
        <>
            <SideBar title="Settings">
                <div className="w-full h-auto p-5 lg:p-10">
                    <h3 className="font-semibold text-2xl mt-3">Account Settings</h3>
                    <p className="text-sm mt-2 text-[#4A5C52]">Manage your profile and preferences</p>
                    <div className="p-5 border-1 w-full mt-5 rounded-xl bg-white border-[#D8D6EF]">
                        <div className="space-x-4 flex items-center">
                            <LuUser  className="text-[#1A7A4A] w-5 h-5"/>
                            <p className="text-[#1A1A1A] font-semibold ">Profile Information</p>
                        </div>
                        <form className="w-full mt-2 py-4">
                            <div className="flex flex-col mb-4">
                                <label htmlFor="" className="text-sm font-medium text-[#1A1A1A] mb-1.5">Full Name</label>
                                <input type="text" placeholder="Adeola Ogunleye" className="text-[#1A1A1A] text-[14px] w-full h-11 border-1 border-[#D8D6EF] px-3 rounded-md outline-[#1A7A4A]" />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="" className="text-sm font-medium text-[#1A1A1A] mb-1.5">Email Address</label>
                                <input type="email" placeholder="adeola@trueminds.com" className="text-[#1A1A1A] text-[14px] w-full h-11 border-1 border-[#D8D6EF] px-3 rounded-md outline-[#1A7A4A]" />
                            </div>
                        </form>
                    </div>
                    <div className="p-5 border-1 w-full mt-5 rounded-xl bg-white border-[#D8D6EF]">
                        <div className="space-x-4 flex items-center">
                            <LuBell  className="text-[#1A7A4A] w-5 h-5"/>
                            <p className="text-[#1A1A1A] font-semibold">Notifications</p>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col space-y-0.5 mt-4">
                                <h3 className="text-[#1A1A1A] font-semibold">Push Notifications</h3>
                                <p className="text-sm text-[#8A9E95]">Recieve notifications about course updates</p>
                            </div>
                            <input type="checkbox"  className="w-5 h-5 text-[#1A7A4A] border-[#D8E6DF] rounded focus:ring-[#1A7A4A]"/>
                        </div>
                        <div className="flex justify-between items-center">
                            <div className="flex flex-col space-y-0.5 mt-4">
                                <h3 className="text-[#1A1A1A] font-semibold">Email Updates</h3>
                                <p className="text-sm text-[#8A9E95]">Get weekly summaries via email</p>
                            </div>
                            <input type="checkbox"  className="w-5 h-5 text-[#1A7A4A] border-[#D8E6DF] rounded focus:ring-[#1A7A4A]"/>
                        </div>
                    </div>

                    <div className="p-5 border-1 w-full mt-5 rounded-xl bg-white border-[#D8D6EF]">
                        <div className="space-x-4 flex items-center">
                            <LuLock  className="text-[#1A7A4A] w-5 h-5"/>
                            <p className="text-[#1A1A1A] font-semibold">Security</p>
                        </div>
                        <button className=" border-2 mt-5 px-6 rounded-lg cursor-pointer py-2.5 text-[#4A5C52] border-[#D8E6DF] hover:border-[#1A7A4A] hover:outline-1 hover:outline-[#1A7A4A] hover:text-[#1A7A4A]">
                            <Link className="w-full">
                                Change Password
                            </Link>
                        </button>
                    </div>
                    <div className="w-full p-5 mt-1.5 flex justify-end">
                        <button className="px-6 py-3 bg-[#1A7A4A] text-white rounded-lg hover:bg-[#156239] font-medium cursor-pointer flex items-center "> <LuSave className="mr-2 w-4.5 h-4.5 mt-0.5"/> Save Changes</button>
                    </div>
                </div>
            </SideBar>
        </>
    )
}