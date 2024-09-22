import React, { useEffect, useRef } from 'react';

interface CodeRendererProps {
    code: string;
}

const CodeRenderer: React.FC<CodeRendererProps> = ({ code }) => {


    return (
        <div className="h-full w-full overflow-hidden">
            {code.trim() !== "" ? (
                <div
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{ __html: code }}
                />
            ) : (
                <div className="flex justify-center h-full items-center text-2xl">
                    Start building!
                </div>
            )}
        </div>
    );
};

export default CodeRenderer;