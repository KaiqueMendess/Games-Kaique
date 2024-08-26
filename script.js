      // Map variables representing keys to ASCII codes
      let [ A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z ] = Array.from({ length: 26 }, (v, i) => 65 + i);

      const Delete = 46;
      const Shift = 16;
      const Ctrl = 17;
      const Alt = 18;

      const Left = 37;
      const Right = 39;
      const Up = 38;
      const Down = 40;

      const Enter = 13;
      const Return = 13;
      const Space = 32;
      const Escape = 27;

     
     // Use $ and document.querySelectorAll instead of dinosauric document.querySelector function
     let $ = selector => document.querySelector(selector);


     // Sort json by multiple properties
     const sortFields = (fields, invert) => (a, b) => fields.map(o => { let dir = 1; if (o[0] === '-') { dir = -1; o=o.substring(1); } return a[o] > b[o] ? dir : a[o] < b[o] ? -(dir) : 0;}).reduce((p, n) => p ? p : n, 0);

     const MENU = Object.freeze({
         system: {
             name: `system`,
             subitems:[
                 [{title:"PlayStation Store", background:"https://semicolon.dev/static/playstation_5_teaser_v2.jpg"}],
                 [{title:"Demon Souls",       background:"img/fundo.jogos/6.jpg"}],
                 [{title:"Spiderman",         background:"img/fundo.jogos/1.jpg"}],
                 [{title:"PlayStation Plus",  background:"https://semicolon.dev/static/background-plus.png"}],
                 [{title:"PlayStation Now",   background:"https://semicolon.dev/static/background-ps-now.png"}],
                 [{title:"Controller",        background:"https://semicolon.dev/static/playstation_5_teaser_v2.jpg"}],
                 [{title:"Photos",            background:"https://semicolon.dev/static/playstation_5_teaser_v2.jpg"}],
                 [{title:"Empty 1",           background:"https://semicolon.dev/static/playstation_5_teaser_v2.jpg"}],
                 [{title:"Empty 2",           background:"https://semicolon.dev/static/playstation_5_teaser_v2.jpg"}],
                 [{title:"Biblioteca",        background:"img/fundo.jogos/biblioteca.png"}],]},
         selectuser: {
             name: `select-user`,
             subitems:
                  []
         },
         main: {
              name: `main`,
              subitems:
                  []},
         browser: {
              name: `browser`,
              subitems:
                  []},
         settings: {
              name: `settings`,
              subitems:
                  []},
     });

     // queable menu
     let menu = null;

     // menu queue object for layered PS5 navigation
     class MenuPS5 {

         constructor() {
             this.queue = []
             this.selectedItemId = null;
             this.selectedUserId = 1;

             this.browsingGames = false;

             this.x = 0; // cursor position on the select-game grid
             this.y = 0;
             this.selectedGameId = 0;
         }

         set push(elementId) {

             // hide previous menu on the queue by removing "current" class
             this.queue.length > 0 && this.queue[this.queue.length - 1].classList.remove(`current`)

             // remove events from current menu
             // todo

             // get menu container
             const m = $(`#${elementId}`)

             // make the new menu appear by applying "current" class
             !m.classList.contains(`current`) && m.classList.add(`current`)

             // push this element onto the menu queue
             this.queue.push( m )

             AttachEventsFor( elementId )

             console.log(`Pushed #${elementId} onto the menu queue`)
         }

         pop() {
             // remove current menu from queue
             const element = this.queue.pop()

             console.log(`Removed #${element.getAttribute('id')} from the menu queue`)
         }
     }

class Background {constructor() {}}

Background.change = url => {
   console.log(`Changing background to ${url}`)

   let currentBackground = $(`.currentBackground`);
   let nextBackground = $(`.nextBackground`);

   // set new background to url
   nextBackground.style.backgroundImage = `url(${url})`
   currentBackground.style.backgroundImage = ''

   // fade in and out
   currentBackground.classList.remove('fade-in')
   nextBackground.classList.add('fade-in')

   // swap background identity
   currentBackground.classList.remove('currentBackground')
   currentBackground.classList.add('nextBackground')
   nextBackground.classList.remove('nextBackground')
   nextBackground.classList.add('currentBackground')
}

function HorizontalOffset(parent, id) {
   if (typeof(parent) == "object") {
       parent.className.split(' ').forEach(className => {
           // remove all classes starting with `off`
           if (className.substring(0, 3) == `off`)
               parent.classList.remove( className )
           // add off-id class
           parent.classList.add(`off-${id}`)
       })
   }
}

