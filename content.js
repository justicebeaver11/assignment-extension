//content.js

function scrapeProfile() {
    const name = document.querySelector('.text-heading-xlarge')?.innerText || '';
    const location = document.querySelector('.text-body-small')?.innerText || '';
    const about = document.querySelector('.inline-show-more-text')?.innerText || '';
    const bio = document.querySelector('.text-body-medium')?.innerText || '';
    const followerCount = parseInt(document.querySelector('[data-control-name="topcard_followers"]')?.innerText.replace(/[^0-9]/g, '')) || 0;
    const connectionCount = parseInt(document.querySelector('[data-control-name="topcard_connections"]')?.innerText.replace(/[^0-9]/g, '')) || 0;
  
    return {
      name,
      url: window.location.href,
      about,
      bio,
      location,
      followerCount,
      connectionCount
    };
  }
  
  chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === "scrape") {
      const profileData = scrapeProfile();
      sendResponse(profileData);
    }
  });



  