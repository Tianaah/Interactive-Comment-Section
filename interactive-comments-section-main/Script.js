document.addEventListener("DOMContentLoaded", () => {
  const commentsContainer = document.querySelector(".comments-wrp");
  const commentInput = document.querySelector(".cmnt-input");
  const sendButton = document.querySelector(".bu-primary");
  const replyInputTemplate = document.querySelector(".reply-input-template");
  const commentTemplate = document.querySelector(".comment-template");
  const modal = document.querySelector(".modal-wrp");

  let data = JSON.parse(localStorage.getItem("commentsData")) || null;

  async function fetchData() {
    if (!data) {
      const response = await fetch("data.json");
      data = await response.json();
      saveToLocalStorage();
    }
    renderComments();
  }

  function saveToLocalStorage() {
    localStorage.setItem("commentsData", JSON.stringify(data));
  }

  function renderComments() {
    commentsContainer.innerHTML = "";
    data.comments.forEach((comment) => {
      commentsContainer.appendChild(createCommentElement(comment));
    });
  }

  function createCommentElement(comment, isReply = false) {
    const template = commentTemplate.content.cloneNode(true);
    const commentWrapper = template.querySelector(".comment-wrp");
    const userImg = template.querySelector(".c-user img");
    const userName = template.querySelector(".usr-name");
    const createdAt = template.querySelector(".cmnt-at");
    const commentText = template.querySelector(".c-body");
    const replyTo = template.querySelector(".reply-to");
    const replyButton = template.querySelector(".reply");
    const editButton = template.querySelector(".edit");
    const deleteButton = template.querySelector(".c-controls");
    const scoreNumber = template.querySelector(".score-number");
    const plusButton = template.querySelector(".score-plus");
    const minusButton = template.querySelector(".score-minus");

    userImg.src = comment.user.image.png;
    userName.textContent = comment.user.username;
    createdAt.textContent = comment.createdAt;
    scoreNumber.textContent = comment.score;
    commentText.textContent = comment.content;
    replyTo.textContent = comment.replyingTo ? `@${comment.replyingTo} ` : "";

    if (comment.user.username === data.currentUser.username) {
      editButton.style.display = "inline-block"; // ✅ Ensure Edit button is visible
      deleteButton.style.display = "inline-block";
    } else {
      editButton.style.display = "none";
      deleteButton.style.display = "none";
    }

    replyButton.addEventListener("click", () =>
      showReplyInput(commentWrapper, comment.id)
    );
    editButton.addEventListener("click", () =>
      enableEdit(comment, commentText)
    );
    deleteButton.addEventListener("click", () => confirmDelete(comment.id));

    plusButton.addEventListener("click", () =>
      updateScore(comment, 1, scoreNumber)
    );
    minusButton.addEventListener("click", () =>
      updateScore(comment, -1, scoreNumber)
    );

    if (comment.replies && comment.replies.length > 0) {
      const repliesContainer = commentWrapper.querySelector(".replies");
      comment.replies.forEach((reply) => {
        repliesContainer.appendChild(createCommentElement(reply, true));
      });
    }

    return commentWrapper;
  }

  function showReplyInput(parent, commentId) {
    const replyInputClone = replyInputTemplate.content.cloneNode(true);
    const textarea = replyInputClone.querySelector(".cmnt-input");
    const sendReplyButton = replyInputClone.querySelector(".bu-primary");

    parent.appendChild(replyInputClone);

    sendReplyButton.addEventListener("click", () => {
      const newReply = {
        id: Date.now(),
        content: textarea.value,
        createdAt: "Just now",
        score: 0,
        replyingTo:
          data.comments.find((c) => c.id === commentId)?.user.username || "",
        user: data.currentUser,
      };
      const parentComment = data.comments.find((c) => c.id === commentId);
      parentComment.replies.push(newReply);
      saveToLocalStorage();
      renderComments();
    });
  }

  function enableEdit(comment, commentText) {
    const originalText = commentText.textContent;
    const inputField = document.createElement("textarea");
    inputField.value = originalText;
    inputField.classList.add("edit-textarea");

    commentText.replaceWith(inputField);
    inputField.focus();

    inputField.addEventListener("blur", () => {
      comment.content = inputField.value;
      saveToLocalStorage();
      renderComments();
    });

    inputField.addEventListener("keypress", (event) => {
      if (event.key === "Enter") {
        comment.content = inputField.value;
        saveToLocalStorage();
        renderComments();
      }
    });
  }

  function confirmDelete(commentId) {
    modal.classList.remove("invisible");
    const yesButton = modal.querySelector(".yes");
    const noButton = modal.querySelector(".no");

    yesButton.addEventListener("click", () => {
      data.comments = data.comments.filter((c) => c.id !== commentId);
      data.comments.forEach((c) => {
        c.replies = c.replies.filter((r) => r.id !== commentId);
      });
      saveToLocalStorage();
      renderComments();
      modal.classList.add("invisible");
    });

    noButton.addEventListener("click", () => modal.classList.add("invisible"));
  }

  function updateScore(comment, change, scoreNumber) {
    comment.score += change;
    saveToLocalStorage();
    scoreNumber.textContent = comment.score;
  }

  sendButton.addEventListener("click", () => {
    const newComment = {
      id: Date.now(),
      content: commentInput.value,
      createdAt: "Just now",
      score: 0,
      user: data.currentUser,
      replies: [],
    };
    data.comments.push(newComment);
    saveToLocalStorage();
    renderComments();
    commentInput.value = "";
  });

  fetchData();
});
