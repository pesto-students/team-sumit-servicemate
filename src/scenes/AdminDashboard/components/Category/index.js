import React, { useState } from 'react';
import PropTypes from "prop-types"
const Category = (props) => {
    const { title = 'Category' } = props;
    const [categoryForm, setCategoryForm] = useState({
        name: '',
        src: null
    })

    const updateCategoryForm = (data) => {
        if (data) {
            setCategoryForm({ ...categoryForm, data })
        }
    }

    const handleOnChange = (e) => {
        const { target } = e || {}
        if (target) {
            updateCategoryForm({ [target.name]: target.value })
        }
    }

    const handleFileUpload = (e) => {
        const { target } = e || {}
        console.log(e.target.files);
        if (target.files) {
            updateCategoryForm({ src: URL.createObjectURL(e.target.files[0]) });
        }
    }

    return (
        <article className='category-view'>
            <h3 className='capitalize'>
                {title}
            </h3>
            <form>
                <section className='mb-2'>
                    <label htmlFor='name' className='mr-2'>
                        Name
                    </label>
                    <input name='name' placeholder='Enter category name' onChange={handleOnChange}></input>
                </section>
                <section className='mb-2' >
                    <label htmlFor='category-src' className='mr-2'>
                        <input name='category-src' type='file' onChange={handleFileUpload}></input>
                        {
                            categoryForm.src ?
                                <img src={categoryForm.src} alt={categoryForm.name}></img>
                                : null
                        }
                    </label>
                </section>
            </form>
        </article>

    );
};

export default Category;

Category.propTypes = {
    title: PropTypes.string,
}