import {LOAD_CATEGORIES, LOAD_CATEGORY, CREATE_CATEGORY, EDIT_CATEGORY, DELETE_CATEGORY} from '../actions/actionCategory';

const loadCategories = (categories) => {
    return{
        type: LOAD_CATEGORIES,
        categories
    };
};

const loadCategory = (category) => {
    return {
        type: LOAD_CATEGORY,
        category
    }
};

const createCategory = (category) => {
    return {
        type: CREATE_CATEGORY,
        category
    };
};

const editCategory = (category) => {
    return {
        type: EDIT_CATEGORY,
        category
    };
};

const deleteCategory = (category) => {
    return {
        type: DELETE_CATEGORY,
        category
    }
}

export {loadCategories, loadCategory, createCategory, editCategory, deleteCategory}