/*1. Can search wikipedia via a search bar and view resulting articles on page
    Hint #2: Here's an entry on using Wikipedia's API: https://www.mediawiki.org/wiki/API:Main_page
  2. I can click a button to see a random wikipedia article
    Hint #1: Here's a URL you can use to get a random Wikipedia article: https://en.wikipedia.org/wiki/Special:Random


*/
//main
$("document").ready(function(){
    var prot = window.location.protocol; //get connection protocol
    //event handler for form submit
    $("#search").on("submit", function(event){
      var data = $("#search-box").val()
      getWikipediaData(data);
      //getWikipediaData(data); //function to request wikipedia data
      event.preventDefault();
    });
  
    //event handler for random button
    $("#random").on("click", function(){
      console.log("clicked!");
      window.open(prot + "//en.wikipedia.org/wiki/Special:Random", "Wikipedia");
      event.preventDefault();
    });
  
    //Function to retrieve wikipedia data
    function getWikipediaData(data){
      var numberPages = 10;
      var searchString = encodeURI(data);
      var apiURL = prot + '//en.wikipedia.org/w/api.php?action=opensearch&search=' + searchString + '&profile=fuzzy&suggest=true&format=json';
  
  
  
      //formatversion=2   - for json requests
      //continue=   - empty passed to get continue
  
      //make ajax request
       var request = $.ajax({
         type: 'GET',
          url: apiURL,
          dataType: 'jsonp',
          jsonp: "callback",
          headers: { 'Api-User-Agent': 'FreeCodeCamp Wikipedia Viewer' }
      });
  
      //handle succesful request
      request.success(function(data){
        //do something with the received data
        //check for continue string.  If present, resubmit request with continue to get more
        console.log(data);
        //console.log(data[0]); //search string
        //console.log(data[1]); // array listing titles
        //console.log(data[2]); // array listing description
        //console.log(data[3]); // array listing link
        $("#articles").html("");
  
        for(var i = 0; i < data[1].length; i++){
          //console.log("Title: " + data[1][i] + "\n Description: " + data[2][i] + "\n Link: " + data[3][i]);
          console.log(data);
          $("#articles").append("<div class='article'><a href='" + data[3][i] + "' target='_blank'><h3>" + data[1][i] + "</h3><p>" + data[2][i] + "</p></a></div>");
        }
  
      });
  
      //handle errors
      request.error(function(error){
        console.log("An error has occured while retrieving data!");
      });
  
  
    }
  
  });
        //# sourceURL=pen.js