async function newFormHandler(event) {
  event.preventDefault();

  const title = document.querySelector('#post-title').value;
  const post_id = window.location.toString().split('/')[
    window.location.toString().split('/').length - 1
];
  const post_text = document.querySelector('#post-text').value;

  const response = await fetch(`/api/posts/${post_id}`, {
      method: 'PUT',
      body: JSON.stringify({
          title,
          post_text
      }),
      headers: {
          'Content-Type': 'application/json'
      }
  });

  if (response.ok) {
      document.location.replace('/dashboard');
  } else {
      alert(response.statusText);
  }
}

async function deleteFormHandler(event) {
  event.preventDefault();
  const post_id = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
  ];

  const response = await fetch(`/api/posts/${post_id}`, {
      method: 'DELETE',
      body: JSON.stringify({
          post_id
      }),
      headers: {
          'Content-Type': 'application/json'
      }
  });

  if (response.ok) {
      document.location.replace('/dashboard');
  } else {
      alert(response.statusText);
  }
}

document.querySelector('.edit-post-form').addEventListener('submit', newFormHandler);
document.querySelector('.edit-post-form').addEventListener('reset', deleteFormHandler);