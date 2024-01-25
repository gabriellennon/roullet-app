import { useCallback, useState } from 'react';
import './styles.css';
import { DEFAULT_VALUES_ROULLET, colorsRoullet } from '@/utils/utils';

type CustomStyle = React.CSSProperties & {
    '--i'?: number | string;
    '--clr'?: string;
};

type TRoulletProps = {
    valuesRoullet: string[] | null;
}
  

export const SpinWheel = ({ valuesRoullet }: TRoulletProps) => {
    const [rotationValue, setRotationValue] = useState(0);

    const spin = () => {
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
        if(valuesRoullet){
            if( valuesRoullet.length !== 0 && valuesRoullet.length <= 9){
                return valuesRoullet.map((str, index) => ({
                    name: str,
                    color: colorsRoullet[index % colorsRoullet.length],
                }));
            }
        } return DEFAULT_VALUES_ROULLET
    },[valuesRoullet])
    

    return (
        <div className="container">
            <div className="spinBtn" onClick={spin}>Spin</div>
            <div className="wheel" style={{ transform: `rotate(${rotationValue}deg)` }}>
                {transformArrayToRoulletArray()?.map((value, index) => (
                    <div className="number" key={`${value}-${index}`} style={getStyle(index, `${value.color}`)}><span>{value.name}</span></div>
                ))}
            </div>
        </div>
    );
};
