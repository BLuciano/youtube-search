$(function(){
  var search, prevToken, nextToken;

  //Shows the Youtube results shown by the search criteria
  function showResults(token){
    var url = "https://www.googleapis.com/youtube/v3/search";
    var opts = {
      part : "snippet",
      key  : "AIzaSyAmcy3QNATPg4w6p2cXWOWnkXv5kJqV4tA",
      maxResults : 12,
      pageToken : "" || token,
      q : search
    };

    $.getJSON(url, opts, function(){
      $(".search-btn").val("Searching...");
    })
    .done(function(data){
      var results = data.items;
      var html = "";
      
      if(data.items.length === 0){
        $(".curr-result").text("No results were found for " + search);
        return;
      }

      prevToken = data.prevPageToken || "";
      nextToken = data.nextPageToken || "";
      prevToken? $(".prev").show() : $(".prev").hide();
      nextToken? $(".next").show() : $(".next").hide();

      $(".curr-result").text("Showing results for " + search);
      $.each(results, function(index, value){
        html+= "<li class='thumbnail'>";
        html+= "<a target='_blank'";
        html+= "href='https://www.youtube.com/watch?v=" + value.id.videoId + "'>";
        html+= "<img src='" + value.snippet.thumbnails.medium.url + "'>";
        html+= "<p>" + value.snippet.title + "</p></a></li>";
      });
      $(".results-list").html(html);
    })
    .fail(function(){
      $(".curr-result").text("There was an error trying to retrieve the information");
    })
    .always(function(){
      $(".search-btn").val("Search");
    });
  }

  //Grabs user input and calls function to display items
  $(".search-form").submit(function(event){
    event.preventDefault();
    search = $("#search-input").val();
    $("#search-input").val("");
    $(".search-btn").blur();
    if(!search){
      return;
    }
    showResults();
  });

  //
});