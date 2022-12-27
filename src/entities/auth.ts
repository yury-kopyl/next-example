import UserEntity from "#app/entities/userEntities";

export interface SignUp extends Omit<UserEntity, "salt"> {
    confirm: string;
}

export interface SignIn extends Pick<UserEntity, "email" | "password">{}
