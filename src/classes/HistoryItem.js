const EconomyError = require('../classes/util/EconomyError')
const errors = require('../../src/structures/errors')


/**
* History item class.
*/
class HistoryItem {

    /**
     * History item class.
     * @param {string} guildID Guild ID.
     * @param {string} memberID Member ID.
     * @param {EconomyConfiguration} ecoOptions Economy configuration.
     * @param {HistoryData} itemObject User purchases history item object.
     * @param {DatabaseManager} database Database Manager.
     */
    constructor(guildID, memberID, ecoOptions, itemObject, database) {

        /**
         * Guild ID.
         * @type {string}
         */
        this.guildID = guildID

        /**
         * Member ID.
         * @type {string}
         */
        this.memberID = memberID

        /**
         * Economy configuration.
         * @type {EconomyConfiguration}
         */
        this.options = ecoOptions

        /**
         * Item ID in history.
         * @type {number}
         */
        this.id = itemObject.id

        /**
         * Item name.
         * @type {string}
         */
        this.name = itemObject.name

        /**
         * Item price.
         * @type {number}
         */
        this.price = itemObject.price

        /**
         * The message that will be returned on item use.
         * @type {string}
         */
        this.message = itemObject.message

        /**
        * Date when the item was bought by a user.
        * @type {string}
        */
        this.date = itemObject.date

        /**
         * ID of Discord Role that will be given to Wuser on item use.
         * @type {string}
         */
        this.role = itemObject.role

        /**
         * Quantity of the item.
         * @type {number}
         */
        this.quantity = itemObject.quantity

        /**
         * Database Manager.
         * @type {DatabaseManager}
         * @private
         */
        this._database = database

        for (const [key, value] of Object.entries(itemObject || {})) {
            this[key] = value
        }
    }

    /**
     * Removes the item from the history.
     * 
     * This method is an alias for 'HistoryItem.remove()' method.
     * @returns {boolean} If removed: true, else: false.
     */
    delete() {
        return this.remove()
    }

    /**
     * Removes the item from the history.
     * @returns {boolean} If removed: true, else: false.
     */
    remove() {
        const id = this.id

        if (typeof id !== 'number' && typeof id !== 'string') {
            throw new EconomyError(errors.invalidTypes.id + typeof id, 'INVALID_TYPE')
        }

        if (typeof memberID !== 'string') {
            throw new EconomyError(errors.invalidTypes.memberID + typeof memberID, 'INVALID_TYPE')
        }

        if (typeof guildID !== 'string') {
            throw new EconomyError(errors.invalidTypes.guildID + typeof guildID, 'INVALID_TYPE')
        }

        const history = this.database

        const historyItem = history.find(
            historyItem =>
                historyItem.id == id &&
                historyItem.memberID == memberID &&
                historyItem.guildID == guildID
        )

        const historyItemIndex = history.findIndex(histItem => histItem.id == historyItem.id)

        if (!historyItem) return false
        history.splice(historyItemIndex, 1)

        return this.database.set(`${guildID}.${memberID}.history`, history)
    }
}



/**
 * History data object.
 * @typedef {object} HistoryData
 * @property {number} id Item ID in history.
 * @property {string} name Item name.
 * @property {number} price Item price.
 * @property {string} message The message that will be returned on item use.
 * @property {string} role ID of Discord Role that will be given to user on item use.
 * @property {string} date Date when the item was bought by a user.
 * @property {number} quantity Quantity of the item.
 * @property {string} memberID Member ID.
 * @property {string} guildID Guild ID.
 */

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
 * History item class.
 * @type {HistoryItem}
 */
module.exports = HistoryItem
