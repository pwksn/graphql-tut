import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { getBooksQuery } from '../queries/queries';
import BookDetails from './BookDetails';

const BookList = () => {
	const { loading, error, data } = useQuery(getBooksQuery);
	const [selectedBook, setSelectedBook] = useState(null);

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<div>
			<ul id='book-list'>
				{data.books.map((book) => (
					<li key={book.id} onClick={() => setSelectedBook(book.id)}>
						{book.name}
					</li>
				))}
			</ul>
			<BookDetails bookId={selectedBook} />
		</div>
	);
};

export default BookList;
