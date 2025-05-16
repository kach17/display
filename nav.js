document.addEventListener('DOMContentLoaded', function() {
  // Get the current page filename
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  
  // Create the navigation HTML
  const navHTML = `
    <nav class="main-nav">
      <div class="nav-center">
        <a href="watched_dramas.html" class="${currentPage === 'watched_dramas.html' ? 'active' : ''}">
          <i class="fas fa-th-large"></i> My Collection
        </a>
        <a href="collection_stats.html" class="${currentPage === 'collection_stats.html' ? 'active' : ''}">
          <i class="fas fa-chart-pie"></i> Statistics
        </a>
        <a href="get_list.html" class="${currentPage === 'get_list.html' ? 'active' : ''}">
          <i class="fas fa-plus-circle"></i> Add Shows
        </a>
      </div>
      <div class="settings-container">
        <button id="settingsBtn" class="settings-btn">
          <i class="fas fa-cog"></i>
        </button>
        <div id="settingsDropdown" class="settings-dropdown">
          <a href="#" id="exportDataBtn"><i class="fas fa-file-export"></i> Export Data</a>
          <a href="#" id="importDataBtn"><i class="fas fa-file-import"></i> Import Data</a>
          <a href="#" id="clearBtn"><i class="fas fa-trash"></i> Clear Data</a>
          <!-- Add more settings options here as needed -->
        </div>
      </div>
    </nav>
  `;
  
  // Find the h1 element to insert the navigation after
  const h1Element = document.querySelector('h1');
  if (h1Element) {
    // Insert the navigation after the h1
    h1Element.insertAdjacentHTML('afterend', navHTML);
    
    // Add event listener for settings button
    const settingsBtn = document.getElementById('settingsBtn');
    const settingsDropdown = document.getElementById('settingsDropdown');
    
    if (settingsBtn && settingsDropdown) {
      settingsBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        settingsDropdown.classList.toggle('show');
      });
      
      // Close dropdown when clicking elsewhere
      document.addEventListener('click', function() {
        if (settingsDropdown.classList.contains('show')) {
          settingsDropdown.classList.remove('show');
        }
      });
      
      // Add event listener for export button
      const exportDataBtn = document.getElementById('exportDataBtn');
      if (exportDataBtn) {
        exportDataBtn.addEventListener('click', function(e) {
          e.preventDefault();
          exportData();
        });
      }
      
      // Add event listener for import button
      const importDataBtn = document.getElementById('importDataBtn');
      if (importDataBtn) {
        importDataBtn.addEventListener('click', function(e) {
          e.preventDefault();
          importData();
        });
      }
      
      // Add event listener for clear button if needed
      const clearBtn = document.getElementById('clearBtn');
      if (clearBtn) {
        clearBtn.addEventListener('click', function(e) {
          e.preventDefault();
          // Add your clear functionality here
          if (confirm('Are you sure you want to clear all data? This cannot be undone.')) {
            localStorage.clear();
            alert('All data has been cleared.');
            window.location.reload();
          }
        });
      }
    }
  }
  
  // Function to export data
  function exportData() {
    try {
      // Get data from localStorage
      const watchedDramas = JSON.parse(localStorage.getItem('watchedDramasData')) || [];
      const tmdbMatcherSettings = JSON.parse(localStorage.getItem('tmdbMatcherSettings')) || {};
      
      // Create export object with all relevant data
      const exportData = {
        watchedDramas: watchedDramas,
        settings: tmdbMatcherSettings,
        exportDate: new Date().toISOString()
      };
      
      // Convert to JSON string
      const dataStr = JSON.stringify(exportData, null, 2);
      
      // Create download link
      const dataUri = 'data:application/json;charset=utf-8,'+ encodeURIComponent(dataStr);
      const exportFileDefaultName = 'drama_collection_backup_' + new Date().toISOString().split('T')[0] + '.json';
      
      // Create temporary link element and trigger download
      const linkElement = document.createElement('a');
      linkElement.setAttribute('href', dataUri);
      linkElement.setAttribute('download', exportFileDefaultName);
      linkElement.click();
      
      alert('Data exported successfully!');
    } catch (error) {
      console.error('Export failed:', error);
      alert('Export failed: ' + error.message);
    }
  }
  
  // Function to import data
  function importData() {
    // Create file input element
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.json';
    
    fileInput.addEventListener('change', function(e) {
      const file = e.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = function(e) {
        try {
          const importedData = JSON.parse(e.target.result);
          
          // Validate imported data structure
          if (!importedData.watchedDramas || !Array.isArray(importedData.watchedDramas)) {
            throw new Error('Invalid data format: watchedDramas array missing');
          }
          
          // Confirm before overwriting
          if (confirm(`Import ${importedData.watchedDramas.length} dramas? This will overwrite your current collection.`)) {
            // Store data in localStorage
            localStorage.setItem('watchedDramasData', JSON.stringify(importedData.watchedDramas));
            
            // Import settings if available
            if (importedData.settings) {
              localStorage.setItem('tmdbMatcherSettings', JSON.stringify(importedData.settings));
            }
            
            alert('Data imported successfully! Reloading page...');
            window.location.reload();
          }
        } catch (error) {
          console.error('Import failed:', error);
          alert('Import failed: ' + error.message);
        }
      };
      reader.readAsText(file);
    });
    
    // Trigger file selection
    fileInput.click();
  }
});