$(function(){
  //Grabs user input and calls function to display items
  $(".search-form").submit(function(event){
    event.preventDefault();
    var userInput = $("#search-input").val();
    $("#search-input").val("");
    $(".search-btn").blur();
    if(!userInput){
      return;
    }
    showResults(userInput);
  });

  function showResults(item){
    
  }
});