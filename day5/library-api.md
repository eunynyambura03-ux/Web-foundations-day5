# Library Books REST API

A REST API design for a library's books resource. The base URL is `https://api.example-library.com/v1`. All data is sent and received as JSON.

## Endpoints

### 1. List all books

- **Method:** GET
- **Path:** `/books`
- **Description:** Returns a list of every book in the library.
- **Example request body:** none (a GET request has no body)
- **Success status code:** `200 OK`

```
GET /books
```

### 2. Get one book

- **Method:** GET
- **Path:** `/books/{id}`
- **Description:** Returns the details of a single book by its ID.
- **Example request body:** none
- **Success status code:** `200 OK`

```
GET /books/42
```

### 3. Create a book

- **Method:** POST
- **Path:** `/books`
- **Description:** Adds a new book to the library.
- **Example request body:**

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "year": 2008,
  "isbn": "9780132350884"
}
```

- **Success status code:** `201 Created`

### 4. Update a book

- **Method:** PUT
- **Path:** `/books/{id}`
- **Description:** Replaces the details of an existing book.
- **Example request body:**

```json
{
  "title": "Clean Code",
  "author": "Robert C. Martin",
  "year": 2009,
  "isbn": "9780132350884"
}
```

- **Success status code:** `200 OK`

### 5. Delete a book

- **Method:** DELETE
- **Path:** `/books/{id}`
- **Description:** Removes a book from the library.
- **Example request body:** none
- **Success status code:** `204 No Content`

```
DELETE /books/42
```

### 6. List books by an author (query parameter)

- **Method:** GET
- **Path:** `/books?author={name}`
- **Description:** Returns only the books written by the given author, filtered with the `author` query parameter.
- **Example request body:** none
- **Success status code:** `200 OK`

```
GET /books?author=Robert%20C.%20Martin
```

## Error codes

### 400 Bad Request

The server could not understand the request. This happens when the request body is missing required fields or has invalid values.

**Example:** Creating a book with POST `/books` and sending a body with no `title`:

```json
{
  "author": "Robert C. Martin"
}
```

Response: `400 Bad Request` with a message such as `"title" is required`.

### 404 Not Found

The requested resource does not exist. This happens when a book ID does not match any book in the library.

**Example:** `GET /books/9999` when there is no book with ID 9999.

Response: `404 Not Found` with a message such as `Book with id 9999 was not found`.
