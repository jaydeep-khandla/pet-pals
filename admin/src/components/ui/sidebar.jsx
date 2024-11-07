import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Separator } from "./separator";
import { Button } from "./button";
import useLogout from "@/hooks/useLogout";
import useAuth from "@/hooks/useAuth";

// Define the Sidebar component
export default function Sidebar() {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation(); // Get the current location from React Router
  const navigate = useNavigate();

  const logout = useLogout();
  const { setAuth } = useAuth();

  const handleLogout = async () => {
    try {
      await logout();

      // setAuth(null);

      navigate("/");
    } catch (error) {
      console.log(error);
    }
  }

  // Function to determine if a link is active
  const isActive = (path) => location.pathname.startsWith(path);

  return (
    <aside className={`bg-black border-r p-6 ${isCollapsed ? "w-16 px-0 flex flex-col items-center" : "w-64"} transition-all duration-300`}>
      <button
        className="flex items-center justify-between gap-2 text-muted hover:text-muted-foreground mb-4"
        onClick={() => setIsCollapsed(!isCollapsed)}
      >
        <div className="flex items-center gap-2">
          <ChevronLeftIcon className={`w-5 h-5 transition-transform ${isCollapsed ? "rotate-180" : ""}`} />
          <span className={`${isCollapsed ? "hidden" : ""}`}>Collapse</span>
        </div>
      </button>
      {!isCollapsed && (
        <>
          <h1 className="text-muted text-3xl mb-4 font-bold">Admin Panel</h1>
          <Separator className="mb-4" />
        </>
      )}
      <div className="flex flex-col gap-6">
        <Link to="/admin/dashboard">
          <div
            className={`flex items-center gap-2 transition-colors ${isActive("/admin/dashboard") ? "text-muted-foreground" : "text-muted"} hover:text-muted-foreground`}
          >
            <HomeIcon className="w-5 h-5" />
            <span className={`${isCollapsed ? "hidden" : ""}`}>Dashboard</span>
          </div>
        </Link>
        <Link to="/admin/users">
          <div
            className={`flex items-center gap-2 transition-colors ${isActive("/admin/users") ? "text-muted-foreground" : "text-muted"} hover:text-muted-foreground`}
          >
            <UsersIcon className="w-5 h-5" />
            <span className={`${isCollapsed ? "hidden" : ""}`}>Users</span>
          </div>
        </Link>
        <Link to="/admin/pets">
          <div
            className={`flex items-center gap-2 transition-colors ${isActive("/admin/pets") ? "text-muted-foreground" : "text-muted"} hover:text-muted-foreground`}
          >
            <DogIcon className="w-5 h-5" />
            <span className={`${isCollapsed ? "hidden" : ""}`}>Pets</span>
          </div>
        </Link>
        {/* <Link to="/admin/adoption-application">
          <div
            className={`flex items-center gap-2 transition-colors ${isActive("/admin/adoption-application") ? "text-muted-foreground" : "text-muted"} hover:text-muted-foreground`}
          >
            <FileTextIcon className="w-5 h-5" />
            <span className={`${isCollapsed ? "hidden" : ""}`}>Adoption Application</span>
          </div>
        </Link> */}
        <Button onClick={handleLogout}>Logout</Button>
      </div>
    </aside>
  );
}

// Define your icon components here (ChevronLeftIcon, DogIcon, FileTextIcon, HomeIcon, UsersIcon) as shown in your original code

function ChevronLeftIcon(props) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  )
}

function DogIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path
        d="M10 5.172C10 3.782 8.423 2.679 6.5 3c-2.823.47-4.113 6.006-4 7 .08.703 1.725 1.722 3.656 1 1.261-.472 1.96-1.45 2.344-2.5" />
      <path
        d="M14.267 5.172c0-1.39 1.577-2.493 3.5-2.172 2.823.47 4.113 6.006 4 7-.08.703-1.725 1.722-3.656 1-1.261-.472-1.855-1.45-2.239-2.5" />
      <path d="M8 14v.5" />
      <path d="M16 14v.5" />
      <path d="M11.25 16.25h1.5L12 17l-.75-.75Z" />
      <path
        d="M4.42 11.247A13.152 13.152 0 0 0 4 14.556C4 18.728 7.582 21 12 21s8-2.272 8-6.444c0-1.061-.162-2.2-.493-3.309m-9.243-6.082A8.801 8.801 0 0 1 12 5c.78 0 1.5.108 2.161.306" />
    </svg>)
  );
}


function FileTextIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z" />
      <path d="M14 2v4a2 2 0 0 0 2 2h4" />
      <path d="M10 9H8" />
      <path d="M16 13H8" />
      <path d="M16 17H8" />
    </svg>)
  );
}


function HomeIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>)
  );
}


function UsersIcon(props) {
  return (
    (<svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round">
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>)
  );
}

// function ClipboardCheckIcon(props) {
//   return (
//     <svg
//       {...props}
//       xmlns="http://www.w3.org/2000/svg"
//       width="24"
//       height="24"
//       viewBox="0 0 24 24"
//       fill="none"
//       stroke="currentColor"
//       strokeWidth="2"
//       strokeLinecap="round"
//       strokeLinejoin="round"
//     >
//       <rect width="8" height="4" x="8" y="2" rx="1" ry="1" />
//       <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
//       <path d="m9 14 2 2 4-4" />
//     </svg>
//   )
// }