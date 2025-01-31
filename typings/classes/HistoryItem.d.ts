import DatabaseManager from '../managers/DatabaseManager'

import EconomyConfiguration from '../interfaces/EconomyConfiguration'
import HistoryData from '../interfaces/HistoryData'

import CustomItemData from '../interfaces/CustomItemData'


/**
* History item class.
*/
declare class HistoryItem<T extends object = any> {

    /**
     * History item class.
     * @param {string} guildID Guild ID.
	 * @param {string} memberID Member ID.
     * @param {EconomyConfiguration} ecoOptions Economy configuration.
     * @param {HistoryData} itemObject User purchases history item object.
	 * @param {DatabaseManager} database Database Manager.
     */
    public constructor(
        guildID: string,
		memberID: string,
        ecoOptions: EconomyConfiguration,
        itemObject: HistoryData<T>,
		database: DatabaseManager
    )


    /**
    * Guild ID.
    * @type {string}
    */
    public guildID: string

    /**
    * Member ID.
    * @type {string}
    */
    public memberID: string

    /**
     * Item ID in history.
     * @type {number}
     */
    public id: number

    /**
     * Item name.
     * @type {string}
     */
    public name: string

    /**
     * Item price.
     * @type {number}
     */
    public price: number

    /**
     * Items total price.
     */
    public totalPrice: number

    /**
     * Quantity of the items.
     */
    public quantity: number

    /**
     * The message that will be returned on item use.
     * @type {string}
     */
    public message: string

    /**
    * Date when the item was bought by a user.
    * @type {string}
    */
    public date: string

    /**
     * ID of Discord Role that will be given to Wuser on item use.
     * @type {string}
     */
    public role: string

    /**
     * Custom item data object.
     */
    public custom: CustomItemData<T>

    /**
     * Removes the item from the history.
     * 
     * This method is an alias for 'HistoryItem.remove()' method.
     * @returns {boolean} If removed: true, else: false.
     */
    public delete(): boolean

    /**
     * Removes the item from the history.
     * @returns {boolean} If removed: true, else: false.
     */
    public remove(): boolean
}

export = HistoryItem
