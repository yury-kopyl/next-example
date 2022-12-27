import { actionCreator } from "#lib/helpers";
import {userTypes} from "#store/types/userTypes";
import {UserResponse} from "#app/entities/userEntities";

export const userActions = {
    setUser: (user: UserResponse) => actionCreator(userTypes.SET_USER, user),
    unsetUser: () => actionCreator(userTypes.UNSET_USER, null),
};
