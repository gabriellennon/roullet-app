import { Label } from './ui/label'
import { Switch } from './ui/switch'

type TSwitchConfigProps = {
    id: string;
    title: string;
    isChecked: boolean;
    handleCheck: (title:string) => void;
}

export const SwitchConfig = ({ id, title, isChecked, handleCheck }: TSwitchConfigProps) => {
    return (
        <div className='flex justify-between items-center'>
            <Label htmlFor={id} className="text-right text-base">
                {title}
            </Label>
            <Switch 
                id={id} 
                className="col-span-3" 
                checked={isChecked}  
                onClick={() => handleCheck(id)}
            />
        </div>
    )
}