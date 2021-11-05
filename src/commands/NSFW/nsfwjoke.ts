import MessageHandler from '../../Handlers/MessageHandler'
import BaseCommand from '../../lib/BaseCommand'
import WAClient from '../../lib/WAClient'
import { ISimplifiedMessage } from '../../typings'
import axios from 'axios'

export default class Command extends BaseCommand {
    constructor(client: WAClient, handler: MessageHandler) {
        super(client, handler, {
            command: 'nsfwjoke',
            description: 'Will send you random nsfw joke.',
            aliases: ['njoke'],
            category: 'nsfw',
            usage: `${client.config.prefix}nsfwjoke`
        })
    }

    run = async (M: ISimplifiedMessage): Promise<void> => {
        cosnt res = await axios.get(`https://v2.jokeapi.dev/joke/Any?blacklistFlags=nsfw&type=twopart`)
                // console.log(response);
         if ( !(await this.client.getGroupData(M.from)).nsfw)
            return void M.reply(
                `Cannot Display NSFW content before enabling. Use ${this.client.config.prefix}activate nsfw to activate nsfw`
            )
                const text = `🎀 *Catagory* : ${res.data.category}\n📛 *Joke* : ${res.data.setup}\n🎗 *Delivery* : ${res.data.delivery}`
                M.reply(text)
            })
            .catch((err) => {
                M.reply(`✖ An error occurred: ${err}`)
            })
    }
}
