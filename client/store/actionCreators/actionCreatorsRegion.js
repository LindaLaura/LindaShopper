import { LOAD_REGIONS, LOAD_REGION, CREATE_REGION, EDIT_REGION, DELETE_REGION} from '../actions/actionRegion';

const loadRegions = (regions) => {
    return {
        type: LOAD_REGIONS,
        regions
    };
};

const loadRegion = (region) => {
    return {
        type: LOAD_REGION,
        region
    };
};

const createRegion = (region) => {
    return {
        type: CREATE_REGION,
        region
    };
};

const editRegion = (region) => {
    return {
        type: EDIT_REGION,
        region
    };
};

const deleteRegion = (region) => {
    return {
        type: DELETE_REGION,
        region
    };
};

export {loadRegions, loadRegion, createRegion, editRegion, deleteRegion}