import Book from "../model/book.model.js";

export const getBook = async(req, res) => {
    try {
        const book = await Book.find();
        res.status(200).json(book);
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json(error);
    }
};

export const addBook = async(req, res) => {
    try {
        const { name, title, price, category, image, bookOwner, contact } = req.body;
        
        // Get the count of existing books to generate the next ID
        const bookCount = await Book.countDocuments();
        const newId = bookCount + 1;

        const newBook = new Book({
            id: newId,
            name,
            title,
            price,
            category,
            image,
            bookOwner,
            contact,
            status: 'Available'
        });
        
        const savedBook = await newBook.save();
        res.status(201).json({
            message: "Book added successfully",
            book: savedBook
        });
    } catch (error) {
        console.log("Error: ", error);
        res.status(500).json({ message: "Failed to add book" });
    }
};

export const updateBook = async(req, res) => {
    try {
        const { id } = req.params;
        const { name, title, price, category, image, bookOwner, contact } = req.body;
        
        const updatedBook = await Book.findOneAndUpdate(
            { id: id },
            {
                name,
                title,
                price,
                category,
                image,
                bookOwner,
                contact
            },
            { new: true }
        );
        
        res.status(200).json({
            message: "Book updated successfully",
            book: updatedBook
        });
    } catch (error) {
        res.status(500).json({ message: "Failed to update book" });
    }
};

export const getBookById = async(req, res) => {
    try {
        const book = await Book.findOne({ id: parseInt(req.params.id) });
        if (!book) {
            return res.status(404).json({ message: "Book not found" });
        }
        res.status(200).json(book);
    } catch (error) {
        console.log("Error:", error);
        res.status(500).json({ message: "Error fetching book details" });
    }
};



export const deleteBook = async(req, res) => {
    try {
        const { id } = req.params;
        await Book.findOneAndDelete({ id: id });
        res.status(200).json({ message: "Book deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Failed to delete book" });
    }
};

export const searchBooks = async (req, res) => {
    try {
        const { query, page, filters } = req.query;
        const parsedFilters = JSON.parse(filters);
        const booksPerPage = 10;
        
        let searchCriteria = {};
        
        if (query) {
            searchCriteria.$or = [
                { name: { $regex: query, $options: 'i' } },
                { bookOwner: { $regex: query, $options: 'i' } }
            ];
        }
        
        if (parsedFilters.category) {
            searchCriteria.category = parsedFilters.category;
        }
        
        if (parsedFilters.status) {
            searchCriteria.status = parsedFilters.status;
        }
        
        const totalBooks = await Book.countDocuments(searchCriteria);
        const totalPages = Math.ceil(totalBooks / booksPerPage);
        
        const books = await Book.find(searchCriteria)
            .skip((page - 1) * booksPerPage)
            .limit(booksPerPage);
            
        res.json({
            books,
            totalPages,
            currentPage: page
        });
    } catch (error) {
        res.status(500).json({ message: "Search failed" });
    }
};
