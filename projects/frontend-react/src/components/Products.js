import React from 'react';
import Moment from 'react-moment';
import {useSelector} from 'react-redux'
import 'moment/locale/es';
import ImageDefault from '../assets/images/default.png';
function Products() {
    const { loading, products, success, error } = useSelector((state) => state.product)
    return  (
        <>
            {
                products && products.length > 0 ? (
                    products.map((product) => (
                        <article key={product._id} className="article-item" id="article-template">
                            <div className="image-wrap">
                                {
                                    product.image !== null ? (
                                        <img src={product.image} alt={product.name} />
                                    ) : (
                                        <img src={ImageDefault} alt={product.name}/>
                                    )
                                }
                            </div>
                            <h2><strong>Name: </strong> {product.name}</h2>
                            <h2><strong>Description: </strong>{product.description}</h2>
                            <span className="date">
                                <h2>
                                    <strong>Creation date: </strong>
                                    <Moment locale="es" fromNow>{product.created_at}</Moment>
                                </h2>
                                <h2>
                                    <strong>Update date: </strong>
                                    <Moment locale="es" fromNow>{product.updated_at}</Moment>
                                </h2>
                            </span>
                            <div className="clearfix"></div>
                        </article>
                    ))

                ) : products.length === 0 && success === 'success' ? (
                    <div id="articles">
                        <h2 className="subheader">No hay articulos para mostrar</h2>
                        <p>No hay productos para mostrar</p>
                    </div>
                ) : products.length === 0 ? (
                    <div id="articles">
                        <p>No hay productos para mostrar</p>
                    </div>
                ) : error ? (
                    <div id="articles">
                        <p>Ocurrio un error al consultar los productos...</p>
                    </div>
                ) : loading && (
                    <div id="articles">
                        <p>Espere mientras carga el contenido</p>
                    </div>
                )
            }
        </>
    )
}
export default Products;