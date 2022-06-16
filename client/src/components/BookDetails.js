import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import { getBookQuery } from '../queries/queries';

const BookDetails = ({ bookId }) => {
	const { loading, error, data } = useQuery(getBookQuery, {
		variables: { id: bookId },
	});

	const displayBookDetails = () => {
		const { book } = data;
		if (!book) return <></>;
		return (
			<div>
				<h2>{book.name}</h2>
				<p>{book.genre}</p>
				<p>{book.author.name}</p>
				<p>All books by this author:</p>
				<ul className='other-books'>
					{book.author.books.map((book) => (
						<li key={book.id}>{book.name}</li>
					))}
				</ul>
			</div>
		);
	};

	return <div id='book-details'>{data && displayBookDetails()}</div>;
};

export default BookDetails;
