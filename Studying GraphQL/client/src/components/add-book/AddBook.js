import React, { useState } from 'react';
import { getAuthorQuery, addBookMutation, getBooksQuery, getBookQuery } from '../../queries/queries';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useFormik } from 'formik';

function AddBook () {

    const [ addBook ] = useMutation(addBookMutation);
    const { loading, error, data } = useQuery(getAuthorQuery);

    const formik = useFormik ({
        initialValues: {
            name: '',
            genre: '',
            authorId: ''
        },
        onSubmit: values => {
            console.log(values)
            addBook({ variables: {
                name: values.name,
                genre: values.genre,
                authorId: values.authorId
            },
            refetchQueries: [{query: getBooksQuery}]
        })
        }
    })
    
    if(loading) return <p>Loading...</p>
    if(error) return <p> Error :( </p>
    
    return (
        <form id='add-book' onSubmit={formik.handleSubmit}>
            <div className='field'>
                <label >Book name:</label>
                <input 
                    placeholder='insert book name'
                    type='text'
                    name='name'
                    onChange={formik.handleChange}
                    value={formik.values.name}
                />
            </div>
            
            <div className='field'>
                <label>Genre:</label>
                <input 
                    type='text' 
                    value={formik.values.genre}
                    onChange={formik.handleChange}
                    name='genre'
                    placeholder='insert book genre'
                />
            </div>

            <div className='field'>
                <label>Author:</label>
                <select
                    type='selector'
                    value={formik.values.author}
                    onChange={formik.handleChange}
                    name='authorId'
                >
                    <option hidden>Select author</option>
                    {data.authors.map((author) => {
                        return (
                            <option key={author.id} value={author.id}>{author.name}</option>
                        )
                    })}
                </select>
            </div>

            <button type='submit'>+</button>
        </form>
    )
};

export default AddBook;