import { useRef, useEffect } from "react"
import { db } from "../firestore_init"
import { collection, addDoc } from "firebase/firestore";

// react toasts
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function ImageForm({ selectedAlbum, imageToBeUpdated, updateImage }) {

    const imageTitleRef = useRef()
    const imageUrlRef = useRef()

    useEffect(() => {
        imageTitleRef.current.focus()
    }, [])

    useEffect(() => {
        if (imageToBeUpdated) {
            imageTitleRef.current.value = imageToBeUpdated.title
            imageUrlRef.current.value = imageToBeUpdated.url
        }
    }, [imageToBeUpdated])

    async function imageFormSubmitHandler(e) {
        e.preventDefault()

        if (imageToBeUpdated) {
            updateImage({ title: imageTitleRef.current.value, url: imageUrlRef.current.value })
            clearInputField()
            toast.success("Edited the Image")
        }
        else {
            await addDoc(collection(db, "albums", selectedAlbum.id, "images"),
                { title: imageTitleRef.current.value, url: imageUrlRef.current.value })
            clearInputField()
            toast.success("New Image Added")
        }
    }

    function clearInputField() {
        imageTitleRef.current.value = ""
        imageUrlRef.current.value = ""
    }

    return <>
        <ToastContainer />
        <div className="bg-slate-200 mt-10 py-5 text-sm sm:text-base">
            <h1 className="font-bold text-3xl text-center">Add Images to Album</h1>
            <form onSubmit={(e) => imageFormSubmitHandler(e)} className="flex flex-col gap-6 justify-center pt-10 text-center">
                <div><input ref={imageTitleRef} className="rounded-full px-4 h-10 lg:w-1/3 w-2/3" type="text" required placeholder="Title" /> </div>
                <div><input ref={imageUrlRef} className="rounded-full px-4 h-10 lg:w-1/3 w-2/3" type="url" required placeholder="Image URL" /></div>
                <div className="flex justify-center gap-5">
                    <button type="button" onClick={clearInputField} className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Clear</button>
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2">Add</button>
                </div>

            </form>
        </div>
    </>
}
