import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import './styles/add-category.scss';
import restClient from '../../../../config/axios';
// import { CategoryView } from '../../../Home';
import { Grid, Skeleton } from '@mui/material';
// import clsx from 'clsx';
import { useAlert } from '../../../../hooks/NotificationSnackbar';
import CommonModal from '../../../../components/CommonModal';
// import { useSelector } from 'react-redux';

const Category = (props) => {
    const { title = '+ Add Category' } = props;
    const categoryFormInitialData = {
        name: '',
        image: null
    };
    const [categoryForm, setCategoryForm] = useState(categoryFormInitialData);
    const [categories, setCategories] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const { showSuccessAlert, showErrorAlert } = useAlert();
    const [openModal, setOpenModal] = useState(false);

    const updateCategoryForm = (data) => {
        if (data) {
            setCategoryForm({ ...categoryForm, ...data });
        }
    };

    const handleOnChange = (e) => {
        const { target } = e || {};
        if (target) {
            updateCategoryForm({ [target.name]: target.value });
        }
    };

    const handleFileUpload = (e) => {
        updateCategoryForm({ image: e.target.files[0], preview: URL.createObjectURL(e.target.files[0]) });
    };

    useEffect(() => {
        getAllCategories();
    }, []);

    const handleDeleteCategory = async (id) => {
        const apiUrl = '/api/categories/deleteCategory/' + id;
        const { data } = await restClient(apiUrl, { method: 'DELETE' });
        if (data.responseData) {
            setCategories(data.responseData);
        }
    };

    const handleAddEditCategory = async (e) => {
        e.preventDefault();
        if (!categoryForm.image) return;
        try {
            const formData = new FormData();
            formData.append('image', categoryForm.image);
            formData.append('name', categoryForm.name);
            if (editMode) {
                formData.append('id', categoryForm._id);
            }
            const apiUrl = `/api/categories/${editMode ? 'updateCategory' : 'addCategory'}`;
            const { data: responseData } = await restClient(apiUrl, {
                method: editMode ? 'PUT' : 'POST',
                headers: { 'Content-Type': 'multipart/form-data' },
                data: formData
            });
            if (responseData?.responseData?.length) {
                setCategories(responseData);
            }
            setCategoryForm(categoryFormInitialData);
            handleCloseModal();
            showSuccessAlert(`Category ${categoryForm.name} ${editMode ? 'updated' : 'added'}`);

        } catch (error) {
            console.error('Data and image upload error:', error);
            showErrorAlert('Data and image upload error');
        }
    };

    const getAllCategories = async () => {
        const apiUrl = '/api/vendor/categories';
        const { data } = await restClient(apiUrl);
        setCategories(data);
    };

    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
        setCategoryForm(categoryFormInitialData);
    };

    const modalActions = [
        {
            label: 'Cancel',
            color: 'secondary',
            onClick: handleCloseModal,
        },
        {
            label: editMode ? 'Edit' : 'Save',
            color: 'primary',
            onClick: (e) => handleAddEditCategory(e),
        },
    ];

    return (
        <article className='category-view'>
            <button className='capitalize black-button !max-w-xs' onClick={() => { handleOpenModal(); }}>
                <strong> {title}</strong>
            </button>
            <CommonModal
                open={openModal}
                onClose={handleCloseModal}
                title={editMode ? 'Edit Category' : 'Add New Category'}
                actions={modalActions}
            >
                <AddEditCategoryForm editMode={editMode} handleFileUpload={handleFileUpload} handleOnChange={handleOnChange} data={categoryForm}
                    handleAddEditCategory={handleAddEditCategory}
                ></AddEditCategoryForm>
            </CommonModal>
            <section className='mt-10'>
                <Grid container spacing={2}>
                    {categories.map(category => (
                        <Grid key={'category-' + category.name} item sm={3} className='pt-5 pb-5 pl-2 pr-2'>
                            <section className='card-block flex flex-col'>
                                <img className='image-cover-h100 flex-1' loading='lazy' src={category.image} alt={category.name} ></img>
                                <p><strong>{category.name}</strong></p>
                            </section>
                            <section className='flex gap-4 cursor-pointer'>
                                <section onClick={() => {
                                    updateCategoryForm({ ...category, preview: category.image });
                                    setEditMode(true);
                                }}>
                                    Edit
                                </section>
                                <section onClick={() => handleDeleteCategory(category._id)}>
                                    Delete
                                </section>
                            </section>
                        </Grid>
                    ))}
                    {!categories.length && Array.from({ length: 4 }, () => ({})).map(category => (
                        <Grid key={'category-' + category.name} item sm={3} className='pt-5 pb-5 pl-2 pr-2'>
                            <section className='card-block flex flex-col'>
                                <Skeleton variant='rectangular' className='image-cover-h100 flex-1' ></Skeleton>
                                <Skeleton variant='text' ></Skeleton>
                            </section>
                        </Grid>
                    ))
                    }
                </Grid>
                {/* <CategoryView title="Category List" categories={categories.slice(1, categories.length - 1)}></CategoryView> */}
            </section>
        </article>

    );
};

export default Category;

Category.propTypes = {
    title: PropTypes.string,
};

const AddEditCategoryForm = ({
    data = {}, handleOnChange, handleFileUpload,
}) => (
    <form className='p-4' style={{
        border: '1px solid #fcb800',
    }} action={e => e.preventDefault()}>
        <section className='flex'>
            <section>
                <section className='mb-2'>
                    <label htmlFor='name' className='mr-2'>
                        Name
                    </label>
                    <input name='name' placeholder='Enter category name' value={data.name} onChange={handleOnChange}></input>
                </section>
                <section className='mb-2' >
                    <label htmlFor='image' className='mr-2'>
                        <input name='image' className='mb-2' type='file' accept="image/*" onChange={handleFileUpload}></input>
                    </label>
                </section>
            </section>
            <section>
                {
                    data.preview ?
                        <img className='preview-category' src={data.preview} alt={data.name}></img>
                        : null
                }
            </section>
        </section>
        <section>
        </section>
    </form>
);

AddEditCategoryForm.propTypes = {
    data: PropTypes.object,
    handleOnChange: PropTypes.func,
    handleFileUpload: PropTypes.func,
    handleAddEditCategory: PropTypes.func,
    handleAddCategory: PropTypes.func,
    editMode: PropTypes.bool,
    isValid: PropTypes.bool,
};