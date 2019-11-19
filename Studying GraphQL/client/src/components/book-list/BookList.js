import React, { useState, useEffect } from 'react';
import { getBooksQuery } from '../../queries/queries';
import { useQuery } from '@apollo/react-hooks';
import BookDetails from '../book-details/Book.Details';

function BookList () {
    const { loading, error, data } = useQuery(getBooksQuery);
    const [ booksList, setBooksList ] = useState([]);
    const [ selected, setSelected ] = useState(null);
    const [ searchDetail, setSearch ] = useState(false);
   
    if(loading) return <p>Loading...</p>;

    if(error) {
        console.log(error); 
        return <p>Error :( </p>
        };
    
    return (
        <>
            
            <ul id='book-list'>
                {data.books.map((book) => {
                    return (
                        <li 
                            key={book.id}
                            onClick={() => {setSelected(book.id); setSearch(true)}}
                        >
                            {book.name}
                        </li>
                    )
                })}
            </ul>
            
            <BookDetails selected={selected} searchDetail={searchDetail} />
        </>
    )
    
};

export default BookList;