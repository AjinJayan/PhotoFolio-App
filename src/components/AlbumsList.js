import AlbumForm from "./AlbumForm"
import ImageList from "./ImageList";
import { useEffect, useState } from "react"
import { db } from "../firestore_init"
import { onSnapshot, collection } from "firebase/firestore";

import ReactSpinner from "./ReactSpinner";

export default function AlbumsList({ selectedAlbum, setSelectedAlbum, albumClickHandler }) {
    const [loading, setLoading] = useState(true)
    const [addAlbum, setAddAlbum] = useState(false)
    const [albums, setAlbums] = useState([])


    useEffect(() => {
        async function Data() {
            await onSnapshot(collection(db, "albums"), (snapshot) => {
                const fectedData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                setAlbums([...fectedData])
                setLoading(false)
            })
        }
        Data()
    }, [])

    function addAlbumBtnHandler() {
        setAddAlbum(prevState => !prevState)
    }



    const Albums = () => {
        return <>
            {addAlbum ? <AlbumForm albums={albums} /> : null}
            <div className="flex justify-around  mt-16">
                <h1 className="font-bold text-3xl">My Albums</h1>

                {addAlbum ?
                    <button onClick={addAlbumBtnHandler} type="button" className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Cancel</button> :
                    <button onClick={addAlbumBtnHandler} type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Add Album</button>
                }
            </div>

            <hr />

            {loading ? <ReactSpinner /> : null}
            <div className="my-10 flex justify-center gap-10 flex-wrap mx-10 xl:mx-56 ">
                {albums.map((album, id) =>
                    <div key={id} className="w-40 h-40 flex justify-center flex-col hover:border-2 p-5" onClick={() => albumClickHandler(album)}>
                        <img src="https://cdn-icons-png.flaticon.com/128/1040/1040241.png" alt="album" />
                        <div className="text-center overflow-clip">{album.name}</div> </div>)}
            </div>
        </>
    }

    return <>
        {selectedAlbum ? <ImageList selectedAlbum={selectedAlbum} setSelectedAlbum={setSelectedAlbum} /> : <Albums />}
    </>

}