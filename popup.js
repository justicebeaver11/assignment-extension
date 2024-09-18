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
  
  
  