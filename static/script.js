// script.js
const form = document.getElementById('cameraForm');
const camerasList = document.getElementById('cameras');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const number = document.getElementById('number').value;
    const ip = document.getElementById('ip').value;
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('/cameras/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                number,
                ip,
                username,
                password,
            })
        });
        const data = await response.json();
        console.log(data);
        // Clear form fields after successful submission
        form.reset();
        // Reload cameras list
        loadCameras();
    } catch (error) {
        console.error('Error:', error);
    }
});
async function loadCameras() {
    try {
      const response = await fetch('/cameras/');
      const data = await response.json();
      console.log(data);
      camerasList.innerHTML = '';
      data.forEach(camera => {
        const cameraDiv = document.createElement('div');
        cameraDiv.innerHTML = `
        <strong>Camera ID:</strong> ${camera.id}<br>
        <strong>Camera Number:</strong> ${camera.number}<br>
        <strong>IP Address:</strong> ${camera.ip}<br>
        <strong>Username:</strong> ${camera.username}<br>
        <strong>Password:</strong> ${camera.password}<br>
        `;
        camerasList.appendChild(cameraDiv);
      });
  
    } catch (error) {
      console.error('Error:', error);
    }
  }

const updateCameraForm = document.getElementById('updateCameraForm');

updateCameraForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const number = document.getElementById('updateNumber').value;
  const ip = document.getElementById('updateIp').value;
  const username = document.getElementById('updateUsername').value;
  const password = document.getElementById('updatePassword').value;
  const cameraId = prompt('Enter camera ID to update:');

  try {
    const response = await fetch(`/cameras/${cameraId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ number, ip, username, password })
    });

    if (response.ok) {
      console.log('Camera updated successfully');
      loadCameras(); // Reload cameras list after successful update
    } else {
      console.error(`Failed to update camera. Status: ${response.status}`);
    }
  } catch (error) {
    console.error('Error:', error);
  }
});
// Load cameras initially


// updateTokenList.addEventListener('upButton', async (e) => { // Use 'click' event
//   e.preventDefault();

//   const token = document.getElementById('updateToken').value;
//   let tokenId;

//   // Validate token (replace with your validation logic)
//   if (!isValidToken(token)) {
//     console.error('Invalid token. Please enter a valid token.');
//     return;
//   }

//   // Consider using a modal dialog instead of prompt()
//   tokenId = await showTokenIdInputDialog(); // Replace with your function

//   try {
//     const response = await fetch(`/cameras/${tokenId}`, {
//       method: 'PUT',
//       headers: {
//         'Content-Type': 'application/json'
//       },
//       body: JSON.stringify({ token })
//     });

//     if (response.ok) {
//       console.log('Camera updated successfully');
//       loadCameras();
//     } else {
//       const errorData = await response.json();
//       console.error(`Failed to update camera. Error: ${errorData.error || response.statusText}`);
//       // Display user-friendly error message based on error
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     // Display user-friendly error message
//   }
// });


      const tokenInput = document.getElementById("tokenInput");
      const addButton = document.getElementById("addButton");
      const tokenList = document.getElementById("tokenList");

      addButton.addEventListener("click", addToken);

      async function addToken() {
        const token = tokenInput.value.trim();
        if (token) {
          try {
            const response = await fetch("/tokens/", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify({ token }),
            });

            if (response.ok) {
              tokenInput.value = "";
              updateTokenList();
            } else {
              const errorData = await response.json();
              console.error("Error adding token:", errorData.error);
            }
          } catch (error) {
            console.error("Error adding token:", error);
          }
        }
      }

      async function updateTokenList() {
        try {
          const response = await fetch("/tokens/");
          const tokens = await response.json();

          tokenList.innerHTML = "";
          tokens.forEach((token) => {
            const li = document.createElement("li");
            li.textContent = token.token;
            tokenList.appendChild(li);
          });
        } catch (error) {
          console.error("Error retrieving tokens:", error);
        }
      }

      loadCameras();
      updateTokenList();