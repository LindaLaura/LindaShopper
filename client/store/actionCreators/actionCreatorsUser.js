import { LOAD_USER, LOAD_USERS, CREATE_USER, DELETE_USER, EDIT_USER} from '../actions/actionUser';

const loadUsers = (users) => { 
    return {
        type: LOAD_USERS,
        users
    };
};

const loadUser = (user) => { 
    return {
        type: LOAD_USER,
        user
    };
};

const createUser = (user) => { 
    return {
        type: CREATE_USER,
        user
    };
};

const deleteUser = (user) => { 
    return {
        type: DELETE_USER,
        user
    };
};

const editUser = (user) => { 
    return {
        type: EDIT_USER,
        user
    };
};

export {loadUsers, loadUser, createUser, deleteUser, editUser}