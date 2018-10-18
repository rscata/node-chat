const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {

    var users;

    beforeEach(() => {
        users = new Users();
        users.users = [
            {
                id: 1,
                name: 'Mike',
                room: "node Curse"
            },
            {
                id: 2,
                name: 'Jen',
                room: "react Curse"
            },
            {
                id: 3,
                name: 'Jule',
                room: "node Curse"
            }
        ];
    });

    it('Should add new user', () => {
        var users = new Users();
        var user = {
            id: '123',
            name: 'Andrew',
            room: 'The office Fans'
        };

        var resUser = users.addUser(user.id, user.name, user.room);

        expect(users.users).toEqual([user]);
    });

    it ('should return names for node curse', () => {
        var userList = users.getUserList('node Curse');
        expect(userList).toEqual(['Mike', 'Jule']);
    });

    it ('should return names for react curse', () => {
        var userList = users.getUserList('react Curse');
        expect(userList).toEqual(['Jen']);
    });

    it('should remove a user', () => {
        var userId = 2;
        var user = users.removeUser(userId);
        expect(user.id).toBe(userId);
        expect(users.users.length).toBe(2);
    });

    it('should not remove user', () => {
        var userId = 99;
        var user = users.removeUser(userId);
        expect(user).toNotExist();
    });

    it('should find user', () => {
        var user = users.getUser(1);
        expect(user).toEqual({
            id: 1,
            name: 'Mike',
            room: "node Curse"
        });
    })

    it('should not find user', () => {
        var user = users.getUser(0);
        expect(user).toNotExist();
    })
});