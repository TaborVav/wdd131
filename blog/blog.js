// -----------------------------------------------------------
// -------------------    LIST OF BOOKS    -------------------
// -----------------------------------------------------------

const books = [
  {
    id: 1,
    grayTitle: "Septimus Heap Book One",
    title: "Septimus Heap, Book One: Magyk",
    author: "Angie Sage",
    releaseDate: "2005-03-15",
    description:
      "Enter the world of Septimus Heap, Wizard Apprentice. Magyk is his destiny.\nA powerful necromancer plans to seize control of all things Magykal. He has killed the Queen and locked up the Extraordinary Wizard. Now with Darke Magyk he will create a world filled with Darke creatures. But the Necromancer made one mistake. A vital detail he has overlooked means there is a boy who can stop him - the only problem is, the boy doesn't know it yet.\nFor the Heap family, life as they know is about to change, and the most fantastically fast-paced adventure of confused identities, magyk and mayhem, begin.",
    imgSrc: "https://m.media-amazon.com/images/I/91-+urU2QOL._UF1000,1000_QL80_.jpg",
    imgAlt: "Book cover for Septimus Heap 1",
    ageGroup: "10-14",
    genre: "Fantasy",
    rating: 3.86,
  },
  {
    id: 2,
    grayTitle: "Magnus Chase and the Gods of Asgard",
    title: "Sword of Summer: Book 1",
    author: "Rick Riordan",
    releaseDate: "2015-10-06",
    description:
      "Magnus Chase has seen his share of trouble. Ever since that terrible night two years ago when his mother told him to run, he has lived alone on the streets of Boston, surviving by his wits, staying one step ahead of the police and the truant officers.\nOne day, Magnus learns that someone else is trying to track him down—his uncle Randolph, a man his mother had always warned him about. When Magnus tries to outmaneuver his uncle, he falls right into his clutches. Randolph starts rambling about Norse history and Magnus's birthright: a weapon that has been lost for thousands of years.\nThe more Randolph talks, the more puzzle pieces fall into place. Stories about the gods of Asgard, wolves, and Doomsday bubble up from Magnus's memory. But he doesn't have time to consider it all before a fire giant attacks the city, forcing him to choose between his own safety and the lives of hundreds of innocents. . ..\nSometimes, the only way to start a new life is to die.",
    imgSrc:
      "https://books.google.com/books/content/images/frontcover/xWuyBAAAQBAJ?fife=w300",
    imgAlt: "Book cover for Magnus Chase 1",
    ageGroup: "12-16",
    genre: "Fantasy",
    rating: 4.24,
  },
  {
    id: 3,
    grayTitle: "Fablehaven #1",
    title: "Fablehaven",
    author: "Brandon Mull",
    releaseDate: "2006-06-07",
    description:
      "For centuries, mystical creatures of all description were gathered to a hidden refuge called Fablehaven to prevent their extinction. The sanctuary is one of the last strongholds of true magic. Enchanting? Absolutely. Exciting? You bet. Safe? Well, actually, quite the opposite\nKendra and her brother, Seth, have no idea their grandfather is the current caretaker of Fablehaven. Inside the gated woods, ancient laws keep order among greedy trolls, mischievous satyrs, plotting witches, spiteful imps, and jealous fairies. However, when the rules get broken, powerful forces of evil are unleashed, forcing Kendra and Seth to face the greatest challenge of their lives, to save their family, Fablehaven, and perhaps even the world.",
    imgSrc:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1460309528i/44652.jpg",
    imgAlt: "Book cover for Fablehaven",
    ageGroup: "12-16",
    genre: "Fantasy",
    rating: 4.13,
  },
  {
    id: 4,
    grayTitle: "",
    title: "The Very Hungry Caterpiller",
    author: "Eric Carle",
    releaseDate: "1969-06-03",
    description:
      "THE all-time classic story, from generation to generation, sold somewhere in the world every 30 seconds! Have you shared it with a child or grandchild in your life?\nOne sunny Sunday, the caterpillar was hatched out of a tiny egg. He was very hungry. On Monday, he ate through one apple; on Tuesday, he ate through three plums--and still he was hungry. When full at last, he made a cocoon around himself and went to sleep, to wake up a few weeks later wonderfully transformed into a butterfly!\nThe brilliantly innovative Eric Carle has dramatized the story of one of Nature's commonest yet loveliest marvels, the metamorphosis of the butterfly. This audiobook will delight as well as instruct the very youngest listener.",
    imgSrc:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1603739265i/4948.jpg",
    imgAlt: "Book cover for The Very Hungry Caterpillar",
    ageGroup: "3-6",
    genre: "Fiction",
    rating: 4.34,
  },
  {
    id: 5,
    grayTitle: "",
    title: "The Most Boring Book Ever",
    author: "Brandon Sanderson",
    releaseDate: "2024-08-24",
    description:
      "In this humorous epic adventure, a boy is, on the one hand, having an ordinary day. He does his math homework and his chores and takes a nap...all while a surprising adventure unfolds around him involving pirates, dragons, and other unexpected perils. With clever interplay between text and art and an expansive, imaginative arc, this modern classic is a landmark fantasy picture book.",
    imgSrc:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1717527383i/207974153.jpg",
    imgAlt: "Book cover for The Most Boring Book Ever",
    ageGroup: "4-8",
    genre: "Fantasy",
    rating: 3.92,
  },
  {
    id: 6,
    grayTitle: "",
    title: "The Most Boring Book Ever",
    author: "Brandon Sanderson",
    releaseDate: "2024-08-24",
    description:
      "In this humorous epic adventure, a boy is, on the one hand, having an ordinary day. He does his math homework and his chores and takes a nap...all while a surprising adventure unfolds around him involving pirates, dragons, and other unexpected perils. With clever interplay between text and art and an expansive, imaginative arc, this modern classic is a landmark fantasy picture book.",
    imgSrc:
      "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1717527383i/207974153.jpg",
    imgAlt: "Book cover for The Most Boring Book Ever",
    ageGroup: "4-8",
    genre: "Fantasy",
    rating: 3.92,
  },
  //   {
  //     id: 6,
  //     title: "Fablehaven",
  //     author: "Brandon Mull",
  //     releaseDate: "2006-06-07",
  //     description: "A hidden refuge for magical creatures, but is it truly safe?",
  //     imgSrc: "https://images-na.ssl-images-amazon.com/images/S/compressed.photo.goodreads.com/books/1460309528i/44652.jpg",
  //     imgAlt: "Book cover for Fablehaven",
  //     ageGroup: "12-16",
  //     genre: "Fantasy",
  //     rating: 4,
  //   },
];

