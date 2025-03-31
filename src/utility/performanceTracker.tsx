import { useEffect ,useState} from "react";
export const PerformanceTracker: React.FC = () => {
    const [loadTime, setLoadTime] = useState<number | null>(null);

    useEffect(() => {
        const startTime = performance.now();

        const calculateLoadTime = () => {
            const endTime = performance.now();
            const duration = Math.round(endTime - startTime);
            setLoadTime(duration);
        };

        window.addEventListener('load', calculateLoadTime);


        const timer = setTimeout(calculateLoadTime, 1000);

        return () => {
            window.removeEventListener('load', calculateLoadTime);
            clearTimeout(timer);
        };
    }, []);

    if (!loadTime) return null;

    return (
        <div
            style={{
                position: 'fixed',
                top: 10,
                right: 50,
                backgroundColor: 'rgba(0,0,0,0.7)',
                color: 'white',
                padding: '5px 10px',
                borderRadius: '5px',
                zIndex: 1000,
                fontSize: '12px'
            }}
        >
            Load Time: {loadTime} ms
        </div>
    );
};