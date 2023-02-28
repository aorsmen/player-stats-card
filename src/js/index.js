// Build player stats card
const buildCard = (data) => {
  // Build details
  const { player, stats } = data;
  const name = utils.getFullname(player.name);
  const photo = `assets/images/p${player.id}.png`;

  // Convert stats to key/value pairs
  let statsObj = {};

  stats.forEach(stat => {
    statsObj[stat.name] = stat.value;
  });

  const goalsPerMatch = ((statsObj?.goals || 0) / statsObj.appearances).toFixed(2);  
  const passesPerMinute = ((statsObj.backward_pass + statsObj.fwd_pass) / statsObj.mins_played).toFixed(2);
  const card = TEMPLATES.card
    .replace(/{{NAME}}/g, name)
    .replace(/{{PHOTO}}/g, photo)
    .replace(/{{TEAM}}/g, player.currentTeam.id)
    .replace(/{{POSITION}}/g, player.info.positionInfo)
    .replace('{{APPEARANCES}}', statsObj.appearances)
    .replace('{{GOALS}}', statsObj?.goals || 0)
    .replace('{{ASSISTS}}', statsObj?.goal_assist || 0)
    .replace('{{GOALS_PER_MATCH}}', goalsPerMatch)
    .replace('{{PASSES_PER_MINUTE}}', passesPerMinute);

  document.querySelector('#player').innerHTML = card;
};

// Select player by ID
const selectPlayer = (id) => {
  const data = playersData.filter(item => item.player.id == id)[0];

  buildCard(data);
};

// Fill dropdown options
const setDropdown = (ths, options, select) => {
  const triggerElm = ths.querySelector('.dropdown__trigger');
  const menuElm = ths.querySelector('.dropdown__menu');
  let optHTML = '';

  options.map(item => {
    optHTML += TEMPLATES.option.replace('{{ID}}', item.id).replace('{{VAL}}', item.val);
  });

  menuElm.innerHTML = optHTML;
  
  // Set open menu event
  triggerElm.addEventListener('click', function(){
    ths.classList.toggle('show');
  });

  // Set select option event
  ths.querySelectorAll('.dropdown__option').forEach((elm) => {
    elm.addEventListener('click', function(event){
      event.preventDefault();
      const id = this.getAttribute('href').replace('#', '');
      const val = this.innerText;
  
      if(menuElm.querySelector('.active')){
        menuElm.querySelector('.active').classList.remove('active');
      }

      this.classList.add('active');
      triggerElm.innerText = val;
      select(id);
      ths.classList.remove('show');
    });
  });
};

// Get all players data
let playersData = [];

utils.requestData('/data/player-stats.json', (data) => {
  playersData = data.players;

  const options = playersData.map(item => {
    return {id: item.player.id, val: utils.getFullname(item.player.name)};
  });
  
  setDropdown(document.querySelector('.dropdown'), options, selectPlayer);
});