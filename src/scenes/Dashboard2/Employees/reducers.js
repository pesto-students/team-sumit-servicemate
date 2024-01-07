// reducers.js

const initialState = {
    employees: [
        {
            id: 1,
            name: 'ABC',
            photo: 'kjkkkk',
            proofType: 'dfr',
            idProof: 'ewwwwfr',
            address: 'Rajiv Nagar',
            city: 'New Delhi',
            pinCode: '123456',
            state: 'Delhi',
            country: 'India'
        }
    ],
};

const EmployeeReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_EMPLOYEE':
            return { ...state, employees: [...state.employees, action.payload] };
        default:
            return state;
    }
};

export default EmployeeReducer;
