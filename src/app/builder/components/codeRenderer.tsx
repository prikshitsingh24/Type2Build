import React, { useEffect, useRef } from 'react';

interface CodeRendererProps {
    code: string;
}

const CodeRenderer: React.FC<CodeRendererProps> = ({ code }) => {


    const cleanedCode = code
            .replace(/```html\s*/, '')
            .replace(/```$/, '')
            .trim()

    console.log(cleanedCode)
    return (
        <div className="h-full w-full overflow-hidden">
            {cleanedCode.trim() !== "" ? (
                <div
                    className="w-full h-full"
                    dangerouslySetInnerHTML={{ __html: cleanedCode }}
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