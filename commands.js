function getAvailable(author) {
    var avail = [];

    for(var i = 0; i < commands.length; i++) {
        if(commands[i].hasPermission(author) && commands[i].listed) {
            avail.push(commands[i]);
        }
    }

    return avail;
}


function execCommand(author, args) {
    for(var i = 0; i < commands.length; i++) {
        for(var j = 0; j < commands[i].cmd.length; j++) {
            if(commands[i].cmd[j] == args[0].toLowerCase()) {
                commands[i].exec(author, args);
                return true;
            }
        }
    }

    console.log(author + " has entered an invalid command.");
    return false;
}


function Command(cmd, callback, permission, customPerm, listed) {
    this.cmd = cmd.split(",");
    this.callback = callback;
    this.permission = (typeof permission === "undefined") ? 0 : permission;
//    this.listed = typeof listed === "undefined" ? true : listed;

    this.exec = function(author, args) {
        if(this.hasPermission(author)) {
            this.callback(author, args);

            return true;
        } else {
            log("No permission", log.info);

            return false;
        }
    };

    this.hasPermission = function(author){
        return getPermLevel(author) >= this.permission ||
            (typeof customPerm !== "undefined" ? customPerm(author) : false);
    };

    this.listed = (typeof listed === "undefined") ? true : listed;// bool, false = doesn't list in !help

    this.toString = function(){
        return this.cmd.toString();
    };
}


// **********
// ***
// List help commands first, then admin-only commands, then important or interactive commands, then fun commands, in case the msg is too long and gets cut off
// ***
// **********

var commands = [
  
    new Command("rollthedice", function(author, args) {
        if(args.length == 1) {
            rollTheDice(author);
        } else if(args[1] == "on") {
            RollTheDiceEnabled = true;
            log(author + " has enabled !rollthedice", log.visible);
        }else if(args[1] == "off") {
            RollTheDiceEnabled = false;
            log(author + " has disabled !rollthedice", log.visible);
        }
    }),


    new Command("lottery", function(author, args) {
        lottery(author, args);
    }),

    
    new Command("blackjack", function(author, args) {// There's a var top of bot.js to turn it off
        blackJack(author, args);
    }),


    new Command("hit,hitme,stand,hold", function(author, args) {
        blackJack(author, args);
    }, null, null, false),// keep hidden, they will be revealed when a user stars a game of !blackjack


    new Command("dance,woot,rawr", function(author, args) {// make the bot dance
        if (wooted) {
            log("[!" + args[0] + "] I can't dance any harder!", log.visible);
            return false;
        } else if(args[0] == "rawr") {
            if (author.getId(author) != 3717069) {
                log("[!rawr] Careful @" + author + ", you might get mauled using that...", log.visible);
                return false;
            }
        }

        wooted = true;
        $('#woot').click();
        log("[!" + args[0] + "] " + woots[Math.round(Math.random() * (woots.length - 1))], log.visible);
    }),


    new Command("smoke", function() {
        log("SMOKE WEED ERRYDAY", log.visible);
    }, null, null, false),

    new Command("real", function() {
        log("REAL TRAP SHIT!", log.visible);
    }, null, null, false),

    new Command("turndown", function() {
        log("TURN DOWN FOR WHAT?", log.visible);
    }, null, null, false),
    
    new Command("dank", function() {
    log("Ayyy Lmao :alien:", log.visible);
    }, null, null, false),

    new Command("damn", function() {
        log("DAMN SON, WHERE'D YOU FIND THIS??", log.visible);
    }, null, null, false),

    new Command("hot107", function() {
        log("Hey guys, help Invincibear win a $10 000 grant! http://invincibear.com/hot107_hot_factor/", log.visible);
    }, null, null, false)
];
