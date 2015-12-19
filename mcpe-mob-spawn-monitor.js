//Is the script active?
var spawnsActive = false;

//A variable to store the mcpe activity
var ctx = com.mojang.minecraftpe.MainActivity.currentMainActivity.get();

// Are we showing chunk coords
var showingSpawns = false;

var updateLabel = false;

function procCmd(cmd) {
    var params = cmd.toLowerCase().split(" ");
    ctx.runOnUiThread(
        new java.lang.Runnable(
        { 
            run: function() {
                main(params);
            }
        })
    );
}

function main(p) {
    switch(p[0]) {
        case "help":
        case "?":
            switch(p[1]) {
                case "spawn":
                case "spawns":
                    showHelp("spawns", "Shows spawns", "", "");
                    break;
                case "help":
                case "?":
                    showHelp("help", "Shows help", "", "");
                    break;
            }
            break;
        case "spawn":
        case "spawns":
            if(showingSpawns) {
                dismissChunks();
                clientMessage("Showing spawns is inactive!");
                showingSpawns = false;
                
            }
            else {
                clientMessage("Showing spawns is active!");
                showingSpawns = true;
            }
            break;
    }
}

function modTick() {
    if(spawnsActive === false) {

        clientMessage("Activating spawns!");

        // Any startup needed?
        spawnsActive = true;
    }
}


function entityAddedHook(entity)
{
    describe(entity, "added")
}

function describe(entity, verb)
{
    //clientMessage("entityAdded");
    
    if (!spawnsActive) 
    { return; }

    var name = getName(entity)

    if (name == "")
    {
         return;
    }

    var entityX = parseInt(Entity.getX(entity));
    var entityY = parseInt(Entity.getY(entity));
    var entityZ = parseInt(Entity.getZ(entity));

    var playerX = parseInt(Player.getX());
    var playerY = parseInt(Player.getY());
    var playerZ = parseInt(Player.getZ());

    var dX = Math.abs(playerX - entityX);
    var dY = Math.abs(playerY - entityY);
    var dZ = Math.abs(playerZ - entityZ);

    var xY  = Math.sqrt((dX * dX) + (dY * dY));
    var xYZ = parseInt(Math.sqrt((xY * xY) + (dZ * dZ)));

    clientMessage(name + " " + verb + " " + 
        //entityX + ", " + 
        //entityY + ", " + 
        //entityZ +
        "[" + 
        dX + ", " + 
        dY + ", " + 
        dZ + "]" +
        " (" + xYZ + ")" 
    );
}

function entityRemovedHook(entity)
{
    describe(entity, "removed")  
}

function getName(entity) {
    switch (Entity.getEntityTypeId(entity)) {
    case EntityType.CAVE_SPIDER:
        return "cv spidr";
    case EntityType.CREEPER:
        return "creeper";
    case EntityType.GHAST:
        return "ghast";
    case EntityType.PIG_ZOMBIE:
        return "pig zom";
    case EntityType.SILVERFISH:
        return "slvrfish";
    case EntityType.SKELETON:
        return "skeleton";
    case EntityType.SLIME:
        return "slime";
    case EntityType.SPIDER:
        return "spider";
    case EntityType.ZOMBIE:
        return "zombie";
    case EntityType.ZOMBIE_VILLAGER:
        return "zomvill";
    default:
        return "";
    }
}