function VerticalOffset(parent, id) {
   if (typeof(parent) == "object") {
       parent.className.split(' ').forEach(className => {
           if (className.substring(0, 2) == `y-`)
               parent.classList.remove( className )
           parent.classList.add(`y-${id}`)
       })
   }
}

// Helper function to select 1 item from a set
function SelectItem(all, target) {
   if (typeof(all) == "string" && typeof(target) == "string") {
       document.querySelectorAll(all).forEach(it => it.classList.remove('current'))
       $(target).classList.add('current')
       menu.selectedItemId = $(target).dataset.id
   }
   if (typeof(all) == "object" && typeof(target) == "object") {
       all.forEach(it => it.classList.remove('current'))
       target.classList.add('current')
       menu.selectedItemId = target.dataset.id
   }
}

// Reset a menu to its original state right before it opens
function InitializeMenu( parentElementId ) {

}

let detach_keyboard_events_function = nul => { }

let detach_mouse_events_function = nul => { }

function keyboard_events_main_menu(e) {

   const oo = $(`#oo`);

   let key = e.which || e.keyCode;

   let currentlySelectedItemId = menu.selectedItemId;

   let previousGameXY = `[data-id="game-0-0"]`

   console.log(`menu.browsingGames = ${menu.browsingGames}`)

   if (menu.browsingGames == false) {

       if (key == Left) {

           console.log(`Controls: ${key} (Left)`)
           if (menu.selectedItemId > 0)
               menu.selectedItemId--;
           else
               menu.selectedItemId = 9

           const all = `#primary .sel`
           const target = `#o${menu.selectedItemId}`
           SelectItem(all, target)
           HorizontalOffset(primary, menu.selectedItemId)

           // Set title
           oo.innerHTML = MENU[`system`].subitems[ menu.selectedItemId ][ 0 ].title;

           // If this item has a background image, display it
            const background = MENU[`system`].subitems[ menu.selectedItemId ][ 0 ].background;
           if (background) Background.change(background)
       }

       if (key == Right) {

           console.log(`Controls: ${key} (Right)`)
           if (menu.selectedItemId < 9)
               menu.selectedItemId++;
           else
               menu.selectedItemId = 0;

           const all = `#primary .sel`
           const target = `#o${menu.selectedItemId}`
           SelectItem(all, target)
           HorizontalOffset(primary, menu.selectedItemId)

           // Set title
           oo.innerHTML = MENU[`system`].subitems[ menu.selectedItemId ][ 0 ].title;

           // If this item has a background image, display it
           const background = MENU[`system`].subitems[ menu.selectedItemId ][ 0 ].background;
           if (background) Background.change(background)
       }

       if (key == Enter || key == Space) {

           // remove .current class from main menu
           const target = $(`.sel.current`)
           target.classList.remove('current')

           const id = `[data-id="game-${menu.x}-${menu.y}"]`;

           // assign current to the first game on the list
           $(id).classList.add('current')

           // memorize currently selected item as previous for future updates
           previousGameXY = id

           menu.browsingGames = true
       }

   } else { // browse games

       let gb = $(`#game-browser`);

       document.querySelectorAll(`.game.current`).forEach(el => el.classList.remove('current'))
       document.querySelectorAll(`.under`).forEach(el => el.style.background = '')
       document.querySelectorAll(`.lightwave`).forEach(el => el.style.background = '')

       if (key == Left) {
           console.log('left')
           if (menu.x > 0) menu.x--
       }

       if (key == Right) {
           console.log('right')
           if (menu.x < 7) menu.x++
       }

       if (key == Up) {
           console.log('up')
           if (menu.y > 0) menu.y--
       }

       if (key == Down) {
           console.log('down')
           if (menu.y < 3) menu.y++
       }

       let selectedIndex = (menu.y * 6) + menu.x; // Calcule o índice do jogo baseado na posição

       // Acesse o contêiner do fundo
       let backgroundElement = document.querySelector('#background-1');
       
       // Atualize a imagem de fundo com base no índice
       if (selectedIndex >= 0 && selectedIndex < 16) {
           backgroundElement.style.backgroundImage = `url('img/fundo.jogos/${selectedIndex}.jpg')`;
           backgroundElement.classList.add('fade-in');
       }

console.log(gb)
       VerticalOffset(gb, menu.y)

       const id = `[data-id="game-${menu.x}-${menu.y}"]`

       $(id).classList.add('current')

       previousGameXY = id
   }

   console.log(`currentlySelectedItemId  = ${currentlySelectedItemId}`)

   // remove selected gradient from previously selected item
   $(`#o${currentlySelectedItemId} .under`).style.background = `#1f1f1f`;

   // clear lightspot effect from prevously selected item
   $(`#o${currentlySelectedItemId} .lightwave`).style.backgroundImage = ``;
}

