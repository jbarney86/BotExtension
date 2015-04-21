
var scripts = [
    "https://rawgit.com/jbarney86/BotExtension/master/commands.js",
    "https://rawgit.com/jbarney86/BotExtension/master/cron.js",
    "https://rawgit.com/jbarney86/BotExtension/master/lottery.js",
    "https://rawgit.com/jbarney86/BotExtension/master/blackjack.js",
    "https://rawgit.com/jbarney86/BotExtension/master/afkcheck.js",
    "https://rawgit.com/jbarney86/BotExtension/master/handlers.js",
    "https://rawgit.com/jbarney86/BotExtension/master/bot.js"];


function updateBot() {
    setTimeout(function(){$.getScript("https://rawgit.com/jbarney86/BotExtension/master/loader.js");}, 2000);
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
