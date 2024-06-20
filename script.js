// script.js

const recentlyAddedGames = [
    { title: 'Resgate O Soldado', img: 'https://c.wallhere.com/photos/c1/05/Battlefield_Hardline_video_games_war_soldier_military_bokeh_assault_rifle_rain-74730.jpg!d', link: 'RESGATE-O-SOLDADO/index.html' },
    { title: 'Genius', img: 'https://i.ytimg.com/vi/4AYXTT9PObA/hq720.jpg?sqp=-oaymwE7CK4FEIIDSFryq4qpAy0IARUAAAAAGAElAADIQj0AgKJD8AEB-AHUBoAC4AOKAgwIABABGH8gRCgTMA8=&rs=AOn4CLCgYZZqhxXE43clKcjDngt-FiPSyA', link: 'GENIUS/index.HMTL' }
];

const leavingSoonGames = [
    { title: 'Dino Game', img: 'https://www.coolmathgames.com/sites/default/files/styles/mobile_game_image/public/DinoGame_OG-logo.jpg?itok=XlBDwlws', link: 'DINO-GAME/index.html' },
    { title: 'Mario - The Card Game', img: 'https://i.ytimg.com/vi/hEYlAcmkMkM/maxresdefault.jpg', link: 'MARIO-GAME/index.html' }
];

const allGames = [
    { title: 'Jogo Da Velha', img: 'https://e1.pxfuel.com/desktop-wallpaper/835/899/desktop-wallpaper-tic-tac-toe-tic.jpg', category: 'classic', link: 'JOGO-DA-VELHA/index.html' },
    { title: 'Space War', img: 'https://i.pinimg.com/originals/fd/c6/21/fdc6217db7c49818e985b51a09319dc5.jpg', category: 'indie', link: 'SPACE-WAR/index.html' },
    { title: 'Snake Game', img: 'https://wallpapers.com/images/hd/snake-game-1680-x-1050-background-6syqer1fr6oahe0b.jpg', category: 'family-friendly', link: 'SNAKE-GAME/inndex.html' },
];

function displayGames(games, containerId) {
    const container = document.getElementById(containerId);
    container.style.opacity = 0;  // Start with opacity 0 for fade-in effect
    setTimeout(() => {
        container.innerHTML = '';
        games.forEach(game => {
            const gameCard = document.createElement('div');
            gameCard.classList.add('game-card');
            
            // Create an anchor element to wrap around the game content
            const gameLink = document.createElement('a');
            gameLink.href = game.link; // Use the link specified in the game object
            
            // Create the image element
            const img = document.createElement('img');
            img.src = game.img;
            img.alt = game.title;
            
            // Create the title element
            const title = document.createElement('h3');
            title.textContent = game.title;
            
            // Append image and title to the anchor element
            gameLink.appendChild(img);
            gameLink.appendChild(title);
            
            // Append anchor element to gameCard
            gameCard.appendChild(gameLink);
            
            container.appendChild(gameCard);

            // Add mouseover animation
            gameCard.addEventListener('mouseover', () => {
                gameCard.classList.add('hover');
            });

            gameCard.addEventListener('mouseout', () => {
                gameCard.classList.remove('hover');
            });
        });
        container.style.opacity = 1;  // Set opacity to 1 for fade-in effect
    }, 300);  // Delay to allow opacity transition
}

document.addEventListener('DOMContentLoaded', () => {
    displayGames(recentlyAddedGames, 'recently-added-games');
    displayGames(leavingSoonGames, 'leaving-soon-games');
    displayGames(allGames, 'all-games');

    const categoryButtons = document.querySelectorAll('.category');
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.getAttribute('data-category');
            const filteredGames = allGames.filter(game => game.category === category);
            displayGames(filteredGames, 'all-games');
        });
    });

    const searchInput = document.getElementById('search');
    searchInput.addEventListener('input', (e) => {
        const query = e.target.value.toLowerCase();
        const filteredGames = allGames.filter(game => game.title.toLowerCase().includes(query));
        displayGames(filteredGames, 'all-games');
    });
});
