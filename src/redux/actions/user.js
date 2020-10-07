export const SIGN_IN = 'SIGN_IN';
export const SIGN_OUT = 'SIGN_OUT';
export const RESTORE_USER = 'RESTORE_USER';

export const signIn = (user) => {
    return { type : SIGN_IN, payload : user}
}
export const signOut = () => {
    return { type : SIGN_OUT }
}

export const restoreUser = (user) => {
    return { type : RESTORE_USER, payload: user}
}