function keyboard_events_select_user(e) {

   let key = e.which || e.keyCode;

   let container = $(`#select-user-container`)
   let selectuser = $(`#selectuser`)

   if (key == Left) {
       if (menu.selectedUserId > 0)
           menu.selectedUserId--;
       const all = `#select-user-container .user-box`
       const target = `#user-${menu.selectedUserId}`
       SelectItem(all, target)
       HorizontalOffset(container, menu.selectedUserId)
   }

   if (key == Right) {
       if (menu.selectedUserId < 2)
           menu.selectedUserId++;
       const all = `#select-user-container .user-box`
       const target = `#user-${menu.selectedUserId}`
       SelectItem(all, target)
       HorizontalOffset(container, menu.selectedUserId)
   }

   if (key == Enter || key == Space) {

       selectuser.classList.add('disappear')

       setTimeout(event => {
           selectuser.style.display = 'none'
       }, 1000)

       setTimeout(time => {
           StartMainMenu()
           DetachKeyboardEventsFromSelectUser()
           AttachKeyboardEventsForMainMenu()
       }, 500)
   }
}

function keyboard_events_game_browser() {

}

function AttachKeyboardEventsForMainMenu() {
   detach_keyboard_events_function()
   document.body.addEventListener("keydown", keyboard_events_main_menu);
   detach_keyboard_events_function = DetachKeyboardEventsFromMainMenu
}

function DetachKeyboardEventsFromMainMenu() {
   document.body.removeEventListener("keydown", keyboard_events_main_menu);
}

function AttachKeyboardEventsForSelectUser() {
   console.log(`AttachKeyboardEventsForSelectUser()`)
   detach_keyboard_events_function()
   document.body.addEventListener("keydown", keyboard_events_select_user);
   detach_keyboard_events_function = DetachKeyboardEventsFromSelectUser
}

function DetachKeyboardEventsFromSelectUser() {
   document.body.removeEventListener("keydown", keyboard_events_select_user);
}

function AttachKeyboardEventsForGameBrowser() {
   detach_keyboard_events_function()
   document.body.addEventListener("keydown", keyboard_events_game_browser);
   detach_keyboard_events_function = DetachKeyboardEventsFromGameBrowser
}

function DetachKeyboardEventsFromGameBrowser() {
   document.body.removeEventListener("keydown", keyboard_events_game_browser);
}

function StartMainMenu() {

   menu.push = `main`

   const def = $(`#o1`); // default menu item

   // change to a new background
   // Background.change('https://semicolon.dev/static/background-8.png')

   // animate #primary UI block within #main container
   primary.classList.remove(`hidden`)
   primary.classList.add(`current`)

   // animate items up
   let T1 = setTimeout(nothing => {
       primary.classList.add('up');
       def.classList.add('current');
       clearInterval(T1)
       T1 = null;
   }, 500)

   // make UI faster (200ms) after initial intro animation that plays at 600ms
   let T2 = setTimeout(nothing => {
       primary.classList.add('faster')
       const selectables = document.querySelectorAll(`#ps5 .sel`);
       selectables.forEach(selectable => selectable.classList.add(`faster`));
       clearInterval(T2)
       T2 = null;
   }, 1000)

   // attach
   const ps5_sel = document.querySelectorAll(`#ps5 .sel`);
   ps5_sel.forEach(selectable =>
       selectable.addEventListener(`click`, event => {
           SelectItem(ps5_sel, event.target)
           HorizontalOffset(primary, event.target.dataset.id)
       })
   )
}

