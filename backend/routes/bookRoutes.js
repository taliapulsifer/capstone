const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const { MongoClient } = require('mongodb');
const { ObjectId } = require('mongodb');
const uri = 'mongodb+srv://taliaPulsifer:vMChD0J3lpFAEtog@library.yiy5hwm.mongodb.net/';

app.use(bodyParser.json());

async function connectToDatabase() {
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });
    try {
        await client.connect();
        console.log('Connected to the database...')
        return client.db('library').collection('books');
    } catch (error) {
        console.error('Error connecting to the database', error);
        process.exit(1);
    }
}

app.get('/books', async (req, res) => {
    try {
        const books = await db.find({}).toArray();
        res.json(books);
    } catch (error) {
        console.error('Error retrieving books: ', error);
        res.status(500).send('Internal server error');
    }
});

app.get('/books/:id', async (req, res) => {
    const bookID = req.params.id;
    const bookCollection = await connectToDatabase();
    try 
    {
        const book = await bookCollection.findOne({_id: new ObjectId(bookID)});
        if(book)
        {
            res.json(book);
        }
        else
        {
            res.status(404).send('Book not found');
        }
    } 
    catch (error) 
    {
        console.error('Error retrieving book: ', error);
        res.status(500).send('Internal server error');
    }
});

app.post('/books', async (req, res) => {
    const newBook = req.body;
    const bookCollection = await connectToDatabase();
    const result = await bookCollection.insertOne(newBook);
    res.status(201).send('Book added successfully');
});

// app.put('/books/:id', async (req, res) => {
//     const updatedBook = req.body;
//     const bookId = req.params.id; // Store the book ID for logging
//     console.log('Updating book with ID:', bookId); // Log the book ID
//     const bookCollection = await connectToDatabase();
//     try {
//         console.log('Updating book in the database...');
//         const result = await bookCollection.updateOne(
//             {_id: new ObjectId(bookId)},
//             {$set: updatedBook}
//         );
//         console.log('Update operation result:', result);
//         if (result.modifiedCount === 1) {
//             res.status(200).send('Book updated successfully');
//         } else {
//             console.log('Book not found for ID:', bookId); // Log if book not found
//             res.status(404).send('Book not found');
//         }
//     } catch (error) {
//         console.error('Error updating book:', error);
//         res.status(500).send('Internal Server Error');
//     }
// });
//Console out variables!! POST and PUT should look very similar
app.put('/books/:id', async (req, res) => {
    const bookId = req.params.id;
    const bookUpdates = req.body;
    const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

    console.log('Book to be updated: ', bookUpdates);

    try {
        await client.connect();
        const db = client.db('library');
        const books = db.collection('books');
        
        const updateResult = await books.updateOne(
            { _id: new ObjectId(bookId) },
            { $set: bookUpdates }
        );

        console.log('Update result:', updateResult);

        if (updateResult.modifiedCount === 1) {
            res.send({ message: 'Book updated successfully' });
        } else {
            res.send({ message: 'No changes made to the book' });
        }
    } catch (error) {
        console.error('Error updating book: ', error);
        res.status(500).send('Internal server error');
    } finally {
        await client.close();
    }
  }); 

app.delete('/books/:id', async (req, res) => {
    const bookId = req.params.id; // Store the book ID for logging
    console.log('Deleting book with ID:', bookId); // Log the book ID
    const bookCollection = await connectToDatabase();
    try {
        console.log('Deleting book from the database...');
        const result = await bookCollection.deleteOne({ _id: new ObjectId(bookId) });
        console.log('Delete operation result:', result);
        if (result.deletedCount === 1) {
            res.status(200).send('Book deleted successfully');
        } else {
            console.log('Book not found for ID:', bookId); // Log if book not found
            res.status(404).send('Book not found');
        }
    } catch (error) {
        console.error('Error deleting book:', error);
        res.status(500).send('Internal Server Error');
    }
});


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;