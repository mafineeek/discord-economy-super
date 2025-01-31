const DatabaseManager = require('./DatabaseManager')

const EconomyError = require('../classes/util/EconomyError')
const errors = require('../structures/errors')

const settingsArray = [
    'dailyAmount',
    'dailyCooldown',

    'workAmount',
    'workCooldown',

    'weeklyAmount',
    'weeklyCooldown',

    'dateLocale',
    'subtractOnBuy',

    'sellingItemPercent',
    'savePurchasesHistory'
]

function checkValueType(key, value) {
    switch (key) {
        case 'dailyAmount':
            if (
                (Array.isArray(value) && typeof value[0] !== 'number' && typeof value[1] !== 'number')
                || !Array.isArray(value) && typeof value !== 'number'
            ) {
                throw new EconomyError(errors.invalidType(key, 'number', typeof value), 'INVALID_TYPE')
            }

            break

        case 'dailyCooldown':
            if (typeof value !== 'number') {
                throw new EconomyError(errors.invalidType(key, 'number', typeof value), 'INVALID_TYPE')
            }

            break


        case 'workAmount':
            if (
                (Array.isArray(value) && typeof value[0] !== 'number' && typeof value[1] !== 'number')
                || !Array.isArray(value) && typeof value !== 'number'
            ) {
                throw new EconomyError(errors.invalidType(key, 'number', typeof value), 'INVALID_TYPE')
            }

            break

        case 'workCooldown':
            if (typeof value !== 'number') {
                throw new EconomyError(errors.invalidType(key, 'number', typeof value), 'INVALID_TYPE')
            }

            break


        case 'weeklyAmount':
            if (
                (Array.isArray(value) && typeof value[0] !== 'number' && typeof value[1] !== 'number')
                || !Array.isArray(value) && typeof value !== 'number'
            ) {
                throw new EconomyError(errors.invalidType(key, 'number', typeof value), 'INVALID_TYPE')
            }

            break

        case 'weeklyCooldown':
            if (typeof value !== 'number') {
                throw new EconomyError(errors.invalidType(key, 'number', typeof value), 'INVALID_TYPE')
            }

            break


        case 'dateLocale':
            if (typeof value !== 'string') {
                throw new EconomyError(errors.invalidType(key, 'string', typeof value), 'INVALID_TYPE')
            }

            break

        case 'subtractOnBuy':
            if (typeof value !== 'boolean') {
                throw new EconomyError(errors.invalidType(key, 'boolean', typeof value), 'INVALID_TYPE')
            }

            break

        case 'sellingItemPercent':
            if (typeof value !== 'number') {
                throw new EconomyError(errors.invalidType(key, 'number', typeof value), 'INVALID_TYPE')
            }

            break

        case 'savePurchasesHistory':
            if (typeof value !== 'boolean') {
                throw new EconomyError(errors.invalidType(key, 'boolean', typeof value), 'INVALID_TYPE')
            }

            break
    }

    return true
}


/**
 * Settings manager class.
 */
class SettingsManager {

    /**
     * Settings Manager.
     * @param {EconomyConfiguration} options Economy configuration.
     */
    constructor(options, database) {


        /**
        * Economy configuration.
        * @type {EconomyConfiguration}
        * @private
        */
        this.options = options


        /**
        * Database manager methods class.
        * @type {DatabaseManager}
        * @private
        */
        this.database = database
    }

    /**
     * Gets the specified setting from the database.
     * 
     * Note: If the server don't have any setting specified,
     * the module will take the values from the
     * configuration or default configuration.
     * 
     * @param {Settings} key The setting to fetch.
     * @param {string} guildID Guild ID.
     * @returns {any} The setting from the database.
     */
    get(key, guildID) {
        if (typeof guildID !== 'string') {
            throw new EconomyError(errors.invalidTypes.guildID + typeof guildID, 'INVALID_TYPE')
        }

        if (!settingsArray.includes(key)) {
            throw new EconomyError(errors.settingsManager.invalidKey + key, 'INVALID_TYPE')
        }

        const data = this.all(guildID)

        const dbValue = data[key]
        return dbValue
    }

