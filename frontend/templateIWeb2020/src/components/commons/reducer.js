export const reducer = (state, action) => {
    if (action.type === "ADD_ITEM") {
        return {
            ...state,
            isModalOpen: true,
            modalContent: "Item created succesfully",
        };
    }
    if (action.type === "UPDATE_ITEM") {
        return {
            ...state,
            isModalOpen: true,
            modalContent: "Info Updated",
        };
    }
    if (action.type === "NO_VALUE") {
        return {
            ...state,
            isModalOpen: true,
            modalContent: "Invalid values, check all the fields",
        };
    }
    if (action.type === "INVALID_ID_VALUE") {
        return {
            ...state,
            isModalOpen: true,
            modalContent: "There's an item with the same id value",
        };
    }
    if (action.type === "NO_PLACE_FOUND") {
        return {
            ...state,
            isModalOpen: true,
            modalContent: "No place found",
        };
    }
    if (action.type === "CLOSE_MODAL") {
        return {
            ...state,
            isModalOpen: false,
            modalContent: "",
        };
    }
    throw new Error("no matching action type");
};
