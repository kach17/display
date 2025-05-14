document.addEventListener('DOMContentLoaded', () => {
    // Ensure config variables are loaded
    if (typeof TMDB_API_KEY === 'undefined' || typeof ITEMS_TO_DISPLAY === 'undefined') {
        console.error("Configuration (config.js) not loaded or variables missing.");
        const dramaListContainer = document.getElementById('drama-list-container');
        if (dramaListContainer) {
            dramaListContainer.innerHTML = `<p style="color: red; text-align: center;">Error: Configuration file not loaded. Please check console.</p>`;
        }
        return;
    }

    const apiKey = TMDB_API_KEY;
    const itemsToDisplay = ITEMS_TO_DISPLAY;
    const dramaListContainer = document.getElementById('drama-list-container');
    const modal = document.getElementById('mediaModal');
    const modalBody = document.getElementById('modal-body-content');
    const closeButton = document.querySelector('.close-button');

    if (!dramaListContainer || !modal || !modalBody || !closeButton) {
        console.error("Essential HTML elements for script are missing (drama-list-container, mediaModal, modal-body-content, or close-button).");
        if(dramaListContainer) dramaListContainer.innerHTML = `<p style="color: red; text-align: center;">Error: Essential HTML elements missing. Check console.</p>`;
        return;
    }

    if (apiKey === 'YOUR_TMDB_API_KEY' || !apiKey) {
        dramaListContainer.innerHTML = `<p style="color: red; text-align: center;">Please add your TMDB API key in config.js</p>`;
        console.error("TMDB API Key is missing in config.js.");
        return;
    }

    if (!itemsToDisplay || itemsToDisplay.length === 0) {
        dramaListContainer.innerHTML = `<p style="text-align: center;">No items to display. Add some to config.js.</p>`;
        return;
    }

    itemsToDisplay.forEach(item => {
        fetchItemDetails(item.id, item.type);
    });

    async function fetchItemDetails(id, type) {
        const url = `https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}&language=en-US&append_to_response=external_ids`;
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status} for ${type} ID ${id}`);
            }
            const data = await response.json();
            displayItemCard(data, type);
        } catch (error) {
            console.error('Error fetching item details:', error);
            if (dramaListContainer.children.length === 0 && !dramaListContainer.textContent.includes('Error loading details')) {
                 dramaListContainer.innerHTML += `<p>Error loading details for an item. Check console.</p>`;
            }
        }
    }

    function displayItemCard(itemData, type) {
        const card = document.createElement('div');
        card.classList.add('drama-card');

        const backdropPath = itemData.backdrop_path ? `https://image.tmdb.org/t/p/w500${itemData.backdrop_path}` : 'https://via.placeholder.com/300x170?text=No+Backdrop';

        card.innerHTML = `
            <img src="${backdropPath}" alt="${itemData.name || itemData.title} backdrop" class="backdrop">
            <div class="info">
                <h2>${itemData.name || itemData.title}</h2>
                <p><strong>${type === 'tv' ? 'First Air Date' : 'Release Date'}:</strong> ${itemData.first_air_date || itemData.release_date || 'N/A'}</p>
                <p><strong>Rating:</strong> ${itemData.vote_average ? itemData.vote_average.toFixed(1) : 'N/A'}/10</p>
            </div>
        `;

        card.addEventListener('click', () => showItemModal(itemData, type));
        dramaListContainer.appendChild(card);
    }

    function showItemModal(itemData, type) {
        const posterPath = itemData.poster_path ? `https://image.tmdb.org/t/p/w300${itemData.poster_path}` : '';

        let detailsHtml = '';
        if (posterPath) {
            detailsHtml += `<img src="${posterPath}" alt="${itemData.name || itemData.title} poster" class="modal-poster">`;
        }

        detailsHtml += `
            <h2>${itemData.name || itemData.title}</h2>
            <p><strong>Overview:</strong> ${itemData.overview || 'N/A'}</p>
            <p><strong>Rating:</strong> ${itemData.vote_average ? itemData.vote_average.toFixed(1) : 'N/A'}/10 (${itemData.vote_count || 0} votes)</p>
            <p><strong>Original Language:</strong> ${itemData.original_language ? itemData.original_language.toUpperCase() : 'N/A'}</p>
        `;

        if (type === 'tv') {
            detailsHtml += `
                <p><strong>First Air Date:</strong> ${itemData.first_air_date || 'N/A'}</p>
                <p><strong>Last Air Date:</strong> ${itemData.last_air_date || 'N/A'}</p>
                <p><strong>Seasons:</strong> ${itemData.number_of_seasons || 'N/A'}</p>
                <p><strong>Episodes:</strong> ${itemData.number_of_episodes || 'N/A'}</p>
                ${itemData.episode_run_time && itemData.episode_run_time.length > 0 ? `<p><strong>Episode Run Time:</strong> ${itemData.episode_run_time.join(', ')} min</p>` : ''}
            `;
        } else if (type === 'movie') {
            detailsHtml += `
                <p><strong>Release Date:</strong> ${itemData.release_date || 'N/A'}</p>
                ${itemData.runtime ? `<p><strong>Runtime:</strong> ${itemData.runtime} min</p>` : ''}
                ${itemData.budget > 0 ? `<p><strong>Budget:</strong> $${itemData.budget.toLocaleString()}</p>` : ''}
                ${itemData.revenue > 0 ? `<p><strong>Revenue:</strong> $${itemData.revenue.toLocaleString()}</p>` : ''}
            `;
        }

        detailsHtml += `
            ${itemData.genres && itemData.genres.length > 0 ? `<p><strong>Genres:</strong> ${itemData.genres.map(g => g.name).join(', ')}</p>` : ''}
            ${itemData.homepage ? `<p><strong>Homepage:</strong> <a href="${itemData.homepage}" target="_blank" rel="noopener noreferrer">${itemData.homepage}</a></p>` : ''}
            <p><strong>TMDB ID:</strong> ${itemData.id}</p>
            ${itemData.external_ids && itemData.external_ids.imdb_id ? `<p><strong>IMDb ID:</strong> <a href="https://www.imdb.com/title/${itemData.external_ids.imdb_id}" target="_blank" rel="noopener noreferrer">${itemData.external_ids.imdb_id}</a></p>` : ''}
            ${itemData.origin_country && itemData.origin_country.length > 0 ? `<p><strong>Origin Country:</strong> ${itemData.origin_country.join(', ')}</p>` : ''}
            ${itemData.production_companies && itemData.production_companies.length > 0 ? `<p><strong>Production Companies:</strong> ${itemData.production_companies.map(pc => pc.name).join(', ')}</p>` : ''}
        `;
        
        modalBody.innerHTML = detailsHtml; // Set content
        modal.style.display = 'block'; // Display modal
    }

    closeButton.onclick = () => {
        modal.style.display = 'none';
    }
    window.onclick = (event) => {
        if (event.target == modal) {
            modal.style.display = 'none';
        }
    }
});