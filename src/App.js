import NavBar from "./components/Navbar";
import AlbumsList from "./components/AlbumsList";
import { useState } from "react";

function App() {
  const [selectedAlbum, setSelectedAlbum] = useState(null)

  async function albumClickHandler(album) {
    setSelectedAlbum(album)
  }

  function navIconHandler() {
    setSelectedAlbum(null)
  }

  return (
    <>
      <NavBar navIconHandler={navIconHandler} />
      <AlbumsList selectedAlbum={selectedAlbum} setSelectedAlbum={setSelectedAlbum} albumClickHandler={albumClickHandler} />
    </>
  );
}

export default App;
