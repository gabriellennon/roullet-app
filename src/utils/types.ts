

export type TUserInfo = {
    email: string; 
    displayName: string | null; 
    photoURL: string | null; 
    uid: string;
}

export type DataConfigRoullet = {
    backgroundColorGeral: string;
    backgroundColorRoullet: string;
    titleRoullet: string;
    subtitleRoullet: string;
    names: string[] | null;
}

export type ResponseConfigUserData = {
    userId: string;
    body: DataConfigRoullet;
}