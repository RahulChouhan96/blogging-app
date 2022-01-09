# Blog

This app is created using MEAN Stack.

## Create Frontend Build

ng build


## MongoDB Database Connection

1. Create a database in your local environment with name `practice`.
2. Add a `users` collection to it.
3. Create a empty document.

## Run server

Run node command `node server.js`


## Browser Setup

1. Open `localhost:4500` in Chrome Browser.
2. Open Chrome Dev Tools.
3. Add a field to your session storage `userId`.
4. Get the user _id from user document created and store it in newly created `userId` field in session storage.
5. Refresh the browser.


## How to use the app?

1. Create a blog - Click New Blog. It will take you to a form page. Add some text and create.
2. Edit a blog - On list of blogs, click Edit option to open form, make your changes and save.
3. Delete a blog - Same as above.


## Future Updates

1. To open a blog, in the URL, use blog's url slugs instead of blog ID. As this is more readable.
2. Add view counter for each blog.
3. Allow adding text in different forms like Bold, Italic, code etc. Use Quill Editor to perform this task.
4. Get most popular topics and suggest to users as an idea for writing a blog.

[Premium]
5. Show analytics such as how was the audience reaction in last one week.