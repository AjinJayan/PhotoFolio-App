import { useEffect, useState, useRef } from "react"
import { db } from "../firestore_init"
import { onSnapshot, collection, deleteDoc, doc, updateDoc } from "firebase/firestore";

import ReactSpinner from "./ReactSpinner";
import ImageForm from "./ImageForm";
import Carousel from "./Carousel";

import EditImage from "../images/edit.png";
import DeleteImage from "../images/trash-bin.png";


export default function ImageList({ selectedAlbum, setSelectedAlbum }) {
    const [loading, setLoading] = useState(true)
    const [images, setImages] = useState([])
    const [addImage, setAddImage] = useState(false)
    const [currentHoverIndex, setCurrentHoverIndex] = useState(null)
    const [imageToBeUpdated, setImageToBeUpdated] = useState(null)
    const searchInputRef = useRef()
    const [searchInputValue, setsearchInputValue] = useState("")
    const [searchOutputImages, setSearchOutputImages] = useState([])
    const [displayCarousel, setDisplayCarousel] = useState(false)
    const [currentCarouselImageIdx, setCurrentCarouselImageIdx] = useState(null)

    useEffect(() => {
        async function Data() {
            await onSnapshot(collection(db, "albums", selectedAlbum.id, "images"), (snapshot) => {
                const fectedData = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }))
                setImages([...fectedData])
                setLoading(false)
            })
        }
        Data()
    }, [])

    useEffect(() => {
        if (searchInputValue !== "") {
            const searchResultImages = images.filter((image, index) => image.title.includes(searchInputValue))
            setSearchOutputImages(searchResultImages)
            console.log(searchResultImages)
        }
        else {
            setSearchOutputImages(images)
        }
    }, [searchInputValue, images])

    function addImageBtnHandler() {
        setAddImage(prevState => !prevState)
        setImageToBeUpdated(null)

    }

    function backBtnHandler() {
        setSelectedAlbum(null)
    }

    async function deleteImageClickHandler(image) {
        await deleteDoc(doc(db, "albums", selectedAlbum.id, "images", image.id))
    }

    function editImageClickHandler(image) {
        setImageToBeUpdated(image)
        setAddImage(true)

    }

    async function updateImage(image) {
        await updateDoc(doc(db, "albums", selectedAlbum.id, "images", imageToBeUpdated.id), image)
        setImageToBeUpdated(null)
        setAddImage(false)
    }

    function imageClickHandler(e, index) {

        if (e.target.alt !== "Edit" && e.target.alt !== "Delete") {
            setCurrentCarouselImageIdx(index)
            setDisplayCarousel(true)
        }

    }

    function DisplayImages() {
        return <div className="my-10 flex justify-center gap-10 flex-wrap mx-10 xl:mx-56">
            {searchOutputImages.map((image, index) =>
                <div key={index} className="relative w-60 flex flex-col h-50 hover:border-2 p-3 " onClick={(e) => { imageClickHandler(e, index) }}
                    onMouseOver={() => setCurrentHoverIndex(index)} onMouseLeave={() => setCurrentHoverIndex(null)}>
                    <img className="w-50 h-32 mb-2" src={image.url} alt={image.title} />
                    <div className="overflow-hidden text-center">{image.title}</div>
                    <div className={`absolute gap-3 flex top-1 right-3 ${currentHoverIndex === index ? "opacity-100" : "opacity-0"}`}>

                        <div id="editDelete" className="w-9 hover:cursor-pointer hover:scale-110" onClick={() => editImageClickHandler(image)}>
                            <img src={EditImage} height="100%" alt="Edit" />
                        </div>
                        <div className="w-9 hover:cursor-pointer hover:scale-110" onClick={() => { deleteImageClickHandler(image) }}>
                            <img src={DeleteImage} height="100%" alt="Delete" />
                        </div>

                    </div>
                </div>)}
        </div>
    }

    return <>
        {addImage ? <ImageForm selectedAlbum={selectedAlbum} imageToBeUpdated={imageToBeUpdated} updateImage={updateImage} /> : null}
        <div className="flex justify-between mt-16 mb-4 flex-wrap px-24 gap-10 ">
            <div onClick={backBtnHandler} className="rounded-full shadow-xl shadow-slate-400 p-3 hover:scale-110"><img className="w-8" alt="backBtn" src="https://cdn-icons-png.flaticon.com/128/709/709624.png" /></div>
            <h1 className="font-bold text-3xl pt-3">{images.length !== 0 ? `Images in ${selectedAlbum.name}` : "No Images Found in the Album"}</h1>
            {images.length !== 0 ?
                <div>
                    <input className="rounded-full h-9 p-2 mt-2 drop-shadow-2xl bg-gray-200" ref={searchInputRef} type="text" placeholder="Search" onChange={() => setsearchInputValue(searchInputRef.current.value)} />
                </div> : null}
            {addImage ?
                <button onClick={addImageBtnHandler} type="button" className="text-white bg-red-600 hover:bg-red-800 font-medium rounded-lg text-sm px-5 h-11">Cancel</button> :
                <button onClick={addImageBtnHandler} type="button" className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-4 h-11">Add Images</button>
            }
        </div>

        <hr />

        {loading ? <ReactSpinner /> : null}
        {searchOutputImages.length === 0 && images.length !== 0 ? <div className="mt-48 text-center font-bold text-zinc-400 text-2xl">Search Result Not Found</div> : <DisplayImages />}

        {displayCarousel ? <Carousel setDisplayCarousel={setDisplayCarousel} currentCarouselImageIdx={currentCarouselImageIdx}
            setCurrentCarouselImageIdx={setCurrentCarouselImageIdx} searchOutputImages={searchOutputImages} /> : null}
    </>
}