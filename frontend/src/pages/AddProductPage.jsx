import {useState} from 'react';
import {useNavigate} from 'react-router-dom';


const AddProductPage = () => {

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

  const addProduct = async (newProduct) => {
    try{
      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
          
        },
        body: JSON.stringify(newProduct)
      });

      if(response.ok){
        console.log('Product added successfully!');
        navigate('/');
      }else{
        console.error('Failed to add product');
      }
    }catch(err){
      console.error('Error adding product', err);
    }
  }
  
  const submitForm = (e) => {
    e.preventDefault();
    console.log("submitForm called");

    if(!title || !category || !description || 
      !price || !stockQuantity || !supplierName || 
      !contactEmail || !contactPhone || !rating){
      alert('All fields must be filled!');
    }

    const newProduct = {
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
    addProduct(newProduct);
   
  };

  return (
    <div className="create">
      <h2>Add a New Product</h2>
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
        <button>Add Product</button>
      </form>
    </div>
  );
};

export default AddProductPage;
