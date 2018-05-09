# JS Practice App ft. server-side rendering!

This branch of js-practice-app features a basic example of a page rendered on the Express server.

The motivation for server-side rendering was to access a local static file in a js script on an html page.
This is very easy to do on the server, thanks to Node's lovely file system. Since Node doesn't exist
on the browser, we must either make a network call to get the page on the client side, or use Node to get
it and insert it into the response.

#### Run
`npm run start`

Navigate to http://localhost:3000/server-side.

You can view the static file where the data was gathered from at http://localhost:3000/page-to-parse.
