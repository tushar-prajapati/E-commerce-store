import { useState } from "react"
import { toast } from "react-toastify"
import { 
    useCreateCategoryMutation,
   useUpdateCategoryMutation,
   useDeleteCategoryMutation,
   useFetchCategoriesQuery 
 } from "../../redux/api/categoryApiSlice.js"
import CategoryForm from "../../components/CategoryForm.jsx";
import Modal from "../../components/Modal.jsx";


const CategoryList = () => {
    const {data: categories, refetch} = useFetchCategoriesQuery();
    const [name, setName] = useState('')
    const [selectedCategory, setSelectedCategory] = useState(null)
    const [updatedName, setUpdatedName] = useState('')
    const [modalVisible, setModalVisible] = useState(false);
    const [createCategory] = useCreateCategoryMutation();
    const [updateCategory] = useUpdateCategoryMutation();
    const [deleteCategory] = useDeleteCategoryMutation();

    const handleCreateCategory=async(e)=>{
        e.preventDefault();
        if(!name){
            toast.error('Category name is required');
            return 
        }
        try {
            const result = await createCategory({name}).unwrap()
            if(result.error){
                toast.error(result.error);
            }
            else{
                toast.success(`Successfully created ${result.name} category`)
                refetch();
                setName('')
                
            }

        } catch (error) {
            toast.error('Creating category failed')
        }
    }

    const handleUpdateCategory = async(e)=>{
        e.preventDefault();
        if(!updatedName){
            toast.error("Category name is required")
            return
        }

        try {
            const res = await updateCategory({categoryId: selectedCategory._id, updatedCategory: {
                name: updatedName,
            }});
            if(res.error){
                toast.error(res.error)
            }
            else{
                toast.success(`${updatedName} is updated`)
                setSelectedCategory(null)
                setUpdatedName('')
                setModalVisible(false)
                refetch();
            }

            
        } catch (error) {
            toast.error(error)
        }

    }
    const handleDeleteCategory = async()=>{
        try {
            const result = await deleteCategory(selectedCategory._id).unwrap()
            if(result.error){
                toast.error(result.error)
            }
            else{

                toast.success(`${result.name} is deleted successfully`)
                refetch();
                setModalVisible(false)
                selectedCategory(null)
                
            }
        } catch (error) {
            toast.error(error)
        }
    }

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
        {/* Admin Menu */}
        <div className="md:w-3/4 p-3">
            <div className="h-12">Manage Categories</div>
            <CategoryForm color="text-white" name={name} setValue={setName} handleSubmit={handleCreateCategory} />
            <br /><hr />
            <div className="flex flex-wrap">
                {categories?.map(category=>(
                    <div key={category._id}>
                        <button className="bg-white border border-pink-500 text-pink-500 py-2 px-4 rounded-lg m-3 hover:bg-pink-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-50" onClick={()=>{
                            setModalVisible(true)
                            setSelectedCategory(category)
                            setUpdatedName(category.name)
                            }}>{category.name}</button>
                    </div>
                ))}
            </div>

                <Modal className='modal-btn' isOpen={modalVisible} onClose={()=>setModalVisible(false)}>
                    <CategoryForm color="text-black" value={updatedName} setValue={value=>setUpdatedName(value)}
                    handleSubmit={handleUpdateCategory}
                    buttonText="Update"
                    handleDelete={handleDeleteCategory}
                    />
                    
                </Modal>

        </div>
    </div>
  )
}

export default CategoryList