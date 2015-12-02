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


function entityAdded(entity)
{
    if (!spawnsActive) 
    { return; }

    var name = getName(entity)

//    if (name == "")
//    {
//         return;
//    }

    clientMessage(name + " spawned at " + Entity.getX(entity) + ", " + Entity.getX(entity) + ", " + Entity.getZ(entity));
}

function getName(entity) {
    switch (Entity.getEntityTypeId(entity)) {
    case EntityType.CAVE_SPIDER:
        return "cave spider";
    case EntityType.CREEPER:
        return "creeper";
    case EntityType.GHAST:
        return "ghast";
    case EntityType.PIG_ZOMBIE:
        return "pig zombie";
    case EntityType.SILVERFISH:
        return "silverfish";
    case EntityType.SKELETON:
        return "skeleton";
    case EntityType.SLIME:
        return "slime";
    case EntityType.SPIDER:
        return "spider";
    case EntityType.ZOMBIE:
        return "zombie";
    case EntityType.ZOMBIE_VILLAGER:
        return "zombie villager";
    default:
        return "";
    }
}
