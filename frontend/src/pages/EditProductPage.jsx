import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";


const EditProductPage = () => {

    const {id} = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);


    // variables for the form
    const [title, setTitle] = useState('');
    const [category, setCategory] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [supplierName, setSupplierName] = useState('');
    const [contactEmail, setContactEmail] = useState('');
    const [contactPhone, setContactPhone] = useState('');
    const [rating, setRating] = useState('');
    const navigate = useNavigate();
    

    const user = JSON.parse(localStorage.getItem('user'));
    const token = user ? user.token : null;
    
    const updateProduct = async (product) => {
        try{
            const response = await fetch(`/api/products/${product.id}`,{
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(product),
            });
            if(!response.ok){
                throw new Error('Failed to update product');
            }else{
                return response.ok;
            }
        }catch(err){
            console.error('Error updating product', err);
            return false;
        }
    }

    useEffect(()=> {
        const fetchProduct = async () => {
            try{
            const response = await fetch(`/api/products/${id}`);
            if(!response.ok){
                throw new Error('Failed to get product');
            }else{
                const data = await response.json(); //we were missing   an await
                //console.log(data)
                setProduct(data);

                setTitle(data.title);
                setCategory(data.category);
                setDescription(data.description);
                setPrice(data.price);
                setSupplierName(data.supplier.name);
                setStockQuantity(data.stockQuantity);
                setContactEmail(data.supplier.contactEmail);
                setContactPhone(data.supplier.contactPhone);
                setRating(data.supplier.rating);
            }
        }catch(err){
            console.error('Failed to retrieve product', err);
            setError(error.message);
        }finally {
            setLoading(false);
        }
    }
    fetchProduct();

    }, [id]);

    const submitForm = async (e) => {
        e.preventDefault();

        const updatedProduct = {
            id,
            title,
            category,
            description,
            price,
            stockQuantity,
            supplier: {
                name: supplierName,
                contactEmail,
                contactPhone,
                rating
                },
            }
            const success = await updateProduct(updatedProduct);
            if(success){
                alert('Product updated! ☆*: .｡. o(≧▽≦)o .｡.:*☆');
                navigate(`/products/${id}`);
            }else{
                alert('Update failed! 😔');
            }


        }

    return (
    <div className="create">
      <h2>Edit Product</h2>
      {loading ? (
            <p>Loading...</p>
        ) : error ? (
            <p>{error}</p>
        ) : (
            <form onSubmit={submitForm}>
                <label>Product title:</label>
                <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                />
                <label>Product category:</label>
                <input 
                type="text"
                required
                value={category}
                onChange={(e)=> setCategory(e.target.value)}
                />

                <label>Product Description:</label>
                <textarea
                required
                value={description}
                onChange={(e)=> setDescription(e.target.value)}

                ></textarea>
                <label>Price (€):</label>
                <input
                type="number"
                required
                value={price}
                onChange={(e)=> setPrice(e.target.value)}
                />
                <label>Stock quantity:</label>
                <input
                type="number"
                required
                value={stockQuantity}
                onChange={(e)=> setStockQuantity(e.target.value)}
                />
                <label>Supplier name:</label>
                <input
                type="text"
                required
                value={supplierName}
                onChange={(e)=> setSupplierName(e.target.value)}
                />
                <label>Contact Email:</label>
                <input
                type="text"
                required
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                />
                <label>Contact Phone:</label>
                <input
                type="text"
                required
                value={contactPhone}
                onChange={(e) => setContactPhone(e.target.value)}
                />
                <label>Rating:</label>
                <input
                type="number"
                required
                step='any'
                min= '1'
                max='5'
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                />
                <button>Save Product</button>
            </form>
        )}
    </div>
  );
}


export default EditProductPage;