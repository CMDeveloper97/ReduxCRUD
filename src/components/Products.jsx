import React,{Fragment, useEffect} from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getProductsActions } from '../redux/actions/productActions';
import { Product } from './Product';
 
export const Products = () => {

	const dispatch = useDispatch();
	useEffect(() => {
		//Consulte API
		const getProducts = () => dispatch(getProductsActions());
		getProducts(); 
		//eslint-disable-next-line
	}, []);

	//obtain state
	const products = useSelector(state=>state.products.products);
	const error = useSelector(state => state.products.error);
	const loading = useSelector(state => state.products.loading);


	return (
		<>
		<h2 className="text-center my-5">Listado de Productos</h2> 
		{error && <p className="font-weight-bold alert alert-danger text-center mt-4">Hubo un error</p>}
		{loading && <p className="text-center">Cargando...</p>}

		<table className="table table-striped">
			<thead className="bg-primary table-dark">
				 <tr>
					 <th scope="col">Nombre</th>
					 <th scope="col">Precio</th>
					 <th scope="col">Acciones</th>
				 </tr>
			</thead>
			<tbody>
				 {products.length === 0 ? 'No hay productos' : (
					 products.map(product => (
						 <Product key={product.id} product={product}/>
					 ))
				 )}
			</tbody>
		</table>
	</>
	)
}
