const BaseManager = require('../../managers/BaseManager')
const ShopManager = require('../../managers/ShopManager')

const ShopItem = require('../ShopItem')

/**
 * Guild shop class.
 * @extends {BaseManager}
 */
class Shop extends BaseManager {

    /**
     * Guild shop constructor.
     * @param {string} guildID Guild ID.
     * @param {EconomyConfiguration} options Economy configuration.
     * @param {object} database Database object.
     * @param {CacheManager} cache Cache Manager.
     */
    constructor(guildID, options, database, cache) {
        super(options, null, guildID, ShopItem, database, cache)

        /**
         * Guild ID.
         * @type {string}
         * @private
         */
        this.guildID = guildID

        /**
         * Database Manager.
         * @type {ShopManager}
         * @private
         */
        this.database = database

        /**
         * Shop manager.
         * @type {ShopManager}
         * @private
         */
        this._shop = new ShopManager(options, database, cache)
    }

    /**
    * Gets the item in the shop.
    * @param {string | number} itemID Item ID.
    * @returns {Promise<ShopItem>} Shop item.
    */
    findItem(itemID) {
        return this._shop.findItem(itemID, this.guildID)
    }

    /**
     * Creates an item in shop.
     * @param {AddItemOptions} options Configuration with item info.
     * @returns {Promise<ItemData>} Item info.
     */
    addItem(options = {}) {
        return this._shop.addItem(this.guildID, options)
    }

    /**
     * Creates an item in shop.
     * 
     * This method is an alias for the `Shop.addItem()` method.
     * @param {AddItemOptions} options Configuration with item info.
     * @returns {Promise<ItemData>} Item info.
     */
    add(options = {}) {
        return this.addItem(options)
    }

    /**
     * Edits the item in the shop.
     * @param {number | string} itemID Item ID or name.
     * @param {'description' | 'price' | 'name' | 'message' | 'maxAmount' | 'role'} itemProperty 
     * This argument means what thing in item you want to edit (item property). 
     * Available item properties are 'description', 'price', 'name', 'message', 'amount', 'role', 'custom'.
     * 
     * @param {any} value Any value to set.
     * @returns {Promise<boolean>} If edited successfully: true, else: false.
     */
    editItem(itemID, itemProperty, value) {
        return this._shop.editItem(itemID, this.guildID, itemProperty, value)
    }

    /**
     * Edits the item in the shop.
     * 
     * This method is an alias for the `Shop.editItem()` method.
     * @param {number | string} itemID Item ID or name.
     * @param {'description' | 'price' | 'name' | 'message' | 'maxAmount' | 'role'} itemProperty 
     * This argument means what thing in item you want to edit (item property). 
     * Available item properties are 'description', 'price', 'name', 'message', 'amount', 'role', 'custom'.
     * @param {any} value Any value to set.
     * 
     * @returns {Promise<boolean>} If edited successfully: true, else: false.
     */
    edit(itemID, itemProperty, value) {
        return this.editItem(itemID, itemProperty, value)
    }

    /**
     * Sets a custom object for the item.
     * @param {string | number} itemID Item ID or name.
     * @param {object} customObject Custom item data object.
     * @returns {Promise<boolean>} If set successfully: true, else: false.
     */
    setCustom(itemID, customObject) {
        return this._shop.setCustom(itemID, this.guildID, customObject)
    }

    /**
     * Clears the shop.
     * @returns {Promise<boolean>} If cleared: true, else: false.
     */
    clear() {
        return this._shop.clear(this.guildID)
    }

    /**
     * Gets all items in the shop.
     * @returns {Promise<ShopItem[]>} Guild shop array.
     */
    async all() {
        const shop = (await this.database.fetch(`${this.guildID}.shop`)) || []
        return shop.map(item => new ShopItem(this.guildID, item, this.database, this.cache))
    }

    /**
     * Gets all items in the shop.
     * 
     * This method is an alias for the `Shop.findItem()` method.
     * @param {string | number} itemID Item ID.
     * @returns {Promise<ShopItem>} Shop item.
     */
    get(itemID) {
        return this.findItem(itemID)
    }
}

/**
 * Guild shop class.
 * @type {Shop}
 */
module.exports = Shop


/**
 * Item data object.
 * @typedef {object} ItemData
 * @property {number} id Item ID.
 * @property {string} name Item name.
 * @property {number} price Item price.
 * @property {string} message The message that will be returned on item use.
 * @property {string} description Item description.
 * @property {string} role ID of Discord Role that will be given to Wuser on item use.
 * @property {number} maxAmount Max amount of the item that user can hold in their inventory.
 * @property {string} date Date when the item was added in the shop.
 * @property {object} custom Custom item properties object.
 */

/**
 * @typedef {object} AddItemOptions Configuration with item info for 'Economy.shop.addItem' method.
 * @property {string} name Item name.
 * @property {string | number} price Item price.
 * @property {string} [message='You have used this item!'] Item message that will be returned on use.
 * @property {string} [description='Very mysterious item.'] Item description.
 * @property {string | number} [maxAmount=null] Max amount of the item that user can hold in their inventory.
 * @property {string} [role=null] Role ID from your Discord server.
 * @property {object} [custom] Custom item properties object.
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
