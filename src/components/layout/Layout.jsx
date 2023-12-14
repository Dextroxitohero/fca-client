import { Outlet } from "react-router-dom";
import { Navbar } from '../../components/navbar/Navbar';

export const Layout = () => {
  return (
    <div>
        {/* <Navbar /> */}
        <Outlet className='mt-28'/>
    </div>
  )
}
