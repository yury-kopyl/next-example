import UserEntity from "#app/entities/userEntities";

enum UserFields {
    name = 'name',
    lastName = 'lastName',
    email = 'email',
}

type userQuery = { name: string } | { email: string } | { lastName: string };

class Db {
    users: UserEntity[] = [{
        email: 'admin@localhost.com',
        name: 'admin',
        lastName: 'admin',
        password: '1f9f759632858f83620d042b4a517dcec6a87dc75f153e903aeca8ebcc2b142b2018727194ba2c87407538085fa67dfdba77697767c387da980ae8a02d5ed07b',
        salt: 'd92cb11eabeb828b823378c3e51adb42',
        refreshToken: '',
    }];

    constructor() {
    }

    findOne(query: userQuery) {
        const key = Object.keys(query)[0] as UserFields;
        // @ts-ignore
        const value = query[key];

        return this.users.find(doc => doc[key] === value);
    }

    insertOne(user: UserEntity) {
        this.users.push(user);
        return user;
    }

    updateOne (query: userQuery, update: Partial<UserEntity>) {
        const key = Object.keys(query)[0] as UserFields;
        // @ts-ignore
        const value = query[key];
        const index = this.users.findIndex(doc => doc[key] === value);

        this.users[index] = {
            ...this.users[index],
            ...update,
        }
    }
}

export default new Db();
