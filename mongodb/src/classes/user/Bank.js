const DatabaseManager = require('../../managers/DatabaseManager')
const BankManager = require('../../managers/BankManager')


/**
 * User bank balance class.
 */
class Bank {

    /**
     * User balance class.
     * @param {string} memberID Member ID.
     * @param {string} guildID Guild ID.
     * @param {EconomyConfiguration} ecoOptions Economy configuration.
     * @param {DatabaseManager} database Database manager.
     * @param {CacheManager} cache Cache Manager.
     */
    constructor(memberID, guildID, ecoOptions, database, cache) {

        /**
        * Member ID.
        * @type {string}
        */
        this.memberID = memberID

        /**
         * Guild ID.
         * @type {string}
         */
        this.guildID = guildID

        /**
         * Balance Manager.
         * @type {BankManager}
         * @private
         */
        this._bank = new BankManager(ecoOptions, database, cache)
    }

    /**
     * Sets the money amount on user's balance.
     * @param {number} amount Money amount
     * @param {string} [reason] The reason why you set the money.
     * @returns {Promise<number>} Money amount
     */
    set(amount, reason) {
        return this._bank.set(amount, this.memberID, this.guildID, reason)
    }

    /**
     * Adds the money amount on user's balance.
     * @param {number} amount Money amount.
     * @param {string} [reason] The reason why you add the money.
     * @returns {Promise<number>} Money amount.
     */
    add(amount, reason) {
        return this._bank.add(amount, this.memberID, this.guildID, reason)
    }

    /**
     * Subtracts the money amount on user's balance.
     * @param {number} amount Money amount.
     * @param {string} [reason] The reason why you subtract the money.
     * @returns {Promise<number>} Money amount.
     */
    subtract(amount, reason) {
        return this._bank.subtract(amount, this.memberID, this.guildID, reason)
    }

    /**
     * Fetches the user's balance.
     * @returns {Promise<number>} User's balance.
     */
    get() {
        return this._bank.get(this.memberID, this.guildID)
    }

    /**
     * Deposits the specified amount of money.
     * @param {number} amount Money amount.
     * @param {string} [reason] The reason of the operation.
     * @returns {Promise<number>} Money amount.
     */
    withdraw(amount, reason = null) {
        return this._bank.withdraw(amount, this.memberID, this.guildID, reason)
    }

    /**
     * Fetches the user's balance.
     * 
     * This method is an alias for 'Balance.get()' method
     * @returns {Promise<number>} User's balance.
     */
    fetch() {
        return this.get()
    }
}



/**
 * @typedef {object} EconomyConfiguration Default Economy configuration.
 * @property {string} [storagePath='./storage.json'] Full path to a JSON file. Default: './storage.json'
 * @property {boolean} [checkStorage=true] Checks the if database file exists and if it has errors. Default: true
 * @property {number} [dailyCooldown=86400000] 
 * Cooldown for Daily Command (in ms). Default: 24 hours (60000 * 60 * 24 ms)
 * 
 * @property {number} [workCooldown=3600000] Cooldown for Work Command (in ms). Default: 1 hour (60000 * 60 ms)
 * @property {number | number[]} [dailyAmount=100] Amount of money for Daily Command. Default: 100.
 * @property {number} [weeklyCooldown=604800000] 
 * Cooldown for Weekly Command (in ms). Default: 7 days (60000 * 60 * 24 * 7 ms)
 * 
 * @property {number | number[]} [weeklyAmount=100] Amount of money for Weekly Command. Default: 1000.
 * @property {number | number[]} [workAmount=[10, 50]] Amount of money for Work Command. Default: [10, 50].
 * @property {boolean} [subtractOnBuy=true] 
 * If true, when someone buys the item, their balance will subtract by item price. Default: false
 * 
 * @property {number} [sellingItemPercent=75] 
 * Percent of the item's price it will be sold for. Default: 75.
 * 
 * @property {boolean} [deprecationWarnings=true] 
 * If true, the deprecation warnings will be sent in the console. Default: true.
 * 
 * @property {boolean} [savePurchasesHistory=true] If true, the module will save all the purchases history.
 * 
 * @property {number} [updateCountdown=1000] Checks for if storage file exists in specified time (in ms). Default: 1000.
 * @property {string} [dateLocale='en'] The region (example: 'ru'; 'en') to format the date and time. Default: 'en'.
 * @property {UpdaterOptions} [updater=UpdaterOptions] Update checker configuration.
 * @property {ErrorHandlerConfiguration} [errorHandler=ErrorHandlerConfiguration] Error handler configuration.

 * @property {CheckerConfiguration} [optionsChecker=CheckerConfiguration] 
 * Configuration for an 'Economy.utils.checkOptions' method.
 * @property {boolean} [debug=false] Enables or disables the debug mode.
 */

/**
 * User bank balance class.
 * @type {Bank}
 */
module.exports = Bank
