import { Outlet } from "react-router-dom"
export default function ShowCase (){

    return(
    <div className='showcase'>
      <h2>Welcome to the Showcase</h2>
      <Outlet />
    </div>
    )
}