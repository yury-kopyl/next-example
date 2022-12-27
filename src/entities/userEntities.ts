export default interface UserEntity {
    name: string;
    lastName: string;
    email: string;
    password: string;
    salt: string;
}

export interface UserResponse extends Pick<UserEntity, 'name' | 'lastName' | 'email'>{}