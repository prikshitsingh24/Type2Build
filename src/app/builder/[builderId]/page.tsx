import Preview from "../components/preview";


export default function Builder(){
    return(
        <div className="w-full h-screen">
            <div className="grid grid-cols-2 h-full ">
                <div>
                    Chat
                </div>
                <div className="mb-10">
                    <Preview></Preview>
                </div>
            </div>
        </div>
    )
}