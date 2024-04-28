const xmlFile = "movies.xml";
const moviesDiv = document.getElementById("movies");

fetch(xmlFile)
  .then((response) => response.text())
  .then((data) => {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(data, "application/xml");
    const movies = xmlDoc.getElementsByTagName("movie");

    for (let i = 0; i < movies.length; i++) {
      const movie = movies[i];
      const title = movie.getElementsByTagName("title")[0].textContent;
      const director = movie.getElementsByTagName("director")[0].textContent;
      const showtimes = movie.getElementsByTagName("showtime");

      const movieDiv = document.createElement("div");
      movieDiv.classList.add("movie");
      movieDiv.innerHTML = `
        <h2>${title}</h2>
        <p>Director: ${director}</p>
        <h3>Showtimes:</h3>
        <ul>`;

      for (let j = 0; j < showtimes.length; j++) {
        const showtime = showtimes[j];
        const time = showtime.getElementsByTagName("time")[0].textContent;
        const date = showtime.getElementsByTagName("date")[0].textContent;

        movieDiv.innerHTML += `
          <li>${time} - ${date}</li>`;
      }

      movieDiv.innerHTML += `
        </ul>
      `;

      moviesDiv.appendChild(movieDiv);
    }
  })
  .catch((error) => console.error(error));