

export default function Renderer({onElementSelect}:any){

    const handleClick=(e:any)=>{
        e.stopPropagation(); // Prevent the event from bubbling up to the parent
        onElementSelect(e.target); // Pass the clicked element to the parent
    }

    return(
        <div className="h-full w-full" onClick={handleClick}>
             <div className="flex flex-col items-center justify-center h-full bg-gray-100">
            <h1 className="text-3xl font-bold mb-6 text-gray-800">My Centered Title</h1>
            <div className="flex flex-col items-center gap-6">
                <div className="bg-white border border-gray-300 p-6 rounded-lg w-80 text-center shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Description 1</h2>
                    <p className="text-gray-700">This is a brief description for the first div. It provides some information about the content here.</p>
                </div>
                <div className="bg-white border border-gray-300 p-6 rounded-lg w-80 text-center shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Description 2</h2>
                    <p className="text-gray-700">This is a brief description for the second div. It provides some additional details and context.</p>
                </div>
                <div className="bg-white border border-gray-300 p-6 rounded-lg w-80 text-center shadow-lg">
                    <h2 className="text-xl font-semibold mb-4">Description 3</h2>
                    <p className="text-gray-700">This is a brief description for the third div. It continues with more information and explanations.</p>
                </div>
            </div>
        </div>
        </div>
    )
}