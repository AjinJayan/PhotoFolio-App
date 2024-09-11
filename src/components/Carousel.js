export default function Carousel({ setDisplayCarousel, currentCarouselImageIdx, setCurrentCarouselImageIdx, searchOutputImages }) {
    function closeBtnHandler() {
        setDisplayCarousel(false)
    }

    function fowardBtnHandler() {
        const totalImgs = searchOutputImages.length - 1
        if (currentCarouselImageIdx === totalImgs) setCurrentCarouselImageIdx(0)
        else setCurrentCarouselImageIdx((prevIndex) => prevIndex + 1)
    }
    function backwardBtnHandler() {
        const totalImgs = searchOutputImages.length - 1
        if (currentCarouselImageIdx === 0) setCurrentCarouselImageIdx(totalImgs)
        else setCurrentCarouselImageIdx((prevIndex) => prevIndex - 1)
    }

    return <>

        <div className="relative z-10" aria-labelledby="modal-title" role="dialog" aria-modal="true">
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" aria-hidden="true"></div>
            <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                <div className="relative flex min-h-full items-center justify-center p-4 text-center sm:p-0">
                    <img onClick={closeBtnHandler} className="w-9 md:w-14 absolute left-3/4 ml-16 sm:ml-28 bottom-3/4 hover:scale-110" alt="close_btn" src="https://cdn-icons-png.flaticon.com/128/1168/1168643.png" />
                    <img onClick={backwardBtnHandler} className="w-10 md:w-16 mr-3 sm:mr-10 hover:scale-110" alt="skip-backward" src="https://cdn-icons-png.flaticon.com/128/8050/8050812.png" />
                    <img className="w-3/4  xs:w-3/4 md:w-2/3 xl:w-1/2 max-h-[800px]" alt="imageCarousel" src={searchOutputImages[currentCarouselImageIdx].url} />
                    <img onClick={fowardBtnHandler} className="w-10 md:w-16 ml-3 sm:ml-10 hover:scale-110" alt="skip-forward" src="https://cdn-icons-png.flaticon.com/128/8050/8050813.png" />
                </div>
            </div >
        </div >
    </>
}