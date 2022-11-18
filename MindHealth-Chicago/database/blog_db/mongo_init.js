// MongoDB Playground
// Use Ctrl+Space inside a snippet or a string literal to trigger completions.

const database = 'Mind Health Chicagop';
const collection = 'Blog Posts';

// Create a new database.
use(database);

// Create a new collection.
db.createCollection(collection);

db.createUser(
    {
        user: "blog_user",
        pwd: "c1ufuw9Ka",
        roles: [
            {
                role: "readWrite",
                db: "blog_db"
            }
        ]
    }
);
db.createCollection("test"); 