    /**
     * Changes the specified setting.
     * 
     * Note: If the server don't have any setting specified, 
     * the module will take the values from the 
     * specified configuration or default configuration.
     * 
     * @param {Settings} key The setting to change.
     * @param {any} value The value to set.
     * @param {string} guildID Guild ID.
     * @returns {SettingsTypes} The server settings object.
     */
    set(key, value, guildID) {
        if (value == undefined) {
            throw new EconomyError(errors.invalidTypes.value + typeof value, 'INVALID_TYPE')
        }

        if (typeof key !== 'string') {
            throw new EconomyError(errors.databaseManager.invalidTypes.key + typeof key, 'INVALID_TYPE')
        }

        if (typeof guildID !== 'string') {
            throw new EconomyError(errors.invalidTypes.guildID + typeof guildID, 'INVALID_TYPE')
        }

        if (!settingsArray.includes(key)) {
            throw new EconomyError(errors.settingsManager.invalidKey + key, 'INVALID_TYPE')
        }

        checkValueType(key, value)

        this.database.set(`${guildID}.settings.${key}`, value)
        return this.all(guildID)
    }

    /**
     * Deletes the specified setting.
     * 
     * Note: If the server don't have any setting specified, 
     * the module will take the values from the 
     * specified configuration or default configuration.
     * 
     * @param {Settings} key The setting to delete.
     * @param {string} guildID Guild ID.
     * @returns {SettingsTypes} The server settings object.
     */
    delete(key, guildID) {
        if (typeof key !== 'string') {
            throw new EconomyError(errors.databaseManager.invalidTypes.key + typeof key, 'INVALID_TYPE')
        }

        if (typeof guildID !== 'string') {
            throw new EconomyError(errors.invalidTypes.guildID + typeof guildID, 'INVALID_TYPE')
        }

        if (!settingsArray.includes(key)) {
            throw new EconomyError(errors.settingsManager.invalidKey + key, 'INVALID_TYPE')
        }

        this.database.delete(`${guildID}.settings.${key}`)
        return this.all(guildID)
    }

    /**
     * Deletes the specified setting.
     * 
     * Note: If the server don't have any setting specified, 
     * the module will take the values from the 
     * specified configuration or default configuration.
     * 
     * This method is an alias for `SettingsManager.delete()` method.
     * 
     * @param {Settings} key The setting to delete.
     * @param {string} guildID Guild ID.
     * @returns {SettingsTypes} The server settings object.
     */
    remove(key, guildID) {
        return this.delete(key, guildID)
    }

    /**
     * Fetches all the server's settings object.
     * @param {string} guildID Guild ID.
     * @returns {SettingsTypes} The server settings object.
     */
    all(guildID) {
        if (typeof guildID !== 'string') {
            throw new EconomyError(errors.invalidTypes.guildID + typeof guildID, 'INVALID_TYPE')
        }

        const settings = this.database.fetch(`${guildID}.settings`)

        return {
            dailyAmount: settings?.dailyAmount == null ? null : settings?.dailyAmount,
            dailyCooldown: settings?.dailyCooldown == null ? null : settings?.dailyCooldown,

            workAmount: settings?.workAmount == null ? null : settings?.workAmount,
            workCooldown: settings?.workCooldown == null ? null : settings?.workCooldown,

            weeklyAmount: settings?.weeklyAmount == null ? null : settings?.weeklyAmount,
            weeklyCooldown: settings?.weeklyCooldown == null ? null : settings?.weeklyCooldown,

            dateLocale: settings?.dateLocale == null ? null : settings?.dateLocale,
            subtractOnBuy: settings?.subtractOnBuy == null ? null : settings?.subtractOnBuy,

            sellingItemPercent: settings?.sellingItemPercent == null ? null : settings?.sellingItemPercent,
            savePurchasesHistory: settings?.savePurchasesHistory == null ? null : settings?.savePurchasesHistory,
        }
    }

    /**
     * Resets all the settings to setting that are in configuration.
     * @param {string} guildID Guild ID.
     * @returns {SettingsTypes} The server settings object.
     */
    reset(guildID) {
        if (typeof guildID !== 'string') {
            throw new EconomyError(errors.invalidTypes.guildID + typeof guildID, 'INVALID_TYPE')
        }

        const defaultSettings = {
            dailyAmount: this.options.dailyAmount,
            dailyCooldown: this.options.dailyCooldown,

            workAmount: this.options.workAmount,
            workCooldown: this.options.workCooldown,

            weeklyAmount: this.options.weeklyAmount,
            weeklyCooldown: this.options.weeklyCooldown,

            dateLocale: this.options.dateLocale,
            subtractOnBuy: this.options.subtractOnBuy,

            sellingItemPercent: this.options.sellingItemPercent,
            savePurchasesHistory: this.options.savePurchasesHistory
        }

        this.database.set(`${guildID}.settings`, defaultSettings)
        return defaultSettings
    }
}