// -----------------------------------------------------------
// --------------    DISPLAY FUNCTION    --------------
// -----------------------------------------------------------

function renderBooks(filteredBooks) {
  const bookListContainer = document.querySelector(".book-list");
  bookListContainer.innerHTML = ""; // Clear existing books

  filteredBooks.forEach((book) => {
    const bookItem = document.createElement("div");
    bookItem.classList.add("book-item");

    // Limit the description to 14 words
    const maxWords = 14;
    const words = book.description.split(" ");
    const shortDescription =
      words.length > maxWords
        ? words.slice(0, maxWords).join(" ") + "..."
        : book.description;

    // Format release date
    const [year, month, day] = book.releaseDate.split("-").map(Number);
    const formattedDate = new Date(year, month - 1, day).toLocaleDateString(
      "en-US",
      {
        year: "numeric",
        month: "long",
        day: "numeric",
      }
    );

    // Round rating and generate stars
    const roundedRating = Math.round(book.rating);
    const stars = "★".repeat(roundedRating) + "☆".repeat(5 - roundedRating);

    bookItem.innerHTML = `
              <img src="${book.imgSrc}" alt="${book.imgAlt}">
              <div class="book-info">
              <h2>${book.grayTitle}</h2>
                  <h3>${book.title}</h3>
                  <p>${book.author}</p>
                  <p>${formattedDate}</p>
                  <p>${book.genre}</p>
                  <p>${book.ageGroup}</p>
                  <p>${stars} ${book.rating}</p>
                  <p1>${shortDescription}</p1>
                <button onclick="openBookDetails(${book.id})">READ MORE></button>
              </div>
          `;

    bookListContainer.appendChild(bookItem);
  });
  // Add event listeners to "READ MORE" buttons
  document.querySelectorAll(".read-more").forEach((button) => {
    button.addEventListener("click", (event) => {
      const bookId = event.target.getAttribute("data-id");
      const selectedBook = books.find((book) => book.id == bookId);
      openModal(selectedBook);
    });
  });
}
  

// -----------------------------------------------------------
// -----------------    FILTER FUNCTION    ------------------
// -----------------------------------------------------------

// function filterBooks() {
//   const titleInput = document.getElementById("title").value.toLowerCase();
//   const authorInput = document.getElementById("author").value.toLowerCase();
//   const genreInput = document.getElementById("genre").value.toLowerCase();
//   const ageInput = document.getElementById("age").value;
//   const ratingInput = document.getElementById("rating").value;

//   const filteredBooks = books.filter((book) => {
//     const matchesTitle = book.title.toLowerCase().includes(titleInput);
//     const matchesAuthor = book.author.toLowerCase().includes(authorInput);
//     const matchesGenre = book.genre.toLowerCase().includes(genreInput);
//     const matchesAge = ageInput ? book.ageGroup === ageInput : true;
//     const matchesRating = ratingInput
//       ? book.rating >= Number(ratingInput)
//       : true;

//     return (
//       matchesTitle &&
//       matchesAuthor &&
//       matchesGenre &&
//       matchesAge &&
//       matchesRating
//     );
//   });

//   renderBooks(filteredBooks);
// }

// // Attach event listeners to filter inputs
// document.querySelectorAll(".filter").forEach((input) => {
//   input.addEventListener("input", filterBooks);
// });

// Initial render of all books
renderBooks(books);
