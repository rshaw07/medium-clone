export const ImageCard = ({image, type}: {image: string, type?: string}) =>{
    if(type==="medium"){
        return (
            <div className="relative w-24 h-24 bg-cover bg-center flex justify-center flex-col ">
                <img src={image} alt="" />
            </div>
        )
    }
    return (
        <div className="relative w-56 h-56 flex bg-cover bg-center justify-center flex-col">
            <img src={image} alt="" />
        </div>
    )
}