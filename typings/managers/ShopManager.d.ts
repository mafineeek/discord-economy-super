import Emitter from '../classes/util/Emitter'
import ShopItem from '../classes/ShopItem'

import AddItemOptions from '../interfaces/AddItemOptions'
import ShopOperationInfo from '../interfaces/ShopOperationInfo'

import { ItemProperties, ItemPropertyType } from '../interfaces/ItemProperties'
import CustomItemData from '../interfaces/CustomItemData'

import EconomyConfiguration from '../interfaces/EconomyConfiguration'
import InventoryData from '../interfaces/InventoryData'
import HistoryData from '../interfaces/HistoryData'


/**
* Shop manager methods class.
* @extends {Emitter}
*/
declare class ShopManager extends Emitter {
    public constructor(options: EconomyConfiguration)

    /**
     * Creates an item in shop.
     * 
     * Type parameters:
     * 
     * - T: Set an object for 'custom' item property.
     * @param {AddItemOptions} options Configuration with item info.
     * @param {string} guildID Guild ID.
     * @returns Item info.
     */
    public addItem<T extends object = any>(guildID: string, options: AddItemOptions<T>): ShopItem<T>

    /**
     * Creates an item in shop.
     * 
     * Type parameters:
     * 
     * - T: Set an object for 'custom' item property.
     * 
     * This method is an alias for the `ShopManager.addItem()` method.
     * @param {string} guildID Guild ID.
     * @param {AddItemOptions} options Configuration with item info.
     * @returns {ShopItem} Item info.
     */
    public add<T extends object = any>(guildID: string, options: AddItemOptions<T>): ShopItem<T>

    /**
    * Edits the item in the shop.
    * 
    * Type parameters:
    * 
    * - T: Item property string.
    * - K: Type for specified property in T.
    * @param {string} itemID Item ID or name.
    * @param {string} guildID Guild ID.
    * 
    * @param {"description" | "price" | "name" | "message" | "maxAmount" | "role" | 'custom'} itemProperty
    * This argument means what thing in item you want to edit (item property). 
    * Available item properties are 'description', 'price', 'name', 'message', 'amount', 'role', 'custom'.
    * 
    * @param {T} value Any value to set.
    * @returns {boolean} If edited successfully: true, else: false.
    */
    public edit<
        T extends keyof Omit<ItemProperties, 'id' | 'date'>,
        K extends ItemPropertyType<T>
    >(
        itemID: string | number, guildID: string,
        itemProperty: T, value: T extends 'custom' ? CustomItemData<K> : K
    ): boolean

    /**
    * Edits the item in the shop.
    *
    * Type parameters:
    * 
    * - T: Item property string.
    * - K: Type for specified property in T.
    * 
    * This method is an alias for 'ShopItem.edit()' method.
    * 
    * @param {string} itemID Item ID or name.
    * @param {string} guildID Guild ID.
    * 
    * @param {"description" | "price" | "name" | "message" | "maxAmount" | "role" | 'custom'} itemProperty
    * This argument means what thing in item you want to edit (item property). 
    * Available item properties are 'description', 'price', 'name', 'message', 'amount', 'role', 'custom'.
    * 
    * @param {T} value Any value to set.
    * @returns {boolean} If edited successfully: true, else: false.
    */
    public editItem<
        T extends keyof Omit<ItemProperties, 'id' | 'date'>,
        K extends ItemPropertyType<T>
    >(
        itemID: string | number, guildID: string,
        itemProperty: T, value: T extends 'custom' ? CustomItemData<K> : K
    ): boolean

    /**
     * Sets a custom object for the item.
     * @param {string} itemID Item ID or name.
     * @param {string} guildID Guild IF.
     * @param {object} custom Custom item data object.
     * @returns {boolean} If set successfully: true, else: false.
     */
    public setCustom<
        T extends object = never
    >(itemID: string | number, guildID: string, custom: CustomItemData<T>): boolean

    /**
     * Removes the item from the shop.
     * @param {string} itemID Item ID or name.
     * @param {string} guildID Guild ID
     * @returns {boolean} If removed: true, else: false
     */
    public removeItem(itemID: string | number, guildID: string): boolean

    /**
     * Gets the item in the shop.
     * 
     * Type parameters:
     * 
     * - T: Set an object for 'custom' item property.
     * 
     * This method is an alias for the `ShopManager.getItem()` method.
     * @param {string} itemID Item ID or name.
     * @param {string} guildID Guild ID
     * @returns If item not found: null; else: item data array
     */
    public findItem<T extends object = any>(itemID: string | number, guildID: string): ShopItem<T>

    /**
     * Uses the item from the user's inventory.
     * 
     * [!!!] This method is deprecated.
     * If you want to get all the bugfixes and
     * use the newest inventory features, please
     * switch to the usage of the new InventoryManager.
     * 
     * [!!!] No help will be provided for inventory
     * related methods in ShopManager.
     * @param {string} itemID Item ID or name
     * @param {string} memberID Member ID
     * @param {string} guildID Guild ID
     * @param {any} client The Discord Client [Optional]
     * @returns {string} Item message 
     * @deprecated
     */
    public useItem(itemID: string | number, memberID: string, guildID: string, client?: any): string

