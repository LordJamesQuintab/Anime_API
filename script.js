async function search() {
    const query = document.getElementById('search_query').value;

    const requestUrl = `https://api.jikan.moe/v4/anime?q=${encodeURIComponent(query)}&sfw`;

    try {
        const response = await fetch(requestUrl);
        const data = await response.json();

        const node = document.getElementById('search_results');
        node.innerHTML = ''; // Clear previous results

        const maxResults = 16;
        let i = 0;
        
        data.data.forEach(item => {
            if (i >= maxResults) return;

            if (item.images && item.images.jpg && item.images.jpg.large_image_url) {
                const card = document.createElement('div');
                card.className = 'card';
                card.innerHTML = `
                    <img loading="lazy" src="${item.images.jpg.large_image_url}" alt="${item.title}" />
                `;
                
                // Make the image clickable
                const img = card.querySelector('img');
                img.style.cursor = 'pointer';
                img.onclick = () => window.open(item.images.jpg.large_image_url, '_blank');

                node.appendChild(card);
                i++;
            }
        });
    } catch (error) {
        console.error('Error:', error);
    }
}

document.getElementById('search').onclick = search;
document.getElementById('search_query').onkeydown = (event) => {
    if (event.key === 'Enter') {
        search();
    }
};