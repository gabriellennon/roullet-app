import { db } from '@/components/GoogleSign/config';
import { DataConfigRoullet } from '@/utils/types';
import { set, get, ref } from 'firebase/database'

type GetConfigRoulletParams = {
    idUser: string;
}

type AddConfigRoulletParams = {
    idUser: string;
    body: DataConfigRoullet;
}

export const getConfigRoullet = async ({ idUser }: GetConfigRoulletParams) => {
    const snapshot = await get(ref(db, `configuration/${idUser}`));
    const config = snapshot.val();
    return config;
}
export const addConfigRoullet = async ({ idUser, body }: AddConfigRoulletParams) => {
    await set(ref(db, 'configuration/' + idUser), {
        userId: idUser,
        body: body,
    })
}
