 /*******************************************************
     * Random User Generator App
     * ---------------------------------
     * This script fetches random user profiles using the
     * RandomUser.me API. The user can choose how many profiles
     * to generate at once. Each profile is rendered as a card,
     * displaying the user's picture, name, email, and location.
     * 
     * API endpoint: https://randomuser.me/api/?results={number}
     *******************************************************/
    
    // Select DOM elements for use in the code
    const generateBtn = document.getElementById("generateBtn");
    const numUsersInput = document.getElementById("numUsers");
    const userContainer = document.getElementById("userContainer");
    
    // Add an event listener to the Generate Profiles button
    generateBtn.addEventListener("click", function() {
      // Read the number of profiles the user wants to generate
      const numUsers = parseInt(numUsersInput.value);
      // Clear any existing user cards before generating new ones
      userContainer.innerHTML = "";
      // Fetch random user profiles from the API
      fetchRandomUsers(numUsers);
    });
    
    /**
     * Fetch random user profiles from the API.
     * @param {number} count - The number of user profiles to generate.
     */
    async function fetchRandomUsers(count) {
      try {
        // Construct the API URL with the results parameter
        const response = await fetch(`https://randomuser.me/api/?results=${count}`);
        // Parse the JSON returned by the API
        const data = await response.json();
        // Log data for debugging purposes (optional)
        console.log(data);
        // Display the user profiles on the page
        displayUsers(data.results);
      } catch (error) {
        console.error("Error fetching random users:", error);
        userContainer.innerHTML = "<p class='text-danger'>There was an error fetching user data. Please try again.</p>";
      }
    }
    
    /**
     * Render the user profiles as Bootstrap cards.
     * @param {Array} users - An array of user objects obtained from the API.
     */
    function displayUsers(users) {
      // Loop through each user object in the array
      users.forEach(user => {
        // Construct the full name string
        const fullName = `${capitalize(user.name.first)} ${capitalize(user.name.last)}`;
        // Construct the user's location string (city, state, country)
        const location = `${capitalize(user.location.city)}, ${capitalize(user.location.state)} - ${user.location.country}`;
        // Create a div element for the card column (using Bootstrap grid)
        const colDiv = document.createElement("div");
        colDiv.className = "col-md-4"; // Three cards per row on medium+ screens
        // Create the card element
        const cardDiv = document.createElement("div");
        cardDiv.className = "card user-card h-100"; // h-100 forces cards to have equal height
        // Create an image element for the user picture
        const img = document.createElement("img");
        img.src = user.picture.large;
        img.alt = `Profile picture of ${fullName}`;
        img.className = "card-img-top";
        // Create the card body element to hold text content
        const cardBody = document.createElement("div");
        cardBody.className = "card-body";
        
        // Create a card title for the user's full name
        const cardTitle = document.createElement("h5");
        cardTitle.className = "card-title";
        cardTitle.textContent = fullName;
        
        // Create a paragraph for the email
        const emailPara = document.createElement("p");
        emailPara.className = "card-text";
        emailPara.innerHTML = `<strong>Email:</strong> ${user.email}`;
        
        // Create a paragraph for the location
        const locationPara = document.createElement("p");
        locationPara.className = "card-text";
        locationPara.innerHTML = `<strong>Location:</strong> ${location}`;
        
        // Append the title, email, and location to the card body
        cardBody.appendChild(cardTitle);
        cardBody.appendChild(emailPara);
        cardBody.appendChild(locationPara);
        
        // Append the image and card body to the card element
        cardDiv.appendChild(img);
        cardDiv.appendChild(cardBody);
        
        // Append the card element to the column div
        colDiv.appendChild(cardDiv);
        
        // Append the column div to the main user container row
        userContainer.appendChild(colDiv);
      });
    }
    
    /**
     * Helper function to capitalize the first letter of a string.
     * @param {string} str - The string to capitalize.
     * @returns {string} - The capitalized string.
     */
    function capitalize(str) {
      if (!str) return "";
      return str.charAt(0).toUpperCase() + str.slice(1);
    }
