import React from 'react';
import codeStatus from "@/app/state/codeStatus";
import { useRecoilState } from "recoil";
import CodeRenderer from './codeRenderer';

export default function Renderer({ onElementSelect }: any) {
    const [code, setCode] = useRecoilState(codeStatus.frontendCodeState);
    
    const handleClick = (e: any) => {
        e.stopPropagation(); // Prevent the event from bubbling up to the parent
        onElementSelect(e.target); // Pass the clicked element to the parent
    };              

    

    return (
        <div className="h-full w-full overflow-hidden" onClick={handleClick}>
            {code ? (
                 <CodeRenderer code={code} ></CodeRenderer>
            ) : (
                <div className="flex justify-center h-full items-center text-2xl">
                    Start building!
                </div>
            )}
        </div>
    );
}
