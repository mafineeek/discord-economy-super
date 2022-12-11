import EconomyConfiguration from '../interfaces/EconomyConfiguration'

/**
* Cooldown manager methods class.
*/
declare class CooldownManager {
   public constructor(options: EconomyConfiguration)

   /**
   * Clears user's daily cooldown
   * @param {string} memberID Member ID
   * @param {string} guildID Guild ID
   * @returns {boolean} If cleared: true; else: false
   */
   public clearDaily(memberID: string, guildID: string): boolean

   /**
   * Clears user's work cooldown
   * @param {string} memberID Member ID
   * @param {string} guildID Guild ID
   * @returns {boolean} If cleared: true; else: false
   */
   public clearWork(memberID: string, guildID: string): boolean

   /**
   * Clears user's weekly cooldown
   * @param {string} memberID Member ID
   * @param {string} guildID Guild ID
   * @returns {boolean} If cleared: true; else: false
   */
   public clearWeekly(memberID: string, guildID: string): boolean

   /**
   * Gets user's daily cooldown
   * @param {string} memberID Member ID
   * @param {string} guildID Guild ID
   * @returns Cooldown end timestamp
   */
   public getDaily(memberID: string, guildID: string): number

   /**
   * Gets user's work cooldown
   * @param {string} memberID Member ID
   * @param {string} guildID Guild ID
   * @returns Cooldown end timestamp
   */
   public getWork(memberID: string, guildID: string): number

   /**
   * Gets user's weekly cooldown
   * @param {string} memberID Member ID
   * @param {string} guildID Guild ID
   * @returns Cooldown end timestamp
   */
   public getWeekly(memberID: string, guildID: string): number
}

export = CooldownManager