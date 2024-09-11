function NavBar({ navIconHandler }) {
    return <>
        <div className="bg-slate-950 ">
            <div onClick={navIconHandler} className="items-center inline-flex">
                <img alt="albumThumb" className="w-20" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSNjj0wRkEdl_N6FRzq45x9bP8iBCwlLlkx2g&s" />
                <span className="text-slate-300 font-bold text-lg">PhotoFolio</span>
            </div>

        </div>
    </>
}

export default NavBar