# Frontend Mentor - Interactive Comments Section Solution

This is a solution to the [Interactive comments section challenge on Frontend Mentor](https://www.frontendmentor.io/challenges/interactive-comments-section-iG1RugEG9). Frontend Mentor challenges help you improve your coding skills by building realistic projects.

## Table of contents

- [Overview](README-template.md#overview)
  - [The challenge](README-template.md#the-challenge)
  - [Screenshot](README-template.md#screenshot)
  - [Links](README-template.md#links)
- [My process](README-template.md#my-process)
  - [Built with](README-template.md#built-with)
  - [What I learned](README-template.md#what-i-learned)
  - [Continued development](README-template.md#continued-development)
  - [Useful resources](README-template.md#useful-resources)
- [Author](README-template.md#author)
- [Acknowledgments](README-template.md#acknowledgments)

## Overview

### The challenge

Users should be able to:

- View the optimal layout for the app depending on their device's screen size
- See hover states for all interactive elements on the page
- Create, Read, Update, and Delete comments and replies
- Upvote and downvote comments
- **Bonus**: Use `localStorage` to save the current state in the browser that persists when the browser is refreshed.
- **Bonus**: Instead of using the `createdAt` strings from the `data.json` file, try using timestamps and dynamically track the time since the comment or reply was posted.

### Screenshot

![](./design/FireShot%20Capture%20005%20-%20Frontend%20Mentor%20-%20Interactive%20comments%20section%20-%20[127.0.0.1].png)

**Note:** Replace the above placeholder with an actual screenshot of your project.

### Links

- Solution URL: [solution URL](https://github.com/Tianaah/Interactive-Comment-Section)
- Live Site URL: [ live site URL](http://127.0.0.1:5500/interactive-comments-section-main/)

## My process

### Built with

- Semantic HTML5 markup
- CSS custom properties
- Flexbox
- CSS Grid
- Mobile-first workflow
- Vanilla JavaScript (No frameworks)
- LocalStorage for data persistence

### What I learned

This project helped me improve my JavaScript skills, especially working with localStorage and dynamically rendering elements. Some key learnings:

- **Using localStorage** to persist data across page refreshes:

```js
localStorage.setItem("commentsData", JSON.stringify(data));
```

- **Handling CRUD operations dynamically**:

```js
function deleteComment(id) {
  data.comments = data.comments.filter((comment) => comment.id !== id);
  localStorage.setItem("commentsData", JSON.stringify(data));
  renderComments();
}
```

- **Dynamically creating and appending elements**:

```js
const commentElement = document.createElement("div");
commentElement.innerHTML = `<p>${comment.content}</p>`;
container.appendChild(commentElement);
```

### Continued development

Going forward, I plan to:

- Improve accessibility by adding ARIA roles.
- Implement animations for smoother UI interactions.
- Improve error handling when retrieving data.
- Extend the project into a full-stack app with a database.

### Useful resources

- [MDN Web Docs - localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) - Helped with persisting comments.
- [CSS Tricks - Flexbox Guide](https://css-tricks.com/snippets/css/a-guide-to-flexbox/) - Helped with styling the layout.
- [JavaScript Event Listeners](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener) - Improved event handling techniques.

## Author

- Frontend Mentor - [@Tianaah](https://www.frontendmentor.io/profile/Tianaah)

## Acknowledgments

Thanks to Frontend Mentor for providing this challenge! Also, a special thanks to various online resources and developer communities for insights on handling dynamic content efficiently.
