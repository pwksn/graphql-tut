import { useQuery, useMutation } from '@apollo/client';
import { useState } from 'react';
import {
	getAuthorsQuery,
	addBookMutation,
	getBooksQuery,
} from '../queries/queries';

const AddBook = () => {
	const { loading, error, data } = useQuery(getAuthorsQuery);
	const [addBook] = useMutation(addBookMutation);
	const [book, setBook] = useState({
		name: '',
		genre: '',
		authorId: '',
	});

	const displayAuthors = () => {
		return data.authors.map((author) => {
			return (
				<option key={author.id} value={author.id}>
					{author.name}
				</option>
			);
		});
	};

	const submitForm = (e) => {
		e.preventDefault();
		addBook({
			variables: {
				name: book.name,
				genre: book.genre,
				authorId: book.authorId,
			},
			refetchQueries: [{ query: getBooksQuery }],
		});
	};

	if (loading) return <p>Loading...</p>;
	if (error) return <p>Error :(</p>;

	return (
		<form id='add-book' onSubmit={submitForm}>
			<div className='field'>
				<label>Book name:</label>
				<input
					type='text'
					onChange={(e) => setBook({ ...book, name: e.target.value })}
				/>
			</div>
			<div className='field'>
				<label>Genre:</label>
				<input
					type='text'
					onChange={(e) =>
						setBook({ ...book, genre: e.target.value })
					}
				/>
			</div>
			<div className='field'>
				<label>Author:</label>
				<select
					onChange={(e) =>
						setBook({ ...book, authorId: e.target.value })
					}
				>
					<option>Select author</option>
					{displayAuthors()}
				</select>
			</div>
			<button>+</button>
		</form>
	);
};

export default AddBook;
