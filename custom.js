

// Docsify configuration
window.$docsify = {
  name: 'Django Design Patterns and Best Practices',
  loadSidebar: true,
  themeColor: '#3f51b5',
  search: {
    paths: 'auto',
    placeholder: 'Search...'
  },
  alias: {
    '/.*/_sidebar.md': '/_sidebar.md'
  },
  markdown: {
      tables: true  // Explicitly enable tables
  },
  plugins: [
    function(hook) {
      hook.doneEach(function() {
        if (!buttonsExist) {
          updateNavigationButtons();
        }
        if (!document.getElementById('theme-toggle')) {
          addThemeToggle();
        }
      });
    }
  ]
};


// Book structure - update this when adding new chapters
const bookStructure = [
  '#/01-Django-and-Patterns/README',
  '#/02-ApplicationDesign/README',
  '#/03-Models/README',
  '#/04-Views-and-URLs/README',
  '#/05-Templates/README',
  '#/06-AdminInterface/README',
  '#/07-Forms/README',
  '#/08-WorkingAsynchronously/README',
  '#/09-CreatingAPIs/README',
  '#/10-Dealing-with-LegacyCode/README',
  '#/11-Testing-and-Debugging/README',
  '#/12-Security/README',
  '#/13-Production-Ready/README',
  '#/Appendix-A-Python2-Versus-Python3/README',
];

// Theme initialization on load
document.addEventListener('DOMContentLoaded', setInitialTheme);

// Global variable to track if buttons exist
let buttonsExist = false;

// Updated navigation function
function updateNavigationButtons() {
  const currentHash = window.location.hash.split('?')[0];
  const currentIndex = bookStructure.findIndex(path => currentHash === path);
  
  // Remove existing buttons if they exist
  const oldButtons = document.querySelector('.nav-buttons');
  if (oldButtons) {
    oldButtons.remove();
    buttonsExist = false;
  }

  if (currentIndex >= 0) {
    const navHtml = `
      <div class="nav-buttons">
        ${currentIndex > 0 ? 
          `<a href="${bookStructure[currentIndex-1]}" class="nav-button prev-button">← Previous</a>` 
          : '<span></span>'}
        ${currentIndex < bookStructure.length-1 ? 
          `<a href="${bookStructure[currentIndex+1]}" class="nav-button next-button">Next →</a>` 
          : ''}
      </div>
    `;
    
    const content = document.querySelector('.content');
    if (content) {
      content.insertAdjacentHTML('beforeend', navHtml);
      buttonsExist = true;
      
      // Add click handlers after buttons are inserted
      document.querySelector('.prev-button')?.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.hash = bookStructure[currentIndex-1];
        setTimeout(updateNavigationButtons, 100);
      });
      
      document.querySelector('.next-button')?.addEventListener('click', function(e) {
        e.preventDefault();
        window.location.hash = bookStructure[currentIndex+1];
        setTimeout(updateNavigationButtons, 100);
      });
    }
  }
}



// Handle hash changes
window.addEventListener('hashchange', function() {
  buttonsExist = false;
  updateNavigationButtons();
});


// Theme functions (keep these the same)
function addThemeToggle() {
  const toggle = document.createElement('div');
  toggle.id = 'theme-toggle';
  toggle.innerHTML = '🌓';
  document.body.appendChild(toggle);
  toggle.addEventListener('click', toggleTheme);
}

function toggleTheme() {
  const lightTheme = document.getElementById('light-theme');
  const darkTheme = document.getElementById('dark-theme');
  const isDark = lightTheme.disabled;
  
  lightTheme.disabled = !isDark;
  darkTheme.disabled = isDark;
  localStorage.setItem('docsify-theme', isDark ? 'light' : 'dark');
}

function setInitialTheme() {
  if (localStorage.getItem('docsify-theme') === 'dark') {
    document.getElementById('light-theme').disabled = true;
    document.getElementById('dark-theme').disabled = false;
  }
}