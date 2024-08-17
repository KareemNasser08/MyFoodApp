export interface iLogin {
    email: string,
    password: string
}

export interface iForgetPassword {
    email: string,
}

export interface iRegisterUser {
    userName: string,
    email: string,
    country: string,
    phoneNumber: string,
    profileImage: File,
    password :string,
    confirmPassword:string,
}

export interface iRestPassword {
    email: string,
    seed: string,
    password :string,
    confirmPassword:string,
}

export interface iVerifyAccount {
    email: string,
    code: string,
}