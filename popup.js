document.getElementById('fetchButton').addEventListener('click', () => {
  chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
    const activeTab = tabs[0];
    const tabTitle = activeTab.title;
    const tabURL = activeTab.url;

    document.getElementById('tabTitle').textContent = `Title: ${tabTitle}`;
    document.getElementById('output').style.display = 'block';
    document.getElementById('urlBox').style.display = 'block';
    document.getElementById('urlBox').textContent = `URL: ${tabURL}`;
  });
});

document.getElementById('closeButton').addEventListener('click', () => {
  window.close(); 
});

document.getElementById('scrapeProfiles').addEventListener('click', async () => {
  const linkedinProfiles = [
    'https://www.linkedin.com/in/open-api-90a0a932b/',
    'https://www.linkedin.com/in/samyak-anand-53a189251/',
    'https://www.linkedin.com/in/dummey-use-a8619232b/'
  ];

  document.getElementById('profilesData').innerHTML = '';

  let profileCount = 1;
  for (const profileURL of linkedinProfiles) {
    const profileData = await scrapeProfileData(profileURL);
    console.log(profileData);

    
    const profileInfo = `
      <div class="profile-box">
        <h2>Profile ${profileCount}:</h2>
        <p><strong>Name:</strong> ${profileData.name || 'N/A'}</p>
        <p><strong>Location:</strong> ${profileData.location || 'N/A'}</p>
        <p><strong>About:</strong> ${profileData.about || 'None'}</p>
        <p><strong>Bio:</strong> ${profileData.bio || 'N/A'}</p>
        <p><strong>Follower Count:</strong> ${profileData.followerCount || '0'}</p>
        <p><strong>Connection Count:</strong> ${profileData.connectionCount || '0'}</p>
      </div>
    `;
    document.getElementById('profilesData').insertAdjacentHTML('beforeend', profileInfo);
    profileCount++;

    
    await fetch('http://localhost:3000/api/profiles', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(profileData)
    });
  }
});

async function scrapeProfileData(url) {
  return new Promise((resolve) => {
    chrome.tabs.create({ url, active: false }, (tab) => {
      chrome.tabs.onUpdated.addListener(function listener(updatedTabId, changeInfo) {
        if (updatedTabId === tab.id && changeInfo.status === 'complete') {
          chrome.tabs.sendMessage(tab.id, { action: "scrape" }, (response) => {
            chrome.tabs.remove(tab.id);
            resolve(response);
          });
          chrome.tabs.onUpdated.removeListener(listener);
        }
      });
    });
  });
}



  
  


