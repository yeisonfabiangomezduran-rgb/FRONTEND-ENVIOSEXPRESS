import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./header";

export default function Layout() {
  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      <Header />
      <Sidebar />

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}
