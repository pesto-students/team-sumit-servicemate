import React, { useEffect, useState } from 'react';
import PropTypes from "prop-types"
import "./styles/add-category.scss"
import restClient from '../../../../config/axios';
import { CategoryView } from '../../../Home';
// import { useSelector } from 'react-redux';

const Category = (props) => {
    const { title = '+ Add Category' } = props;
    const categoryFormInitialData = {
        name: '',
        image: null
    }
    const [categoryForm, setCategoryForm] = useState(categoryFormInitialData)
    const [categories, setCategories] = useState([])

    const updateCategoryForm = (data) => {
        if (data) {
            setCategoryForm({ ...categoryForm, ...data })
        }
    }

    const handleOnChange = (e) => {
        const { target } = e || {}
        if (target) {
            updateCategoryForm({ [target.name]: target.value })
        }
    }

    const handleFileUpload = (e) => {
        updateCategoryForm({ image: e.target.files[0] });
        generatePreview(e.target.files[0])
    }

    const generatePreview = async (imageFile) => {
        if (imageFile) {
            const reader = new FileReader();
            reader.readAsDataURL(imageFile);
            reader.onloadend = () => {
                updateCategoryForm({ preview: reader.result })
            };
        }
    }

    const handleCategorySubmit = async (e) => {
        e.preventDefault()
        if (!categoryForm.image) return;
        try {
            const formData = new FormData();
            formData.append('image', categoryForm.image);
            formData.append('name', categoryForm.name);
            const apiUrl = '/api/categories/addCategory'
            const { data: responseData } = await restClient(apiUrl, {
                method: "POST",
                headers: { 'Content-Type': 'multipart/form-data' },
                data: formData
            })
            console.log('Data and image uploaded successfully:', responseData);
            setCategoryForm(categoryFormInitialData)
        } catch (error) {
            console.error('Data and image upload error:', error);
        }

    }

    const getAllCategories = async () => {
        const apiUrl = 'api/vendor/catagories'
        const { data } = await restClient(apiUrl)
        setCategories(data)
    }

    useEffect(() => {
        getAllCategories()
    }, [])

    return (
        <article className='category-view'>
            <h3 className='capitalize'>
                {title}
            </h3>
            <form className='p-4' style={{
                border: "1px solid #fcb800",
            }} action={e => e.preventDefault()}>
                <section className='flex'>
                    <section>
                        <section className='mb-2'>
                            <label htmlFor='name' className='mr-2'>
                                Name
                            </label>
                            <input name='name' placeholder='Enter category name' onChange={handleOnChange}></input>
                        </section>
                        <section className='mb-2' >
                            <label htmlFor='category-image' className='mr-2'>
                                <input name='category-image mb-2' type='file' onChange={handleFileUpload}></input>
                            </label>
                        </section>
                    </section>
                    <section>
                        {
                            categoryForm.preview ?
                                <img className='preview-category' src={categoryForm.preview} alt={categoryForm.name}></img>
                                : null
                        }
                    </section>
                </section>
                <section>
                    <button onClick={handleCategorySubmit} className='black-button'>Save</button>
                </section>
            </form>
            <section>
                <CategoryView title="Category List" categories={categories.slice(1, categories.length - 1)}></CategoryView>
            </section>
        </article>

    );
};

export default Category;

Category.propTypes = {
    title: PropTypes.string,
}