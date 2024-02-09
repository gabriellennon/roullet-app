import { UserCredential, signInWithPopup } from 'firebase/auth';
import { auth, provider} from './config';
import GoogleIcon from '../../assets/icongoogle.png';
import { Button } from '../ui/button';
import { useNavigate } from 'react-router-dom';
import { TUserInfo } from '@/utils/types';
import { useUserInfo } from '@/hooks/useUserInfo';

type GoogleSignProps = {
    isLoading?: boolean;
}

export function GoogleSign({ isLoading }: GoogleSignProps){
    const { setUserInfo, setIsLogged } = useUserInfo();
    const navigate = useNavigate()

    const handleSign = () => {
        signInWithPopup(auth,provider).then((data: UserCredential) => {
            if(data.user.email){
                const { email, displayName, photoURL, uid } = data.user;
                const userInfo: TUserInfo = {
                    email, 
                    displayName, 
                    photoURL, 
                    uid
                }
                setUserInfo(userInfo)
                localStorage.setItem('@mySpin-UserInfo', JSON.stringify(userInfo))
                setIsLogged(true);
                navigate('/')
            }
        })
    }
    return(
        <div>
            <Button 
                onClick={handleSign}
                variant="outline" 
                type="button" 
                disabled={isLoading}
                className="flex gap-3 w-full"
            >
                {isLoading ? (
                    <div>icone carregando</div>
                    ) : (
                        <img 
                            src={GoogleIcon} 
                            alt="ícone de um G, logo da google" 
                            className="w-4"
                        />
                )}{" "}
                <p className="font-semibold text-[#50555A]">Entrar com Google</p>
            </Button>
        </div>
    )
}