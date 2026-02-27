import { useEffect, useRef } from 'react';
import katex from 'katex';
import 'katex/dist/katex.min.css';
// @ts-ignore
import renderMathInElement from 'katex/dist/contrib/auto-render';

interface MathRendererProps {
    text: string;
    className?: string;
}

export const MathRenderer = ({ text, className = '' }: MathRendererProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (containerRef.current) {
            containerRef.current.innerHTML = text;
            renderMathInElement(containerRef.current, {
                delimiters: [
                    { left: '$$', right: '$$', display: true },
                    { left: '\\(', right: '\\)', display: false },
                    { left: '$', right: '$', display: false },
                    { left: '\\[', right: '\\]', display: true },
                ],
                throwOnError: false,
            });
        }
    }, [text]);

    return (
        <div ref={containerRef} className={className} />
    );
};
