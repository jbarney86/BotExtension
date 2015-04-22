
var scripts = [
    "https://rawgit.com/jbarney86/BotExtension/master/src/commands.js",
    "https://rawgit.com/jbarney86/BotExtension/master/src/cron.js",
    "https://rawgit.com/jbarney86/BotExtension/master/src/lottery.js",
    "https://rawgit.com/jbarney86/BotExtension/master/src/blackjack.js",
    "https://rawgit.com/jbarney86/BotExtension/master/src/afkcheck.js",
    "https://rawgit.com/jbarney86/BotExtension/master/src/handlers.js",
    "https://rawgit.com/jbarney86/BotExtension/master/src/bot.js"];


function updateBot() {
    setTimeout(function(){$.getScript("https://rawgit.com/jbarney86/BotExtension/master/src/loaders.js");}, 2000);
}


function load(script)
{
    if(typeof script === "undefined")
        script = 0;
    $.getScript(scripts[script++], function(){
        if(script < scripts.length)
        {
            load(script);
        }
    });
}

load();