/**
 * @typedef {object} SettingsTypes Settings object.
 * @property {number | number[]} dailyAmount Amount of money for Daily Command. Default: 100.
 * @property {number} dailyCooldown Cooldown for Daily Command (in ms). Default: 24 hours (60000 * 60 * 24 ms)
 * 
 * @property {number | number[]} workAmount Amount of money for Work Command. Default: [10, 50].
 * @property {number} workCooldown Cooldown for Work Command (in ms). Default: 1 hour (60000 * 60 ms)
 * 
 * @property {number | number[]} weeklyAmount Amount of money for Weekly Command. Default: 1000.
 * @property {number} weeklyCooldown Cooldown for Weekly Command (in ms). Default: 7 days (60000 * 60 * 24 * 7 ms)
 * 
 * @property {string} dateLocale The region (example: 'ru' or 'en') to format the date and time. Default: 'en'
 * @property {boolean} subtractOnBuy 
 * If true, when someone buys the item, their balance will subtract by item price. Default: false.
 * 
 * @property {number} sellingItemPercent Percent of the item's price it will be sold for. Default: 75.
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
 * @property {boolean} [deprecationWarnings=true] 
 * If true, the deprecation warnings will be sent in the console. Default: true.
 * 
 * @property {boolean} [savePurchasesHistory=true] If true, the module will save all the purchases history.
 *
 * @property {number} [sellingItemPercent=75] 
 * Percent of the item's price it will be sold for. Default: 75.
 * 
 * @property {number | number[]} [weeklyAmount=100] Amount of money for Weekly Command. Default: 1000.
 * @property {number | number[]} [workAmount=[10, 50]] Amount of money for Work Command. Default: [10, 50].
 * @property {boolean} [subtractOnBuy=true] 
 * If true, when someone buys the item, their balance will subtract by item price. Default: false
 * 
 * @property {number} [updateCountdown=1000] Checks for if storage file exists in specified time (in ms). Default: 1000.
 * @property {string} [dateLocale='en'] The region (example: 'ru' or 'en') to format the date and time. Default: 'en'.
 * @property {UpdaterOptions} [updater=UpdaterOptions] Update checker configuration.
 * @property {ErrorHandlerConfiguration} [errorHandler=ErrorHandlerConfiguration] Error handler configuration.

 * @property {CheckerConfiguration} [optionsChecker=CheckerConfiguration] 
 * Configuration for an 'Economy.utils.checkOptions' method.
 * @property {boolean} [debug=false] Enables or disables the debug mode.
 */

/**
 * @typedef {object} UpdaterOptions Update checker configuration.
 * @property {boolean} [checkUpdates=true] Sends the update state message in console on start. Default: true.
 * 
 * @property {boolean} [upToDateMessage=true] 
 * Sends the message in console on start if module is up to date. Default: true.
 */

/**
 * @typedef {object} ErrorHandlerConfiguration
 * @property {boolean} [handleErrors=true] Handles all errors on startup. Default: true.
 * @property {number} [attempts=5] Amount of attempts to load the module. Use 0 for infinity attempts. Default: 5.
 * @property {number} [time=3000] Time between every attempt to start the module (in ms). Default: 3000.
 */

/**
 * @typedef {object} CheckerConfiguration Configuration for an 'Economy.utils.checkOptions' method.
 * @property {boolean} [ignoreInvalidTypes=false] 
 * Allows the method to ignore the options with invalid types. Default: false.
 * 
 * @property {boolean} [ignoreUnspecifiedOptions=false] 
 * Allows the method to ignore the unspecified options. Default: false.
 * 
 * @property {boolean} [ignoreInvalidOptions=false] Allows the method to ignore the unexisting options. Default: false.
 * @property {boolean} [showProblems=false] Allows the method to show all the problems in the console. Default: false. 
 * 
 * @property {boolean} [sendLog=false] Allows the method to send the result in the console. 
 * Requires the 'showProblems' or 'sendLog' options to set. Default: false.
 * 
 * @property {boolean} [sendSuccessLog=false] 
 * Allows the method to send the result if no problems were found. Default: false.
 */

/**
 * @typedef {'dailyAmount' | 'dailyCooldown' | 
 * 'workAmount' | 'workCooldown' | 
 * 'weeklyAmount' | 'weeklyCooldown' | 
 * 'dateLocale' | 'subtractOnBuy' | 
 * 'sellingItemPercent' | 'savePurchasesHistory'} Settings
 */


/**
 * Settings Manager.
 * @type {SettingsManager}
 */
module.exports = SettingsManager
