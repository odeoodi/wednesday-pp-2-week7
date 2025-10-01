import {useState, useEffect } from 'react'
import {useParams, useNavigate} from 'react-router-dom'

const ProductPage = () => {
    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();


    const user = JSON.parse(localStorage.getItem('user'));
    const token = user ? user.token : null;

    const deleteProduct = async (id) => {
        try {
            const response = await fetch(`/api/products/${id}`,
               { method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                }
               }
            )
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`Failed to delete product: ${errorText}`)
            }
        } catch (err) {
            console.error("Error deleting product: ", err)
        }
    }

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                console.log(id)
                const response = await fetch(`/api/products/${id}`)
                
                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`Failed to fetch products: ${errorText}`)
                }
                const data = await response.json();
                setProduct(data)
            } catch (err) {
                setError(err.message)
            } finally {
                setLoading(false)
            }
        }
        fetchProduct();
    }, [id]);

    const onDeleteClick = (itemId) => {
        const confirm = window.confirm(
            "You really want to delete this nice product?" + itemId
        )
        if (!confirm) {
            return
        } else {
            deleteProduct(itemId)
            navigate("/")
        }

    }

    const onUpdateClick = (itemId) => {
        navigate(`/edit-product/${itemId}`);
    }
    


    return (
        <div className="product-preview">
            {loading ? (
                <p>Loading...</p>
            ): error ? (
                <p>{error}</p>
            ): (
                <>
                <h2>{product.title}</h2>
                <p>Category: {product.category}</p>
                <p>Description: {product.description}</p>
                <p>Price: {product.price}</p>
                <p>Stock Quantity: {product.stockQuantity}</p>
                <p>Supplier Name: {product.supplier.name}</p>
                <p>Email: {product.supplier.contactEmail}</p>
                <p>Phone: {product.supplier.contactPhone}</p>
                <p>Rating: {product.supplier.rating}</p>
                <button onClick={() => onDeleteClick(product._id)}>Delete product</button>
                <button onClick={() => onUpdateClick(product._id)}>Edit product</button>
                </>
            )}
        </div>
    )
}

export default ProductPage