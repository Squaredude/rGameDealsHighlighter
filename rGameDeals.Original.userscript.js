// ==UserScript==
// @name            r/GameDeals Highlighter
// @namespace       reddit_gamedeals
// @description     r/GameDeals Highlighter
// @version         1.0
// @include         https://*.reddit.com/r/gamedeals/*
// @require         https://ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js
// ==/UserScript==

var aGameStores = new Array(
    // site:epicgames.com OR title:epicgamestore OR title:"epic game store" OR title:"EGS" OR title:"epic games"
    'Epic(?: (?:Store|Games(?: Store)?))?|EGS',

    // site:steampowered.com
    'Steam',

    // site:gog.com OR title:gog OR title:"good old games"
    'GOG',

    // site:amazon. OR title:Amazon
    'Amazon',

    // site:ubisoft.com OR site:store.ubi.com OR title:ubisoft OR title:uplay
    'Ubisoft(?: Store)?|Uplay',

    // site:humblebundle.com OR title:humble
    'Humble(?: (?:Store|Bundle))',

    // site:(microsoft.com OR microsoftstore.com)
    'Microsoft(?: Store)?',

    // site:sonyentertainmentnetwork.com OR site:playstation.com
    'PS4|PS Store|PSN|Play(?: )?Station(?:(?: )?Store)?'
);
  
var titles = $('p.title');
titles.each(function(idx, item)
{
    var $title = $(item).find("a");
    var title = $title.html();
    var $flair = $(item).find("span.linkflairlabel");
    var flair = $flair.html();
        if(title[0] != '[')
            return;
    $title.css("color", "#888");
        if($flair.length > 0 && flair == "Expired")
            return;
        for(var i = 0; i < aGameStores.length; i++)
        { 
            var re = new RegExp("^\\[(?:" + aGameStores[i] + ")\\]", "i");
                if(re.test(title))
                {
                    var re = new RegExp("(?:\\(Free|100\\%)", "i");
                        if(re.test(title))
                        {
                            $title.css("color", "#0c0");
                            continue;
                        }
                    $title.css("color", "#cc0");
                    continue;
                }
        }
});