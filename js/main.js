(function () {
  //Game setup
  const $box = $('.box');
  var player1 = $('#player1');
  var player2 = $('#player2');
  player1.addClass('active');

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
    $('#finish').hide();
    $('.screen-win .button').click(() => {
        $('#finish').hide();
        $box.map((index, box) =>{
          let $currBox = $(box);
          $currBox.removeClass('box-filled-1');
          $currBox.removeClass('box-filled-2');
          $('#finish').removeClass('screen-win-one');
          $('#finish').removeClass('screen-win-two');
          $('#finish').removeClass('screen-win-tie');
          $('.message').empty();
          $currBox.css('background-image', 'none');
        });
    });
  $('.screen').css('z-index', '999');

  //Display preview of move on hover
  $box.mouseenter(e => {
    const box = $(e.target);
    if(box.css('background-image') === 'none'){
      if(player1.hasClass('active')){
        box.css("background-image", "url('img/o.svg')");
      } else {
        box.css("background-image", "url('img/x.svg')");
      }
    }
  })
  $box.mouseleave(e => {
    const box = $(e.target);
    if(box.css('background-color') === 'rgb(239, 239, 239)'){
      box.css("background-image", 'none');
    }
  })

  //Apply X or O depending on active player
  $box.click(e => {
    const box = $(e.target);
    if(isEmpty(box) && player1.hasClass('active')){
        box.addClass('box-filled-1');
      } else if(isEmpty(box) && player2.hasClass('active')){
        box.addClass('box-filled-2');
      }
      checkForWinner();
      $('.players').toggleClass('active');
  });

  //Check If a Box Has Been Selected
  function isEmpty(box){
    return !box.hasClass('box-filled-1') && !box.hasClass('box-filled-2');
  }

  //Check if board is full or player has won
  function checkForWinner(){
      let boardState = [];
      function updateBoardState (filledClass) {
        //Check Columns
        for(let i = 0; i < 3; i++){
          boardState.push($box.eq(i).hasClass(filledClass) && $box.eq(i+3).hasClass(filledClass) && $box.eq(i+6).hasClass(filledClass));
        }
        //Check Rows
        for(let i = 0; i < 7; i += 3){
          boardState.push($box.eq(i).hasClass(filledClass) && $box.eq(i+1).hasClass(filledClass) && $box.eq(i+2).hasClass(filledClass));
        }
        //Check Diagonals
        boardState.push($box.eq(0).hasClass(filledClass) && $box.eq(4).hasClass(filledClass) && $box.eq(8).hasClass(filledClass));
        boardState.push($box.eq(2).hasClass(filledClass) && $box.eq(4).hasClass(filledClass) && $box.eq(6).hasClass(filledClass));
      }
      updateBoardState('box-filled-1');
      updateBoardState('box-filled-2');

      //Check if all boxes have been selected
      function isBoardFull(){
        let board = $box.map((index, currBox) => {
          let $currBox = $(currBox);
          return isEmpty($currBox);
        });
        return !board.get().includes(true);
      }

      if(boardState.includes(true)){
        if($('.active').attr('id') === 'player1'){
          $('#finish').addClass('screen-win-one');
          $('.message').append('Winner');
          $('#finish').show();
        } else {
          $('#finish').addClass('screen-win-two');
          $('.message').append('Winner');
          $('#finish').show();
        }
      } else if(isBoardFull()) {
        $('.message').append('It\'s a Tie!');
        $('#finish').addClass('screen-win-tie');
        $('#finish').show();
      }
  }
})();
