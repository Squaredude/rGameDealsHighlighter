// ==UserScript==
// @name            r/GameDeals Highlighter
// @namespace       reddit_gamedeals
// @description     r/GameDeals Highlighter
// @version         2.1.2
// @include         https://old.reddit.com/r/gamedeals/*
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

const hasPrime = false; // set true or false if you have/don't have a Prime subscription

const TITLE_COLOR_DEFAULT = "#888";
const TITLE_COLOR_FREEBIE = "#0c0";
const TITLE_COLOR_DISCOUNT = "#cc0";

/*
    the following are the stores I follow, you might have more, you might have fewer,
    I recommend using one line per store and regular expressions (you can do a simple OR with the | symbol)
*/
const aGameStores = [
    // Epic Games Store
    'Epic(?: (?:Store|Game(?:s)?(?: Store)?))?|EGS',

    // Steam
    'Steam',

    // GOG
    'GOG',

    // Amazon (non-Prime)
    'Amazon',

  	// Amazon Prime Gaming
  	'Prime Gaming',

    // Ubisoft
    'Ubisoft(?: Store)?|Uplay',

    // Humble Bundle
    'Humble(?: (?:Store|Bundle))?',

    // Microsoft / XBox
    'Microsoft(?: Store)?',

    // Playstation
    'PS4|PS Store|PSN|Play(?: )?Station(?:(?: )?Store)?'
];

const negFlairs = [
  "Expired",
  '(?:US|UK|DE) Only',
  "Console"
];

// find all posts
$("div.entry p.title").each(function(idx, item) {
    var $title = $(item).find("a.title"); // find the link/title
    var title = $title.html(); // get the title text
    var $flair = $(item).find(".linkflairlabel"); // find the flair
    var flair = $flair.html(); // get flair text
    var i = 0;
    var re = null;
        if(title[0] != '[') { /* post title must begin with a [, otherwise go to next item */
            return;
        }
    $title.css("color", TITLE_COLOR_DEFAULT); // set default color, the idea is to tone down titles so they don't stand out
        if($flair.length > 0) {
            // loop through undesirable flairs (such as "Expired"), and skip this item if found
            for(i = 0; i < negFlairs.length; i++) {
                re = new RegExp("^(?:" + negFlairs[i] + ")", "i");
                  if(re.test(flair)) {
                    return; // found undesirable flair, skip item
                  }
            }
        }
        for(i = 0; i < aGameStores.length; i++) { // loop through my game stores
            re = new RegExp("^\\[(?:" + aGameStores[i] + ")\\]", "i"); // use my regular expressions
                if(re.test(title)) {
                    re = new RegExp("(?:\\(Free|100\\%)", "i"); // check if there's a freebie
                        /*
                            Prime Gaming is a special case, since freebies depend on me having a subscription,
                            therefore, now we have a user-set flag to check if one is entitled to the freebie
                            if the flag is set to false, the match is treated as a "discount"
                        */
                        if(re.test(title) || (aGameStores[i] == "Prime Gaming" && hasPrime == true)) {
                            $title.css("color", TITLE_COLOR_FREEBIE);
                            return;
                        }
                    $title.css("color", TITLE_COLOR_DISCOUNT);
                    return;
                }
        }
});
