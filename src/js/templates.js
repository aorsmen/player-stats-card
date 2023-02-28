const TEMPLATES = {
  card: `<div class="card">
          <div class="card__header">
            <div class="card__media">
              <img src="{{PHOTO}}" alt="{{NAME}}" />
            </div>
          </div>
          <div class="card__body">
            <div class="card__logo team-{{TEAM}}"></div>
            <div class="card__name">{{NAME}}</div>
            <div class="card__position">{{POSITION}}</div>
            <div class="card__details">
              <div class="card__details-row">
                <span>Apperances</span>
                <b>{{APPEARANCES}}</b>
              </div>
              <div class="card__details-row">
                <span>Goals</span>
                <b>{{GOALS}}</b>
              </div>
              <div class="card__details-row">
                <span>Assists</span>
                <b>{{ASSISTS}}</b>
              </div>
              <div class="card__details-row">
                <span>Goals per match</span>
                <b>{{GOALS_PER_MATCH}}</b>
              </div>
              <div class="card__details-row">
                <span>Passes per minute</span>
                <b>{{PASSES_PER_MINUTE}}</b>
              </div>
            </div>
          </div>
        </div>`,
  option: `<a class="dropdown__option" href="#{{ID}}">{{VAL}}</a>`
};