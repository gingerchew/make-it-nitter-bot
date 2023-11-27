import { Client, Intents, Message } from 'https://deno.land/x/harmony/mod.ts';

const client = new Client();

const twitterRegex = /http(?:s)?:\/\/(?:www\.)?(twitter|x)\.com\/([a-zA-Z0-9_]+)\/status\/([a-zA-Z0-9_]+)/gim

const convertToNitter = (str: string) => {
    if (str.indexOf('twitter.com') > -1) {
        str = str.split('twitter.com');
    } else {
        str.split('x.com');
    }
    return str.join('nitter.net');
}

const isATwitterLink = (str: String) => {
    const matches = str.matchAll(twitterRegex);

    const matchingURLs = [...matches].map(([ fullMatch ]) => fullMatch);

    const nitterURLs = [...matchingURLs].map(match => convertToNitter(match));

    return nitterURLS;
}


client.on('messageCreate', async (message:Message) => {

    const {
        member, content
    } = message

    if (member.user.username === 'make-it-nitter') return;
    
    /** 
     * Even though multiple instances shouldn't be possible 
     * it could still happen
     * type in the command `!DESTROY_ALL_INSTANCES_AGGRESSIVELY`
     * to do a _hard_ reset
     */
    if (content === '!!DESTROY_ALL_INSTANCES_AGGRESSIVELY!!') {
        message.reply('Message Received. Destroying all instances.');
        return client.destroy();
    }
    const nitterURLs = isATwitterLink(content);
    

    if (nitterURLs.length > 0) {
        message.reply(`Here's the Nitter version of those links: ${nitterURLs.join(', ')}`);
    }
})

client.connect(Deno.env.get('DISCORD_TOKEN'), Intents.All);
