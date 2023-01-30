import "./App.css"
import { Route, Routes } from "react-router-dom"
import HomePage from "./pages/Home/HomePage"
import RoomPage from "./pages/Room/RoomPage"
import ProfilePage from "./pages/Profile/ProfilePage"
// import UserInfo from "./pages/Profile/Info/UserInfo"
// import GraphInfo from "./pages/Profile/GraphInfo/GraphInfo"
import RoomResult from "./pages/Room/RoomResult/RoomResult"
import SignParentPage from "./pages/Sign/SignParentPage"
import TestPage from "./pages/TestPage"
import NotFound from "./pages/NotFound/NotFound"
import DoorParentPage from "./pages/Door/DoorParentPage"
// import axios from "axios"

// axios.defaults.baseURL = "https://asdf"
// axios.defaults.transformRequest = []

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={`/`} element={<HomePage />} />
        <Route path={`/sign`} element={<SignParentPage />} />
        <Route path={`/room`} element={<RoomPage />}>
          <Route path={`/room/result`} element={<RoomResult />} />
        </Route>
        <Route path={`/profile`} element={<ProfilePage />} />
        <Route path={`/profile/:infoType`} element={<ProfilePage />} />
        <Route path={`/door`} element={<DoorParentPage />} />
        <Route path={`/manage`} element />
        <Route path={`/test`} element={<TestPage />} />
        <Route path={`*`} element={<NotFound />} />
      </Routes>
    </div>
  )
}

export default App
