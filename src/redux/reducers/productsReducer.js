/* eslint-disable import/no-anonymous-default-export */

import {
	ADD_PRODUCT,
	ADD_PRODUCT_SUCCESS,
	ADD_PRODUCT_ERROR,
	START_DOWNLOAD_PRODUCTS,
	DOWNLOAD_PRODUCTS_ERROR,
	DOWNLOAD_PRODUCTS_SUCCESS, 
	GET_PRODUCT_DELETED,
	PRODUCT_DELETED_ERROR,
	PRODUCT_DELETED_SUCCESS,
	GET_PRODUCT_EDIT,
	PRODUCT_EDITED_ERROR,
	PRODUCT_EDITED_SUCCESS
} from '../types'; 

// Each reducer has it own state 
const initialState = {
	products: [],
	error: null,
	loading: false,
	productDeleted: null,
	productEdit: null
}

export default function (state = initialState, action) {
	switch (action.type) {
		case START_DOWNLOAD_PRODUCTS:
		case ADD_PRODUCT:
			return {
				...state,
				loading: action.payload,
				error: null
			}
		case ADD_PRODUCT_SUCCESS:
			return {
				...state,
				loading: false,
				products: [...state.products, action.payload]
			}
		case ADD_PRODUCT_ERROR:
		case DOWNLOAD_PRODUCTS_ERROR:
		case PRODUCT_DELETED_ERROR:
		case PRODUCT_EDITED_ERROR:
			return {
				...state,
				loading: false,
				error: action.payload,
				productDeleted: null
			} 
		case DOWNLOAD_PRODUCTS_SUCCESS:
			return{
				...state,
				loading: false,
				error: null,
				products: action.payload
			}
		case GET_PRODUCT_DELETED: 
		return {
			...state, 
			productDeleted: action.payload
		}
		case PRODUCT_DELETED_SUCCESS:
			return{
				...state,
				products: state.products.filter(product=> product.id !== state.productDeleted),
				productDeleted: null
			}
		case GET_PRODUCT_EDIT:
			return{
				...state,
				productEdit: action.payload
			}
		case PRODUCT_EDITED_SUCCESS: 
			return {
				...state,
				productEdit: null,
				products: state.products.map( product => 
					product.id === action.payload.id 
						? product = action.payload 
						: product
				)
			}
		default:
			return state;
	}
}