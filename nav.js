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
});