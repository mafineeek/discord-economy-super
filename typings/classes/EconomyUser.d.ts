import EconomyConfiguration from '../interfaces/EconomyConfiguration'

import DatabaseManager from '../managers/DatabaseManager'
import UtilsManager from '../managers/UtilsManager'
import ShopManager from '../managers/ShopManager'

import Balance from './user/Balance'
import Bank from './user/Bank'

import Inventory from './user/Inventory'
import History from './user/History'
import Items from '../classes/user/Items'

import Cooldowns from './user/Cooldowns'
import Rewards from './user/Rewards'

import RawEconomyUser from '../interfaces/RawEconomyUser'


declare class EconomyUser {

    /**
     * Economy user class.
     * @param {string} id User ID.
     * @param {string} guildID Guild ID.
     * @param {EconomyConfiguration} ecoOptions Economy configuration.
     * @param {RawEconomyUser} userObject Economy user object.
     */
    public constructor(
        id: string,
        guildID: string,
        ecoOptions: EconomyConfiguration,
        userObject: RawEconomyUser
    )


    /**
    * User ID.
    * @type {string}
    */
    public id: string

    /**
     * Guild ID.
     * @type {string}
     */
    public guildID: string

    /**
    * Determine if the guild exists in the database.
    * @type {boolean}
    */
    public exists: boolean

    /**
     * User's balance.
     * @type {number}
     */
    public money: number

    /**
     * Full path to a JSON file. Default: './storage.json'
     * @type {string}
     * @private
     */
    private storagePath: string

    /**
     * Database Manager.
     * @type {DatabaseManager}
     * @private
     */
    private database: DatabaseManager

    /**
     * Utils Manager.
     * @type {UtilsManager}
     * @private
     */
    private _utils: UtilsManager

    /**
     * Shop Manager.
     * @type {ShopManager}
     * @private
     */
    private _shop: ShopManager

    /**
     * User's cooldowns info.
     * @type {Cooldowns}
     */
    public cooldowns: Cooldowns

    /**
     * User items manager.
     */
    public items: Items

    /**
     * User's history info.
     * @type {History}
     */
    public history: History

    /**
     * User's inventory info.
     * @type {Inventory}
     */
    public inventory: Inventory

    /**
     * User's balance info.
     * @type {Balance}
     */
    public balance: Balance

    /**
     * User's bank balance info.
     * @type {Bank}
     */
    public bank: Bank

    /**
     * User's bank balance info.
     * @type {Rewards}
     */
    public rewards: Rewards

    /**
     * Deletes the user from database.
     * @returns {EconomyUser} Deleted user object.
     */
    public delete(): EconomyUser

    /**
     * Sets the default user object for the specified member.
     * @returns {boolean} If reset successfully: true; else: false.
     */
    public reset(): boolean

	/**
	 * Creates an economy user object in database.
	 * @returns {boolean} If created successfully: true, else: false.
	 */
	public create(): boolean
}

export = EconomyUser
