import React from 'react'
import { useDispatch } from 'react-redux';
import {  useHistory } from 'react-router-dom';
import { deletedProductAction, editProductAction } from '../redux/actions/productActions';
import Swal from 'sweetalert2';

export const Product = ({ product }) => {
	const { name, price, id } = product;

	const dispatch = useDispatch();
	const history = useHistory();

	//confirm if the user wants to delete
	const confirmDeleteProduct = id => {
		//Ask user
		Swal.fire({
			title: '¿Estas seguro?',
			text: "Un producto eliminado no se puede recuperar!",
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Si, eliminar!',
			cancelButtonText: 'Cancelar'
		}).then((result) => {
			if (result.isConfirmed) {
				//To Action
				dispatch(deletedProductAction(id));
			}
		})
	}

	//Function to redirect 
	const redirectEdit = product => {
		dispatch(editProductAction(product))
		history.push(`/productos/editar/${product.id}`)
	}

	return (
		<tr>
			<td>{name}</td>
			<td><span className="font-weight-bold">${price}</span></td>
			<td className="acciones">
				<button type="button" onClick={()=>redirectEdit(product)} className="btn btn-primary mr-2">
					Editar
				</button>
				<button
					type="button"
					className="btn btn-danger"
					onClick={() => confirmDeleteProduct(id)}
				>Eliminar</button>
			</td>
		</tr>
	)
}
