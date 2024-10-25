// Replace with your Google Apps Script Web App URL 
const webAppURL = 'https://script.google.com/macros/s/AKfycbyn3kOysYorrEVWW9hBE8wLYE7vZDPEZiV2V6dttXzt0wykTzUMLNHufxyLWIuqzdJD4A/exec';

// Fetch data from Google Sheets Web App
async function fetchAndDisplayProducts() {
  try {
    // Fetch the data from the Web App
    const response = await fetch(webAppURL);
    const data = await response.json();

    // Get the div where the product showcases will be appended
    const productsDiv = document.getElementById('all_affiliate_links_products_div_id');

    // Group rows by the first column (Product Section Type Name)
    const groupedData = {};
    for (let i = 1; i < data.length; i++) { // Start from 1 to skip headers
      const row = data[i];
      const productSectionType = row[0];

      // Initialize array for this product section if it doesn't exist
      if (!groupedData[productSectionType]) {
        groupedData[productSectionType] = [];
      }

      // Add row to the appropriate section group
      groupedData[productSectionType].push(row);
    }

    // Loop through each product section and generate the HTML
    Object.keys(groupedData).forEach(productSectionType => {
      // Create a new section container for this product section
      let sectionHtml = `
        <div class="product-showcase">
          <h2 class="title">${productSectionType}</h2>
          <div class="showcase-wrapper has-scrollbar">
      `;

      // Get the rows for this product section
      const rows = groupedData[productSectionType];
      let containerHtml = ''; // To store showcase-container blocks
      let productCount = 0;   // Counter to limit 4 products per container

      rows.forEach((row, index) => {
        const productName = row[1];
        const productTypeName = row[2];
        const productOldCost = row[3];
        const productCurrentCost = row[4];
        const productImage = row[6];
        const productAffiliateLink = row[7];

        // Add a new showcase product HTML
        const productHtml = `
          <div class="showcase">
            <a href="${productAffiliateLink}" class="showcase-img-box">
              <img src="${productImage}" width="70" class="showcase-img">
            </a>
            <div class="showcase-content">
              <a href="${productAffiliateLink}">
                <h4 class="showcase-title">${productName}</h4>
              </a>
              <a href="${productAffiliateLink}" class="showcase-category">${productTypeName}</a>
              <div class="price-box">
                <p class="price">${productCurrentCost}</p>
                <del>${productOldCost}</del>
              </div>
            </div>
          </div>
        `;

        // Add the product to the current container
        containerHtml += productHtml;
        productCount++;

        // If the product count reaches 4, wrap the showcase-container
        if (productCount === 4 || index === rows.length - 1) {
          // Wrap the products inside a showcase-container
          sectionHtml += `
            <div class="showcase-container">
              ${containerHtml}
            </div>
          `;
          containerHtml = ''; // Reset for the next set of products
          productCount = 0; // Reset product counter
        }
      });

      // Close the showcase-wrapper
      sectionHtml += `
          </div> <!-- End showcase-wrapper -->
        </div> <!-- End product-showcase -->
      `;

      // Append the section to the productsDiv
      productsDiv.innerHTML += sectionHtml;
    });

    // Update social media links
    const tiktokLink = data[1][9]; // Column 10 (index 9), Row 2 (index 1)
    const youtubeLink = data[1][10]; // Column 11 (index 10), Row 2 (index 1)
    const instagramLink = data[1][11]; // Column 12 (index 11), Row 2 (index 1)

    // Update the href attributes of the social media links
    document.querySelector('a.social-link[href="#"] ion-icon[name="logo-tiktok"]').parentElement.href = tiktokLink;
    document.querySelector('a.social-link[href="#"] ion-icon[name="logo-youtube"]').parentElement.href = youtubeLink;
    document.querySelector('a.social-link[href="#"] ion-icon[name="logo-instagram"]').parentElement.href = instagramLink;



    const websiteName = data[1][13]; // Column 14 (index 13), Row 2 (index 1)
    const websiteTitle = data[1][14]; // Column 15 (index 14), Row 2 (index 1)
    const websiteImage_1 = data[1][15]; // Column 16 (index 15), Row 2 (index 1)
    const websiteImage_2 = data[1][16]; // Column 17 (index 16), Row 2 (index 1)
    const websiteImage_3 = data[1][17]; // Column 18 (index 17), Row 2 (index 1)


    // Select all elements with the class name "website_name_class"
    const websireNameElements = document.getElementsByClassName('website_name_class');

    // Loop through each element and set its innerText to "Good"
    for (let i = 0; i < websireNameElements.length; i++) {
      websireNameElements[i].innerText = websiteName;
    }
    // Select all elements with the class name "website_name_class"
    const websireTitleElements = document.getElementsByClassName('website_title_class');

    // Loop through each element and set its innerText to "Good"
    for (let i = 0; i < websireTitleElements.length; i++) {
      websireTitleElements[i].innerText = websiteTitle;
    }

    // Select all elements with the class name "banner-img"
    const images = document.getElementsByClassName('banner-img');

    // Create an array with the new image sources
    const imgSources = [websiteImage_1, websiteImage_2, websiteImage_3];

    // Loop through each image element up to the length of imgSources
    for (let i = 0; i < imgSources.length; i++) {
      if (images[i]) { // Check if the element exists to avoid errors
        images[i].src = imgSources[i]; // Set the src attribute to the corresponding image source
      }
    }



    checkWebsiteTimeout();

    // Make the body visible after loading content
    document.body.style.opacity = '1';

  } catch (error) {
    console.error('Error fetching Google Sheet data:', error);
  }
}

// Call the function on page load
window.onload = fetchAndDisplayProducts;







function checkWebsiteTimeout() {
  // Get the date string from the element with id "website_time_out_date_a_id"
  const timeoutDateStr = document.getElementById('website_time_out_date_a_id').innerText;

  // Parse the date string into a usable format
  const [year, month, day] = timeoutDateStr.split('-').map(Number);
  const timeoutDate = new Date(2000 + year, month - 1, day); // Adjust for 2-digit year assumption

  // Get the current date without time
  const currentDate = new Date();
  currentDate.setHours(0, 0, 0, 0);

  // Compare the current date with the timeout date
  if (currentDate > timeoutDate) {
    // Set body display to ''
    document.body.innerHTML = '';

    // Create an h1 element and style it
    const message = document.createElement('h1');
    message.innerText = `The Website Needs To Be Renewal\n${timeoutDateStr}`;
    message.style.width = '100%';
    message.style.position = 'fixed';
    message.style.top = '50%';
    message.style.left = '50%';
    message.style.transform = 'translate(-50%, -50%)';
    message.style.textAlign = 'center';
    message.style.fontSize = '2vmax';
    message.style.color = 'red';
    message.style.backgroundColor = 'white';
    message.style.padding = '20px';
    message.style.border = '2px solid red';

    // Append the message to the body
    document.body.appendChild(message);
    document.body.style.display = ''; // Make the message visible
  }
}
