import { useCallback, useState, useEffect, useRef } from 'react';
import './styles.css';
import { DEFAULT_VALUES_ROULLET, colorsRoullet } from '@/utils/utils';
import ConfettiExplosion from 'react-confetti-explosion';

type CustomStyle = React.CSSProperties & {
    '--i'?: number | string;
    '--clr'?: string;
};

type TRoulletProps = {
    valuesRoullet: string[] | null;
};

export const SpinWheel = ({ valuesRoullet }: TRoulletProps) => {
    const [rotationValue, setRotationValue] = useState(0);
    const [isExploding, setIsExploding] = useState(false);
    const [isSpinning, setIsSpinning] = useState(false);

    const wheelRef = useRef<HTMLDivElement | null>(null);

    const spin = () => {
        setIsExploding(false);
        setIsSpinning(true);
        const newRotationValue = rotationValue + Math.ceil(Math.random() * 3600);
        setRotationValue(newRotationValue);
    };

    const getStyle = (index: number, color: string): CustomStyle => {
        return {
            '--i': index,
            '--clr': color,
        } as CustomStyle;
    };

    const transformArrayToRoulletArray = useCallback(() => {
        if (valuesRoullet) {
            if (valuesRoullet.length !== 0 && valuesRoullet.length <= 9) {
                return valuesRoullet.map((str, index) => ({
                    name: str,
                    color: colorsRoullet[index % colorsRoullet.length],
                }));
            }
        }
        return DEFAULT_VALUES_ROULLET;
    }, [valuesRoullet]);

    useEffect(() => {
        const handleTransitionEnd = () => {
            setIsSpinning(false);
            setIsExploding(true);
        };

        const wheelElement = wheelRef.current;

        if (wheelElement) {
            wheelElement.addEventListener('transitionend', handleTransitionEnd);
        }

        return () => {
            if (wheelElement) {
                wheelElement.removeEventListener('transitionend', handleTransitionEnd);
            }
        };
    }, []);

    return (
        <div className="container">
            <div className="spinBtn" onClick={spin}>
                Spin
            </div>
            <div
                ref={wheelRef}
                className={`wheel ${isSpinning ? 'spinning' : ''}`}
                style={{ transform: `rotate(${rotationValue}deg)` }}
            >
                {transformArrayToRoulletArray()?.map((value, index) => (
                    <div
                        className={`number ${isSpinning ? 'disableTransition' : ''}`}
                        key={`${value}-${index}`}
                        style={getStyle(index, `${value.color}`)}
                    >
                        <span>{value.name}</span>
                    </div>
                ))}
            </div>
            {isExploding && (
                <ConfettiExplosion
                    force={0.8}
                    duration={3000}
                    particleCount={250}
                    width={1600}
                />
            )}
        </div>
    );
};
