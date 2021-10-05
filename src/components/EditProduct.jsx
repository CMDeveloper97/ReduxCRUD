import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router';
import { hideAlertAction, showAlertAction } from '../redux/actions/alertActions';
import { editProductApiAction } from '../redux/actions/productActions';

export const EditProduct = () => {

	const [product, setProduct] = useState({ name: '', price: '' })


	const dispatch = useDispatch();
	const editProduct = useSelector(state => state.products.productEdit);
	const alert = useSelector(state => state.alert.alert);
	const history = useHistory();

	useEffect(() => { 
		setProduct(editProduct);
	}, [editProduct])

	if (!product) { history.push('/'); return null;};

	const onChange = e =>  setProduct({...product, [e.target.name]: e.target.value});

	const submitEditProduct = e => {
		e.preventDefault();

		if(product.name.trim() === '' || product.price <= 0){
			const alert = {
				msg: "Ambos campos son obligatorios",
				classes: "alert alert-danger text-center text-uppercase p3"
			}
			dispatch(showAlertAction(alert))
			return;
		}

		dispatch(hideAlertAction())
		dispatch(editProductApiAction(product));
	}

	return (
		<div className="row justify-content-center">
			<div className="col-md-8">
				<div className="card">
					<div className="card-body">
						<h2 className="text-center mb-4 font-weight-bold">
							EDitar Producto
						</h2>

						{alert && <p className={alert.classes}>{alert.msg}</p>}

						<form onSubmit={submitEditProduct}>
							<div className="form-group">
								<label>Nombre Producto</label>
								<input
									type="text"
									className="form-control"
									placeholder="Nombre Producto"
									name="name"
									value={product.name}
									onChange={onChange}
								/>
							</div>

							<div className="form-group">
								<label>Precio Producto</label>
								<input
									type="number"
									className="form-control"
									placeholder="Precio Producto"
									name="price"
									value={product.price}
									onChange={onChange}
								/>
							</div>

							<button
								type="submit"
								className="btn btn-primary font-weight-bold text-uppercase d-block w-100"
							>Guardar cambios</button>
						</form>

					</div>
				</div>
			</div>
		</div>

	)
}