    /**
     * Buys the item from the shop.
     * @param {number | string} itemID Item ID or name.
     * @param {string} memberID Member ID.
     * @param {string} guildID Guild ID.
     * @param {number} [quantity=1] Quantity of items to buy. Default: 1.
     * 
     * @param {string} [reason='received the item from the shop'] 
     * The reason why the money was subtracted. Default: 'received the item from the shop'.
     * 
     * @returns {ShopOperationInfo} Operation information object.
     */
    public buy<
        T extends object = any
    >(
        itemID: string | number,
        memberID: string,
        guildID: string,
        quantity?: number,
        reason?: string
    ): ShopOperationInfo<T>

    /**
     * Buys the item from the shop.
     * 
     * This method is an alias for the `ShopManager.buy()` method.
     * @param {number | string} itemID Item ID or name.
     * @param {string} memberID Member ID.
     * @param {string} guildID Guild ID.
     * @param {number} [quantity=1] Quantity of items to buy. Default: 1.
     * 
     * @param {string} [reason='received the item from the shop'] 
     * The reason why the money was subtracted. Default: 'received the item from the shop'.
     * 
     * @returns {ShopOperationInfo} Operation information object.
     */
    public buyItem<
        T extends object = any
    >(
        itemID: string | number,
        memberID: string,
        guildID: string,
        quantity?: number,
        reason?: string
    ): ShopOperationInfo<T>

    /**
     * Clears the shop.
     * @param {string} guildID Guild ID
     * @returns {boolean} If cleared: true, else: false
     */
    public clear(guildID: string): boolean

    /**
     * Clears the user's inventory.
     * 
     * [!!!] This method is deprecated.
     * If you want to get all the bugfixes and
     * use the newest inventory features, please
     * switch to the usage of the new InventoryManager.
     * 
     * [!!!] No help will be provided for inventory
     * related methods in ShopManager.
     * @param {string} memberID Member ID
     * @param {string} guildID Guild ID
     * @returns {boolean} If cleared: true, else: false.
     * @deprecated
     */
    public clearInventory(memberID: string, guildID: string): boolean

    /**
    * Clears the user's purchases history.
    * 
    * [!!!] This method is deprecated.
    * If you want to get all the bugfixes and
    * use the newest history features, please
    * switch to the usage of the new HistoryManager.
    * 
    * [!!!] No help will be provided for history
    * related methods in ShopManager.
    * @param {string} memberID Member ID.
    * @param {string} guildID Guild ID.
    * @returns {boolean} If cleared: true, else: false.
    * @deprecated
    */
    public clearHistory(memberID: string, guildID: string): boolean

    /**
     * Shows all items in the shop.
     * 
     * Type parameters:
     * 
     * - T: Set an object for 'custom' item property.
     * @param {string} guildID Guild ID
     * @returns The shop array.
     */
    public fetch<T extends object = any>(guildID: string): ShopItem<T>[]

    /**
     * Shows all items in the shop.
     * 
     * This method is an alias for the `ShopManager.fetch()` method.
     * @param {string} guildID Guild ID
     * @returns {ShopItem[]} The shop array.
     */
    public get<T extends object = any>(guildID: string): ShopItem<T>[]

    /**
     * Shows all items in the shop.
     * 
     * This method is an alias for the `ShopManager.get()` method.
     * @param {string} guildID Guild ID
     * @returns {ShopItem[]} The shop array.
     */
    public all<T extends object = any>(guildID: string): ShopItem<T>[]

    /**
     * Gets the item in the shop.
     * @param {number | string} itemID Item ID or name.
     * @param {string} guildID Guild ID.
     * @returns {ShopItem} If item not found: null; else: item info object.
     */
    public getItem<T extends object = any>(itemID: string | number, guildID: string): ShopItem<T>

    /**
     * Gets the item in the inventory.
     * 
     * [!!!] This method is deprecated.
     * If you want to get all the bugfixes and
     * use the newest inventory features, please
     * switch to the usage of the new InventoryManager.
     * 
     * [!!!] No help will be provided for inventory
     * related methods in ShopManager.
     * @param {string} itemID Item ID or name.
     * @param {string} memberID Member ID.
     * @param {string} guildID Guild ID.
     * @returns {InventoryData} If item not found: null; else: item info object.
     * @deprecated
     */
    public searchInventoryItem<T extends object = any>(itemID: string | number, memberID: string, guildID: string): InventoryData<T>

    /**
     * Shows all items in user's inventory
     * 
     * [!!!] This method is deprecated.
     * If you want to get all the bugfixes and
     * use the newest inventory features, please
     * switch to the usage of the new InventoryManager.
     * 
     * [!!!] No help will be provided for inventory
     * related methods in ShopManager.
     * @param {string} memberID Member ID
     * @param {string} guildID Guild ID
     * @returns The user's inventory array.
     * @deprecated
     */
    public inventory<T extends object = any>(memberID: string, guildID: string): InventoryData<T>[]

    /**
     * Shows the user's purchase history.
     * 
     * [!!!] This method is deprecated.
     * If you want to get all the bugfixes and
     * use the newest history features, please
     * switch to the usage of the new HistoryManager.
     * 
     * [!!!] No help will be provided for history
     * related methods in ShopManager.
     * @param {string} memberID Member ID
     * @param {string} guildID Guild ID
     * @returns {HistoryData[]} User's purchase history.
     * @deprecated
     */
    public history<T extends object = any>(memberID: string, guildID: string): HistoryData<T>[]
}

export = ShopManager