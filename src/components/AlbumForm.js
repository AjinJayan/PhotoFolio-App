import { useRef, useEffect } from "react"
import { db } from "../firestore_init"
import { collection, addDoc } from "firebase/firestore";

// react toasts
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function AlbumForm({ albums }) {
    const alubumInputRef = useRef()

    useEffect(() => {
        alubumInputRef.current.focus()
    }, [])

    async function albumFormSubmitHandler(e) {
        e.preventDefault()

        const getAlbumWithSameName = albums.filter((album) => album.name === alubumInputRef.current.value)

        if (getAlbumWithSameName.length === 0) {
            await addDoc(collection(db, "albums"), { name: alubumInputRef.current.value })
            toast.success("New Album Created")
        }
        else {
            toast.error("Album Already Exist")
        }
    }
    function clearInputField() {
        alubumInputRef.current.value = ""
    }

    return <>
        <ToastContainer />
        <div className="bg-slate-200 mt-10 py-5 text-sm sm:text-base">
            <h1 className="font-bold text-3xl text-center">Create a New Album</h1>
            <form onSubmit={(e) => albumFormSubmitHandler(e)} className="flex gap-6 justify-center pt-10">
                <input ref={alubumInputRef} className="rounded-full px-4" type="text" required placeholder="Album Name" />
                <button id="clear" type="button" onClick={clearInputField} className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Clear</button>
                <button id="create" type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Create</button>
            </form>
        </div>

    </>
}