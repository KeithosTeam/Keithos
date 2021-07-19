const Command = require('../Command.js');
const { MessageEmbed } = require('discord.js');

//can replace MyCommandName with your command name 
module.exports = class MyCommandName extends Command {
    constructor(client) {
        super(client, {
            name: 'annoy', //command name
            usage: 'annoy 10 go to sleep carl', //usage for the command, example: ping (prepends prefix in the help command btw)
            description: 'spams the message the ammount of times specified', //description for it
            type: client.types.FUN, //can be any available types, look in this.types in client.js file
            userPermissions: ['ADMINISTRATOR']
        });
    }
    async run(message, args) {

const x = args[0]   

if (x > 20){

    const embed = new MessageEmbed()
            .setTitle('A real number to annoy people is required ')
            .setDescription('The max is 20')
            .setColor(message.guild.me.displayHexColor) //embec color
            .setFooter(message.member.displayName, message.author.displayAvatarURL({dynamic: true})) //execution time + user
            .setTimestamp()
            message.channel.send(embed);

} else {
        if (!isNaN(x)) {
            let times = args[0]

            const sliced = args.slice(1)

        ;                  //  set your counter to 1

            function myLoop() {         //  create a loop function
            setTimeout(function() {   //  call a 3s setTimeout when the loop is called
                message.channel.send(sliced.join(' '))  //  your code here
                times--;                    //  increment the counter
                if (times > 1) {           //  if the counter < 10, call the loop function
                myLoop();             //  ..  again which will trigger another 
                }                       //  ..  setTimeout()
            }, 5000)
            }

            myLoop();
        } else {

            const embed1 = new MessageEmbed()
            .setTitle('A real number to annoy people is required ')
            .setDescription('The max is 20')
            .setColor(message.guild.me.displayHexColor) //embec color
            .setFooter(message.member.displayName, message.author.displayAvatarURL({dynamic: true})) //execution time + user
            .setTimestamp()
            message.channel.send(embed1);
        }
    }

        // your code that will execute
    }
}

