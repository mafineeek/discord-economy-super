import RewardObject from '../interfaces/RewardObject'
import EconomyConfiguration from '../interfaces/EconomyConfiguration'

import { RewardType } from '../interfaces/RewardTypes'


/**
 * Reward manager methods class.
 */
declare class RewardManager {
    public constructor(options: EconomyConfiguration)

    /**
    * Adds a specified reward on user's balance.
    * @param reward Reward to give.
    * @param memberID Member ID.
    * @param guildID Guild ID.
    * @param reason The reason why the money was added.
    * @returns Reward object.
    */
    public receive<
        isRewardArray extends boolean = false
    >(reward: RewardType, memberID: string, guildID: string, reason?: string): RewardObject<isRewardArray, typeof reward>

    /**
    * Adds a daily reward on user's balance
    * @param {string} memberID Member ID
    * @param {string} guildID Guild ID
    * @param {string} [reason] The reason why the money was added. Default: 'claimed the daily reward'
    * @returns Daily money amount or time before next claim
    */
    public getDaily<
        isRewardArray extends boolean = false
    >(memberID: string, guildID: string, reason?: string): RewardObject<isRewardArray, RewardType.DAILY>

    /**
    * Adds a work reward on user's balance
    * @param {string} memberID Member ID
    * @param {string} guildID Guild ID
    * @param {string} [reason] The reason why the money was added. Default: 'claimed the work reward'
    * @returns Work money amount or time before next claim
    */
    public getWork<
        isRewardArray extends boolean = true
    >(memberID: string, guildID: string, reason?: string): RewardObject<isRewardArray, RewardType.WORK>

    /**
    * Adds a weekly reward on user's balance
    * @param {string} memberID Member ID
    * @param {string} guildID Guild ID
    * @param {string} [reason] The reason why the money was added. Default: 'claimed the weekly reward'
    * @returns Weekly money amount or time before next claim
    */
    public getWeekly<
        isRewardArray extends boolean = false
    >(memberID: string, guildID: string, reason?: string): RewardObject<isRewardArray, RewardType.WEEKLY>
}

export = RewardManager