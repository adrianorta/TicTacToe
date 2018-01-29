//Add start screen
$('.board').append(`
  <div class="screen screen-start" id="start">
    <header>
      <h1>Tic Tac Toe</h1>
      <a href="#" class="button">Start game</a>
    </header>
  </div>`);
  $('.screen-start .button').click(() => {
    $('#start').hide();
  });

//Add finish screen
$('.board').append(`
  <div class="screen screen-win" id="finish">
	  <header>
	    <h1>Tic Tac Toe</h1>
	    <p class="message"></p>
	    <a href="#" class="button">New game</a>
	  </header>
	</div>`);

//Game setup
var player1 = $('#player1');
var player2 = $('#player2');
$('.screen').css('z-index', '999');
$('#finish').hide();
player1.addClass('active');

//Display preview of move on hover
$('.box').mouseenter(e => {
  var box = $(e.target);
  if(box.css('background-image') === 'none'){
    if(player1.hasClass('active')){
      box.css("background-image", "url('img/o.svg')");
    } else {
      box.css("background-image", "url('img/x.svg')");
    }
  }
})
$('.box').mouseleave(e => {
  let box = $(e.target);
  if(box.css('background-color') === 'rgb(239, 239, 239)'){
    box.css("background-image", 'none');
  }
})

//Apply X or O depending on active player
$('.box').click(e => {
  let $box = $(e.target);
  if(isEmpty($box) && player1.hasClass('active')){
      $box.addClass('box-filled-1');
      checkForWinner();
      $('.players').toggleClass('active');
    } else if(isEmpty($box) && player2.hasClass('active')){
      $box.addClass('box-filled-2');
      checkForWinner();
      $('.players').toggleClass('active');
    }
});

//Check If a Box Has Been Selected
function isEmpty(box){
  return !box.hasClass('box-filled-1') && !box.hasClass('box-filled-2');
}

//Check if all boxes have been selected
function isBoardFull(){
  let board = $('.box').map((index, box) => {
    let $box = $(box);
    return isEmpty($box);
  });
  return !board.get().includes(true);
}

//Check if board is full or player has won
function checkForWinner(){
    if(
    [
      $('.box')
      .filter(':nth-child(1).box-filled-1, :nth-child(2).box-filled-1, :nth-child(3).box-filled-1')
      .length === 3,
      $('.box')
      .filter(':nth-child(4).box-filled-1, :nth-child(5).box-filled-1, :nth-child(6).box-filled-1')
      .length === 3,
      $('.box')
      .filter(':nth-child(7).box-filled-1, :nth-child(8).box-filled-1, :nth-child(9).box-filled-1')
      .length === 3,
      $('.box')
      .filter(':nth-child(1).box-filled-1, :nth-child(4).box-filled-1, :nth-child(7).box-filled-1')
      .length === 3,
      $('.box')
      .filter(':nth-child(2).box-filled-1, :nth-child(5).box-filled-1, :nth-child(8).box-filled-1')
      .length === 3,
      $('.box')
      .filter(':nth-child(3).box-filled-1, :nth-child(6).box-filled-1, :nth-child(9).box-filled-1')
      .length === 3,
      $('.box')
      .filter(':nth-child(1).box-filled-1, :nth-child(5).box-filled-1, :nth-child(9).box-filled-1')
      .length === 3,
      $('.box')
      .filter(':nth-child(3).box-filled-1, :nth-child(5).box-filled-1, :nth-child(7).box-filled-1')
      .length === 3,
      $('.box')
      .filter(':nth-child(1).box-filled-2, :nth-child(2).box-filled-2, :nth-child(3).box-filled-2')
      .length === 3,
      $('.box')
      .filter(':nth-child(4).box-filled-2, :nth-child(5).box-filled-2, :nth-child(6).box-filled-2')
      .length === 3,
      $('.box')
      .filter(':nth-child(7).box-filled-2, :nth-child(8).box-filled-2, :nth-child(9).box-filled-2')
      .length === 3,
      $('.box')
      .filter(':nth-child(1).box-filled-2, :nth-child(4).box-filled-2, :nth-child(7).box-filled-2')
      .length === 3,
      $('.box')
      .filter(':nth-child(2).box-filled-2, :nth-child(5).box-filled-2, :nth-child(8).box-filled-2')
      .length === 3,
      $('.box')
      .filter(':nth-child(3).box-filled-2, :nth-child(6).box-filled-2, :nth-child(9).box-filled-2')
      .length === 3,
      $('.box')
      .filter(':nth-child(1).box-filled-2, :nth-child(5).box-filled-2, :nth-child(9).box-filled-2')
      .length === 3,
      $('.box')
      .filter(':nth-child(3).box-filled-2, :nth-child(5).box-filled-2, :nth-child(7).box-filled-2')
      .length === 3,
    ].includes(true)){
      if($('.active').attr('id') === 'player1'){
        $('#finish').addClass('screen-win-one');
        $('.message').append('Winner');
        $('#finish').show();
      } else {
        $('#finish').addClass('screen-win-two');
        $('.message').append('Winner');
        $('#finish').show();
      }
    } else if(isBoardFull()){
      $('.message').append('It\'s a Tie!');
      $('#finish').addClass('screen-win-tie');
      $('#finish').show();
    }
}

//Start new game
$('.screen-win .button').click(() => {
  $('#finish').hide();
  $('.box').map((index, box) =>{
    let $box = $(box);
    $box.removeClass('box-filled-1');
    $box.removeClass('box-filled-2');
    $('#finish').removeClass('screen-win-one');
    $('#finish').removeClass('screen-win-two');
    $('#finish').removeClass('screen-win-tie');
    $('.message').empty();
    $box.css('background-image', 'none');
  });
});
