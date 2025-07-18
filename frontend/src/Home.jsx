import { Link, useParams } from "react-router-dom"
import { useGetNewProductsQuery } from "./redux/api/productApiSlice.js"
import Loader from "./components/Loader.jsx"
import Header from "./components/Header.jsx"
import Message from "./components/Message.jsx"
import Product from "./pages/Products/Product.jsx"

const Home = () => {
    const {keyword} = useParams();
    const {data, isLoading, isError} = useGetNewProductsQuery({keyword});
    console.log(data)


  return (
    <>
    {!keyword? <Header/>: null}
    {isLoading? <Loader/> : isError? (<Message variant='danger'>
        {isError?.data.message || isError?.error}
    </Message>):(
        <>
        <div className="flex justify-between items-center ">
            <h1 className="ml-[20rem] mt-[10rem] text-[3rem]">
                Special Products
            </h1>
            <Link to='/shop' className="bg-pink-600 font-bold rounded-full py-2 px-10 mr-[18rem] mt-[10rem]">
            Shop
            </Link>
            </div>
            <div>
            <div className="flex justify-center flex-wrap mt-[2rem]">
                {data.map((product)=>(
                    <div>
                        <Product product={product} />
                    </div>
                ))}
            </div>
        </div>
        </>
    )}
    </>
  )
}

export default Home