import React from 'react'
import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useUpdateProductMutation, useDeleteProductMutation, useGetProductByIdQuery, useUploadProductImageMutation } from '../../redux/api/productApiSlice.js'
import { useFetchCategoriesQuery } from '../../redux/api/categoryApiSlice.js'
import { toast } from 'react-toastify'
import AdminMenu from './AdminMenu.jsx'

const ProductUpdate = () => {
    const params = useParams()
    const {data: productData} = useGetProductByIdQuery(params.id)
    const [image, setImage]  = useState(productData?.image || "")
    const [name, setName]  = useState(productData?.name || "")
    const [description, setDescription]  = useState(productData?.description || "")
    const [price, setPrice]  = useState(productData?.price || "")
    const [category, setCategory] = useState(productData?.category || '')
    const [brand, setBrand] = useState(productData?.brand || '')
    const [stock, setStock] = useState(productData?.countInStock || '')
    const [quantity, setQuantity] = useState(productData?.quantity || '')


    const navigate = useNavigate();

    const {data: categories = []} = useFetchCategoriesQuery()
    const [uploadProductImage] = useUploadProductImageMutation()
    const [updateProduct] = useUpdateProductMutation()
    const [deleteProduct]= useDeleteProductMutation() 

    useEffect(()=>{
        if(productData && productData._id){
            setName(productData.name)
            setDescription(productData.description)
            setPrice(productData.price)
            setCategory(productData.category)
            setQuantity(productData.quantity)
            setBrand(productData.brand)
            setImage(productData.image)
            setStock(productData.countInStock)
        }
    }, [productData]);

    const uploadFileHander = async (e)=>{
        const formData = new FormData();
        formData.append('image', e.target.files[0])
        try {
            const res = await uploadProductImage(formData).unwrap()
            if(res?.success){
            toast.success("Image Uploaded Successfully")
            setImage(res.imageUrl)
            
            }
            else{
                toast.error("Failed to upload image")
            }
        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }

    const handleSubmit = async(e)=>{
        e.preventDefault();
        try {

            const formData = new FormData();
            formData.append('image', image);
            formData.append('name', name);
            formData.append('description', description);

            formData.append('price', price);
            formData.append('category', category);

            formData.append('quantity', quantity);
            formData.append('brand', brand);

            formData.append('countInStock', stock);



            const {data}= await updateProduct({productId: params.id,formData});

            console.log(data)
            if(data.error){
                toast.error(data.error)
            } else{
                toast.success(`${data.name} successfully updated`)
                navigate('/admin/allproductslist')
            }
        } catch (error) {
            toast.error("hello")
        }
    }
    const handleDelete = async()=>{
        try {
            let answer = window.confirm('Are you Sure?')
            if(!answer){
                return;
            }
            const {data} = await deleteProduct(params.id)
            toast.success(`${data?.name} is deleted`)
            navigate('/admin/allproductslist')
        } catch (error) {
            toast.error('Delete Failed')
        }
    }

  return (
    <div className='container xl:mx-[9rem] sm:mx-[0]'>
        <div className='flex flex-col md:flex-row'>
            <AdminMenu/>
            <div className='md:w-3/4 p-3'>
                <div className='h-12'>Update Product</div>
                {image && (
                    <div className='text-center'>
                    <img src={image} alt="Product" className='block mx-auto max-h-[200px]'/>    
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
                        <select value={category} className='p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white cursor-pointer'
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
                <div>
                <button 
                onClick={handleSubmit}
                className='py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-green-600 mr-6'>Update</button>
                <button 
                onClick={handleDelete}
                className='py-4 px-10 mt-5 rounded-lg text-lg font-bold bg-pink-600'>Delete</button>
                </div>
            </div>
        </div>

    </div>
  )
}

export default ProductUpdate