import { NavLink, Outlet } from "react-router-dom";
export default function Layout(){
    function activeLink( isActive ){ 
        return isActive ? "underline" : "hover:underline"
    }
      return(
        <>
            <nav className="container flex justify-center p-7 gap-x-20 font-bold text-xl">
                <NavLink className={({ isActive }) => activeLink(isActive)} to="/">Blogs</NavLink>
                <NavLink className={({ isActive }) => activeLink(isActive)} to="add-blog">Add a blog</NavLink>                
            </nav>
            <main className="flex justify-center">
                <Outlet />
            </main>
        </>
    )
}