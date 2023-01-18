import "./App.css"
import { Route, Routes } from "react-router-dom"
import Login from "./pages/Sign/Login"
import HomePage from "./pages/Home/HomePage"
import RoomPage from "./pages/Room/RoomPage"
import ProfilePage from "./pages/Profile/ProfilePage"
import UserInfo from "./pages/Profile/Info/UserInfo"
import GraphInfo from "./pages/Profile/GraphInfo/GraphInfo"
import RoomResult from "./pages/Room/RoomResult/RoomResult"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={`/`} element={<HomePage />} />
        <Route path={`/sign`} element={<Login />} />
        <Route path={`/room`} element={<RoomPage />}>
          <Route path={`/room/result`} element={<RoomResult />} />
        </Route>
        <Route path={`/profile`} element={<ProfilePage />}>
          <Route path={`/profile/info`} element={<UserInfo />} />
          <Route path={`/profile/graph`} element={<GraphInfo />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
