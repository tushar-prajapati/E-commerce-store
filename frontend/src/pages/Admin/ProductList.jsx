import React from 'react'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
    useCreateProductMutation,
    useUploadProductImageMutation
} from '../../redux/api/productApiSlice.js'
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice.js'
import { toast } from 'react-toastify'
import AdminMenu from './AdminMenu.jsx'

const ProductList = () => {
    const [image, setImage] = useState('')
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [price, setPrice] = useState('')
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState('')
    const [brand, setBrand] = useState('')
    const [stock, setStock] = useState(0)
    const [imageUrl, setImageUrl] = useState(null)
    const navigate = useNavigate()
    const [uploadProductImage] = useUploadProductImageMutation()
    const [createProduct] = useCreateProductMutation()
    const {data: categories} =useFetchCategoriesQuery()


    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {

            const productData = new FormData();
            productData.append('image', imageUrl);
            productData.append('name', name);
            productData.append('description', description);

            productData.append('price', price);
            productData.append('category', category);

            productData.append('quantity', quantity);
            productData.append('brand', brand);

            productData.append('countInStock', stock);


            const {data}= await createProduct(productData);
            console.log(data)
            if(data.error){
                toast.error("Product Creating failed. Please Try again")
            } else{
                toast.success(`${data.name} is created`)
                navigate('/')
            }
        } catch (error) {
            toast.error("Product Creating failed. Please Try again")
        }
    }
    const uploadFileHander = async (e)=>{
        const formData = new FormData();
        formData.append('image', e.target.files[0])
        try {
            const res = await uploadProductImage(formData).unwrap()
            if(res?.success){
            toast.success("Image Uploaded Successfully")
            console.log(res)
            setImage(res.imageUrl)
            setImageUrl(res.imageUrl)
            }
            else{
                toast.error("Failed to upload image")
            }
        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }


  return (
    <div className='container xl:mx-[9rem] sm:mx-[0]'>
        <div className='flex flex-col md:flex-row'>
            <AdminMenu/>
            <div className='md:w-3/4 p-3'>
                <div className='h-12'>Create Product</div>
                {imageUrl && (
                    <div className='text-center'>
                    <img src={imageUrl} alt="Product" className='block mx-auto max-h-[200px]'/>    
                     </div>
                )}
                <div className='mb-3'>
                <label className='border text-white px-4  block w-full text-center rounded-lg cursor-pointer font-bold py-11'>
                    {image? image.name: "Upload Image"}
                    <input type="file" name='image' accept='image/*' 
                    onChange={uploadFileHander}
                    className={!image? "hidden" : "text-white"}
                    />
                </label>
                </div>
                <div className='p-3'>
                    <div className="flex flex-wrap">
                        <div className="one">
                            <label htmlFor="name block">Name</label> <br />
                            <input type="text" className='p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white' value={name} onChange={e=>setName(e.target.value)} />
                        </div>
                        <div className="two ml-5">
                            <label htmlFor="name block">Price</label> <br />
                            <input type="number" className='p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white' value={price} onChange={e=>setPrice(e.target.value)} />
                        </div>
                        <div className="one">
                            <label htmlFor="name block">Quantity</label> <br />
                            <input type="number" className='p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white' value={quantity} onChange={e=>setQuantity(e.target.value)} />
                        </div>
                        <div className="two ml-5">
                            <label htmlFor="name block">Brand</label> <br />
                            <input type="text" className='p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white' value={brand} onChange={e=>setBrand(e.target.value)} />
                        </div>
                    </div>
                    <label htmlFor="" className='my-5'>Description</label>
                    <textarea type="text" className='p-2 mb-3 bg-[#101011] border w-[95%] text-white'
                    value={description}
                    onChange={e=>setDescription(e.target.value)}
                    ></textarea>
                    <div className="flex justify-between">
                        <div>
                            <label htmlFor="name block"> Count In Stock</label> <br />
                            <input type="text" className='p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white'
                            value={stock}
                            onChange={e=>setStock(e.target.value)}
                            />
                        </div>
                        <label htmlFor="">Category</label>
                        <select aria-placeholder='Choose Category' className='p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white cursor-pointer'
                        onChange={e=>setCategory(e.target.value)}
                        >
                            {categories?.map((c)=>(
                                <option key={c._id} value={c._id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>

                    </div>
                </div>
                <button 
                onClick={handleSubmit}
                className='py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600'>Submit</button>
            </div>
        </div>

    </div>
  )
}

export default ProductList