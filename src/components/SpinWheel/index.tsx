import { useState } from 'react';
import './styles.css';

type CustomStyle = React.CSSProperties & {
    '--i'?: number | string;
    '--clr'?: string;
  };
  

const SpinWheel = () => {
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

    return (
        <div className="container">
            <div className="spinBtn" onClick={spin}>Spin</div>
            <div className="wheel" style={{ transform: `rotate(${rotationValue}deg)` }}>
                <div className="number" style={getStyle(1, '#db7093')}><span>100</span></div>
                <div className="number" style={getStyle(2, '#20b2aa')}><span>1</span></div>
                <div className="number" style={getStyle(3, '#daa520')}><span>50</span></div>
                <div className="number" style={getStyle(4, '#ff340f')}><span>0</span></div>
                <div className="number" style={getStyle(5, '#4169e1')}><span>1000</span></div>
                <div className="number" style={getStyle(6, '#3cb371')}><span>10</span></div>
                <div className="number" style={getStyle(7, '#d63e92')}><span>5</span></div>
                <div className="number" style={getStyle(8, '#ff7f50')}><span>20</span></div>
            </div>
        </div>
    );
};

export default SpinWheel;
