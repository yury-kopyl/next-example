import { getIn } from 'immutable';
import UserEntity from "#app/entities/userEntities";

export default interface State {
    user: UserEntity;
}

export interface UserSelectors extends Pick<UserEntity, "name" | "lastName" | "email">{
    isAuthed: boolean;
}

// Store keys
const user = (state: State): UserSelectors => ({
    name: getIn(state, ['user', 'name']) as string,
    lastName: getIn(state, ['user', 'lastName']) as string,
    email: getIn(state, ['user', 'email']) as string,
    isAuthed: !!getIn(state, ['user', 'name'], false),
});

export const selectors = {
    user,
};
