
type TColorPickerProps = {
    title: string;
    activeColor: string;
    handleSetColor: (color: string) => void;
}

export const ColorPicker = ({ title, activeColor, handleSetColor }: TColorPickerProps) => {
    const handleChangeColor = (color: string) => {
        handleSetColor(color);
    }

    return (
        <div className='flex justify-between items-center'>
            <label 
                htmlFor="hs-color-input" 
                className="block text-right text-base font-medium mb-2 dark:text-white"
            >
                {title}
            </label>
            <input 
                type="color" 
                className="p-1 h-10 block bg-slate-100 border border-gray-200 cursor-pointer w-10 rounded-lg disabled:opacity-50 disabled:pointer-events-none dark:bg-slate-900 dark:border-gray-700 hover:cursor-pointer" 
                id="hs-color-input" 
                value={activeColor}
                title="Selecione a cor desejada"
                onChange={(e) => handleChangeColor(e.target.value)}
            ></input>
        </div>
    )
}