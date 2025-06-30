import Navbar from "./ui/navbar";
import { Outlet } from "react-router-dom";

export default function Layout({user, setSettings}) {


  return (
    <>
      <Navbar user = {user} onSettingsChange={setSettings}/>
      <main className="p-4">
        <Outlet /> {/* This renders the current route's page */}
      </main>
    </>
  );
}
