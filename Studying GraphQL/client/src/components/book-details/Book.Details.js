import React, { useState, useEffect } from 'react';
import { useQuery, useApolloClient } from '@apollo/react-hooks';
import { getBookQuery } from '../../queries/queries';

function BookDetails (props) {
    console.log(props)
    const { error, loading, data } = useQuery(getBookQuery, { variables: { id: props.selected}})

    if ( props.searchDetail === false ) return <div id='book-details'>Selecione um Livro</div>;
    if ( props.searchDetail === true ) {
        if(error) return (<p>Erro :(</p>)
        if(loading) return (<p>Loading ...</p>)

        console.log(data)
        return (
            <div id='book-details'>
                <h2>{data.book.name}</h2>
                <p>Book genre: {data.book.genre}</p>
                <p>Wrote by: {data.book.author.name}, {data.book.author.age}</p>
                <p>Other books by this author</p>
                <ul id='other-books'>
                    {data.book.author.books.map((book) => {
                        return (
                            <li key={book.id}>{book.name}</li>
                        )
                    })}
                </ul>
            </div>
        )
    }
}

export default BookDetails;