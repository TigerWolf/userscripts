// ==UserScript==
// @name       Trello JIRA links
// @namespace  http://use.i.E.your.homepage/
// @version    0.1
// @description  Add JIRA links to trello cards
// @match      https://trello.com/b/*
// @copyright  2012+, You
// @require http://code.jquery.com/jquery-latest.js
// ==/UserScript==

$(window).bind("load", function() {
    $('.list').bind('DOMNodeInserted DOMNodeRemoved DOMSubtreeModified', function(event) {
        if (event.type == 'DOMNodeInserted') {
            var myRegxp = /^([0-9]){3}$/;
            var cards = $(this).find('.list-card-details a'); //.text();
            cards.each(function() {
                var done = false;
                if ($(this).parent().find(".jiralink").length > 0){
                    done = true;
                }
                var card_text = $(this).clone().children().remove().end().text();
                if(myRegxp.test(card_text) == true && done == false) {
                    $(this).parent().append('<div class="jiralink" target="_blank" style="position: absolute;margin-right: 10px;top: 0;right: 19px;float: right;text-decoration: underline;" href="http://jira.adelaide.edu.au/browse/CRS-'+card_text+'"><img src="https://confluence.atlassian.com/images/icons/favicon.png" style="top: 4px;position: relative;">JIRA</a>');
                    $( ".jiralink" ).unbind().bind( "click", function(e) {
                        e.preventDefault(); 
                        e.stopPropagation();
                        window.open($(this).attr('href'),'_blank');
                    });
                }
            });
        } 
    });
});
