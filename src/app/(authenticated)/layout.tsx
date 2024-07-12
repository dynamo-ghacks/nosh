import { AuthGuard } from "@/components/auth/auth-guard";
import React, { AwaitedReactNode } from "react";

export default function Layout({ children }) {
  return (
    <AuthGuard>
      {children}
      <div className="w-full bg-orange-500 flex justify-around items-center pt-4 pb-2 fixed bottom-0 left-0 right-0 max-w-md mx-auto rounded-t-3xl z-50">
        <div className="w-20 flex flex-col items-center text-white">
          <FaGlobeAsia />
          <span className="text-sm mt-2">Discovery</span>
        </div>
        <div className="relative w-24 h-10">
          <div className="w-24 h-24 absolute mx-auto bottom-0 text-2xl text-white bg-white rounded-full p-2">
            <div className="w-full h-full bg-orange-100 rounded-full p-2">
              <div className="w-full h-full bg-orange-500 rounded-full p-2  flex items-center justify-center">
                <FaPlus />
              </div>
            </div>
          </div>
        </div>
        <div className="w-20 flex flex-col items-center text-white">
          <FaRegUser />
          <span className="text-sm mt-2">Profile</span>
        </div>
      </div>
    </AuthGuard>
  );
}
