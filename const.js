function Rabbit(type) {
    this.type = type;
}

var killerRabbit = new Rabbit("killer");
var blackRabbit = new Rabbit("black");
console.log(blackRabbit.type);

Rabbit.prototype.speak = function(line) {
    console.log("The " + this.type + " rabbit says '" + line + "'");
};

blackRabbit.speak("Doom...");

Rabbit.prototype.teeth = "small";
console.log(killerRabbit.teeth);

killerRabbit.teeth = "sharp and long";

console.log(killerRabbit.teeth);

var map = Object.create(null);

function storePhi(event, phi) {
    map[event] = phi;
}

storePhi("pizza", 0.0069);
storePhi("touched tree", -0.081);
Object.prototype.nonsense = "hi";

for (var name in map) {
    console.log(" -> ", name);
}

