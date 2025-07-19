import Message from "../../components/Message.jsx";
import Loader from "../../components/Loader.jsx";
import { Link } from "react-router-dom";
import { useGetMyOrdersQuery, useDeleteOrderByIdMutation } from "../../redux/api/orderApiSlice.js";
import { FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";


const UserOrder = () => {
  const { data: orders, isLoading, error, refetch } = useGetMyOrdersQuery();
  const [deleteOrderById, {isLoading: isDeleting}] = useDeleteOrderByIdMutation();

  const deleteOrder =async (e, orderId) =>{
    e.preventDefault();
    try {
      const res = await deleteOrderById({orderId}).unwrap();
      if(res?.success){
        toast.success("Order deleted successfully")
        refetch();
      }
    } catch (error) {
      toast.error("Failed to delete Order")
    }
  } 

  return (
    <div className="container mx-auto ml-[6rem]">
      <h2 className="text-2xl font-semibold mb-4">My Orders </h2>

      {isLoading ? (
        <Loader />
      ) : error ? (
        <Message variant="danger">{error?.data?.error || error.error}</Message>
      ) : (
        <table className="w-full">
          <thead>
            <tr>
              <td className="py-2">IMAGE</td>
              <td className="py-2">ID</td>
              <td className="py-2">DATE</td>
              <td className="py-2">TOTAL</td>
              <td className="py-2">PAID</td>
              <td className="py-2">DELIVERED</td>
              <td className="py-2"></td>
              <td className="py-2"></td>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <img
                  src={order.orderItems[0].image}
                  alt={order.user}
                  className="w-[6rem] mb-5"
                />

                <td className="py-2">{order._id}</td>
                <td className="py-2">{order.createdAt.substring(0, 10)}</td>
                <td className="py-2">$ {order.totalPrice}</td>

                <td className="py-2">
                  {order.isPaid ? (
                    <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                      Pending
                    </p>
                  )}
                </td>

                <td className="px-2 py-2">
                  {order.isDelivered ? (
                    <p className="p-1 text-center bg-green-400 w-[6rem] rounded-full">
                      Completed
                    </p>
                  ) : (
                    <p className="p-1 text-center bg-red-400 w-[6rem] rounded-full">
                      Pending
                    </p>
                  )}
                </td>

                <td className="px-2 py-2">
                  <Link to={`/order/${order._id}`}>
                    <button className="bg-pink-400 text-back py-2 px-3 rounded">
                      View Details
                    </button>
                  </Link>
                </td>
                <td className="px-2 py-2"> 
                    <button 
                    onClick={(e)=>deleteOrder(e,order._id)}
                    className="bg-red-500 hover:bg-red-600 py-2 px-2 rounded">
                      <FaTrash/>
                    </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default UserOrder;