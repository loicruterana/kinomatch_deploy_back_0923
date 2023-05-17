const request = require('request');

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=1939&sort_by=popularity.desc',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4MjE4NGQ5ODJlZjQyYjU1NDhmNDVkNTQ2ZGQ2MmRkYiIsInN1YiI6IjY0NGU0MWI1YTZjMTA0MGJjYjY3NWViNSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.lSpuEQmAl0sFZuH8UcRjMX9m7uitaxESLmRcY19KEbQ'
  }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});