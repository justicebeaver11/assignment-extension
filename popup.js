document.getElementById('fetchButton').addEventListener('click', () => {
    chrome.tabs.query({active: true, currentWindow: true}, (tabs) => {
      const activeTab = tabs[0];
      const tabTitle = activeTab.title;
      const tabURL = activeTab.url;
  
    
      document.getElementById('tabTitle').textContent = `Title: ${tabTitle}`;
      document.getElementById('output').style.display = 'block';
  
      
      document.getElementById('urlBox').style.display = 'block';
      document.getElementById('urlBox').textContent = `URL: ${tabURL}`;
  

      console.log(`URL: ${tabURL}`);
    });
  });
  
  document.getElementById('closeButton').addEventListener('click', () => {
    window.close(); 
  });


  document.getElementById('scrapeProfiles').addEventListener('click', async () => {
    const linkedinProfiles = [
      'https://www.linkedin.com/in/open-api-90a0a932b/',
      'https://www.linkedin.com/in/samyak-anand-53a189251/'
    ];
  
    for (const profileURL of linkedinProfiles) {
      const profileData = await scrapeProfileData(profileURL);
      console.log(profileData);
  
    
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


  
  