function mouse_events_system_menu() {

   console.log(`Start button pressed!`)

   const system = $(`#system`);
   const primary = $(`#primary`);

   $(`#start-circle-1`).classList.add(`play-a`)
   let TA = setTimeout(() => {
       $(`#start-circle-1`).classList.add(`play-b`)
       clearTimeout(TA)
       TA = null
   }, 200)

   let TB = setTimeout(() => {
       $(`#start-circle-2`).classList.add(`play-c`)
       let TC = setTimeout(() => {
           $(`#start-circle-2`).classList.add(`play-d`)
           clearTimeout(TC)
           TC = null
       }, 300)
       clearTimeout(TB)
       TB = null

       let TD = setTimeout(() => {
           system.style.display = 'none'
           menu.push = `selectuser`
           AttachKeyboardEventsForSelectUser()
       }, 700)

   }, 500)
}

// currently unused
const events = {
   "system": {
       mouse: {},
       keyboard: {},},
   "system-game-browser": {
       mouse: {},
       keyboard: {},},
}

// (hoisted)
function AttachEventsFor( parentElementId ) {

   switch (parentElementId) {

       // "system" is main system menu with game browser
       case "system":

           AttachKeyboardEventsForMainMenu()

           // Attach click event to Start button
           menu.queue[0].addEventListener(`click`, mouse_events_system_menu)

           detach_mouse_events_function = mouse_events_system_menu

         break;

       // "system-browser"
       case "system-game-browser":

         break;
       case "main":

         break;
       case "browser":

         break;
       case "settings":

         break;
   }
}

// (hoisted)
function RemoveEventsFrom(parentElementId) {

   switch (parentElementId) {
       case "system":

         break;
       case "system-browser":

         break;
       case "main":

         break;
       case "browser":

         break;
       case "settings":

         break;
   }
}

let selectedGradientDegree = 0

/* Your DOM just loaded */
window.addEventListener('DOMContentLoaded', event => {

   menu = new MenuPS5()

   // Make item 1 selected (for keyboard controls)
   menu.selectedItemId = 1

   // Push system menu onto the menu
   menu.push = `system`

   // This selects any currently selected item
   // There can only be __one__ currently selected item at a time
   // Continuously rotate currently selected item's gradient border
   let rotate = () => {
       let currentlySelectedItem = $(`div.current .under`)
       let lightwave = $(`div.current .lightwave`)
       if (currentlySelectedItem) {
           currentlySelectedItem.style.background = `conic-gradient(from ${-parseInt(selectedGradientDegree)}deg at 50% 50%, #aaaaaa, black, #aaaaaa, black, #aaaaaa)`
           lightwave.style.transform = `rotate(${selectedGradientDegree}deg)`;
           selectedGradientDegree += 0.8
       }
       window.requestAnimationFrame(rotate)
   }
   window.requestAnimationFrame(rotate)
});

window.onload = event => {
 /* Your media (images, etc.) just loaded */

}
window.addEventListener('load', function() {
    const introVideo = document.getElementById('intro-video');
    const videoContainer = document.getElementById('intro-video-container');

    introVideo.onended = function() {
        videoContainer.classList.add('hidden'); // Aplica a classe que faz o fade-out
    };
});
document.addEventListener('DOMContentLoaded', () => {
    const statusElement = document.querySelector('#status');
    if (statusElement) {
        // Adiciona a classe para animar a entrada
        statusElement.classList.add('enter');

        // Aguarda 5 segundos e então adiciona a classe para animar a saída
        setTimeout(() => {
            statusElement.classList.remove('enter'); // Remove a classe de entrada
            statusElement.classList.add('exit'); // Adiciona a classe de saída
        }, 5000); // 5000ms = 5 segundos
    }
});
document.addEventListener('DOMContentLoaded', () => {
    // Atualiza a hora a cada segundo
    function updateClock() {
        const now = new Date();
        
        let hours = now.getHours();
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const ampm = hours >= 12 ? 'PM' : 'AM';
        
        // Converte para o formato de 12 horas
        hours = hours % 12;
        hours = hours ? hours : 12; // A hora '0' deve ser '12'
        hours = hours.toString().padStart(2, '0');
        
        const timeString = `${hours}:${minutes} ${ampm}`;
        document.getElementById('current-time').textContent = timeString;
    }

    setInterval(updateClock, 1000);
    updateClock(); // Atualiza a hora imediatamente

    // Mostra/esconde o campo de pesquisa ao clicar na lupa
    const searchIcon = document.getElementById('search-icon');
    const searchContainer = document.getElementById('search-container');

    searchIcon.addEventListener('click', () => {
        searchContainer.classList.toggle('active');
    });
});
