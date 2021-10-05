import { axiosClient } from '../../config/axios';
import Swal from 'sweetalert2';

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
	START_EDIT_PRODUCT,
	PRODUCT_EDITED_ERROR,
	PRODUCT_EDITED_SUCCESS
} from '../types'; 

// Create new products --------------------------------------------------------------------------
export function createNewProductAction(product){
	return async (dispatch) => {
		dispatch(addProduct())

		try {
			//insert on the API
			await axiosClient.post('/productos', product); 

			//If all is okay, update state
			dispatch(addProductSuccess(product))

			//Alert
			Swal.fire(
				'Correcto',
				'El producto se agrego correctamente',
				'success'
			)

		} catch (error) {
			//if there an error
			console.log(error);
			dispatch(addProductError(true))
			// Error Alert
			Swal.fire({
				icon:'error',
				title: 'Hubo un error',
				text:'Hubo un error intenta de nuevo.'
			})
		}
	}
}
 
const addProduct = () => ({
	type: ADD_PRODUCT,
	payload: true
})

const addProductSuccess = product => ({
	type: ADD_PRODUCT_SUCCESS,
	payload: product
});

const addProductError = error => ({
	type: ADD_PRODUCT_ERROR,
	payload: error
});

//Function to download db products ---------------------------------------------------------------
export const getProductsActions = () => {
	return async(dispatch) => {
		dispatch(downloadProducts())

		try {
			const response = await axiosClient.get('/productos');
			dispatch(getProductsSuccess(response.data))

		} catch (error) {
			//if there an error
			console.log(error);
			dispatch(getProductsError(true))
		}

	}
}

const downloadProducts = () => ({
	type: START_DOWNLOAD_PRODUCTS,
	payload: true
});

const getProductsSuccess = products => ({
	type: DOWNLOAD_PRODUCTS_SUCCESS,
	payload: products
});

const getProductsError = error => ({
	type: DOWNLOAD_PRODUCTS_ERROR,
	payload: error
});

//Function to delete db products -----------------------------------------------------------------
export const deletedProductAction = (id) => {
	return async(dispatch) => {

		dispatch(deleteProducts(id));
		
		try {
			await axiosClient.delete(`/productos/${id}`); 
			dispatch(deleteProductSuccess());

			Swal.fire(
				'Eliminado!',
				'El producto se elimino correctamente.',
				'success'
			)

		} catch (error) {
			//if there an error
			console.log(error);
			dispatch(deleteProductError(true))
		}

	}
}

const deleteProducts = (id) => ({
	type: GET_PRODUCT_DELETED,
	payload: id
});

const deleteProductSuccess = () => ({
	 type: PRODUCT_DELETED_SUCCESS
});

const deleteProductError = error => ({
	type: PRODUCT_DELETED_ERROR,
	payload: error
});

//Function to edition  -----------------------------------------------------------------
export const editProductAction = (product) => {
	return async(dispatch) => {
		dispatch(editProduct(product)); 
	}
}

const editProduct = product => ({
	type: GET_PRODUCT_EDIT,
	payload: product
})

//Edit a register on api and state ------------------------------------------------------
export function editProductApiAction(product){
	return async(dispatch) => {
		dispatch(editProductApi())
		try {
			await axiosClient.put(`/productos/${product.id}`, product) 
			dispatch(editProductApiSUCCESS(product))
		} catch (error) {
			console.error(error);
			editProductApiError(true);
		}
	}
}

const editProductApi = () => ({
	type:START_EDIT_PRODUCT
})

const editProductApiSUCCESS = product => ({
	type: PRODUCT_EDITED_SUCCESS,
	payload: product
})

const editProductApiError = error => ({
	type: PRODUCT_EDITED_ERROR,
	payload: error
});
