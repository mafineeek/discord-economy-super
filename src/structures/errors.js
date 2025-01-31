const settingsArray = [
    'dailyAmount',
    'dailyCooldown',

    'workAmount',
    'workCooldown',

    'weeklyAmount',
    'weeklyCooldown',

    'dateLocale',
    'subtractOnBuy',

    'sellingItemPercent'
]

const colors = {
    red: '\x1b[31m',
    green: '\x1b[32m',
    yellow: '\x1b[33m',
    magenta: '\x1b[35m',
    cyan: '\x1b[36m',
    reset: '\x1b[0m'
}

const availableItemProps = [
    'description',
    'price',
    'name',
    'message',
    'maxAmount',
    'role',
    'custom'
]

module.exports = {
    notReady: 'The module is not ready to work.',
    savingHistoryDisabled: 'Saving purchases history is disabled.',

    /**
     * Returns a message for an INVALID_TYPE error.
     * @param {string} key 
     * @param {string} type 
     * @param {string} received 
     * @returns {string} {key} must be a {type}. Received type: {received}.
     */
    invalidType(key, type, received) {
        return `${key} must be a ${type}. Received type: ${received}.`
    },


    invalidTypes: {
        memberID: 'memberID must be a string. Received type: ',
        guildID: 'guildID must be a string. Received type: ',
        senderMemberID: 'senderMemberID must be a string. Received type: ',
        receiverMemberID: 'receiverMemberID must be a string. Received type: ',
        amount: 'amount must be a number. Received type: ',
        value: 'value must be specified. Received: ',
        id: 'id must be a string or a number. Received type: ',

        depositInvalidInput: 'Cannot deposit a negative amount of money.',
        withdrawInvalidInput: 'Cannot withdraw a negative amount of money.',

        addItemOptions: {
            name: 'options.name must be a string. Received type: ',
            price: 'options.price must be a number. Received type: ',
            message: 'options.message must be a string. Received type: ',
            description: 'options.description must be a string. Received type: ',
            maxAmount: 'options.maxAmount must be a number. Received type: ',
            role: 'options.role must be a string. Received type: ',
            custom: 'options.custom must be an object. Received type: ',
        },

        editItemArgs: {
            itemID: 'itemID is not a string or a number. Received type: ',
            itemProperty: '\'itemProperty\' parameter must be one of these values: ' +
                availableItemProps.map(prop => `'${prop}'`).join(', ') +
                '. Received: ',
            noValue: 'No value specified. Received: '
        },
    },

    workAmount: {
        tooManyElements: 'options.workAmount array cannot have more than 2 elements;' +
            'it must have "min" and "max" values as first and second element of the array (example: [10, 20]).',
    },

    databaseManager: {
        invalidTypes: {
            key: 'Key must be a string. Received type: ',
            target: {
                number: 'Target is not a number. Received type: ',
                array: 'Target is not an array. Received type: '
            },
            value: {
                number: 'Value is not a number. Received type: ',
                array: 'Value is not an array. Received type: ',
                newValue: '\'newValue\' parameter must be specified. Received: '
            }
        }
    },

    settingsManager: {
        invalidKey: 'You have specified the incorrect settings key.' +
            'It must be one of the following values:\n' +
            settingsArray.map(x => `'${x}'`).join(', ') +
            '.\nReceived: ',

        valueNotFound(setting, value) {
            return `Cannot find the value "${value}" in a setting "${setting}".`
        },

        invalidType(key, type, received) {
            return `${key} must be a ${type}. Received type: ${received} `
        }
    },

    noClient: 'You need to specify your bot client to give roles to members.',
    roleNotFound: 'Could not find a role with ID ',

    oldNodeVersion: 'This module is supporting only Node.js v14 or newer. Installed version is ',

    reservedName(name = 'testStorage123') {
        return `'${name}' is a reserved storage file name. You cannot use it.`
    },

    invalidStorage: 'Storage file is not valid.',
    wrongStorageData: 'Storage file contains wrong data.',

    invalidErrorCode: 'Invalid error code.',

    /**
     * Sends a deprecation warning log in the console.
     * @param {string} oldManager
     * @param {string} oldMethod 
     * @param {string} newManager 
     * @param {string} newMethod
     * @param {string[]} argumentsList
     * @returns {string} Deprecation warning message.
     */
    deprecationWarning(oldManager, oldMethod, newManager, newMethod, argumentsList = [], newArgumentsList = []) {
        return `${colors.magenta}[Economy - Deprecation Warning] ${colors.red}"${oldManager}.${oldMethod}` +
            `(${argumentsList.join(', ')})"${colors.cyan} is ${colors.yellow}deprecated${colors.cyan}. ` +
            `Use ${colors.green}"${newManager}.${newMethod}(${newArgumentsList.join(', ')})"` +
            `${colors.cyan} instead.${colors.reset}`
    },

    /**
     * Sends a property deprecation warning in a console.
     * @param {string} manager The manager where the method is using a deprecated property.
     * @param {string} oldProperty The option that is deprecated.
     * @param {string} newProperty The new option that should be used instead of the deprecated one.
     * 
     * @param {ProperyDeprecationOptions} [objectPropertyOptions] 
     * Can be used if the deprecated property is an object property.
     * 
     * @returns {string} A message to be sent to the console.
     */
    propertyDeprecationWarning(manager, oldProperty, newProperty, objectPropertyOptions = null) {
        if (objectPropertyOptions) {
            const { method, argumentName, argumentsList, example } = objectPropertyOptions

            return `${colors.magenta}[Economy - Deprecation Warning] ${colors.cyan}In ${colors.yellow}` +
                `"${manager}.${method}(${argumentsList.join(', ')})"${colors.cyan} method in ` +
                `${colors.red}"${argumentName}"${colors.cyan} object, property ${colors.red}"${oldProperty}"` +
                `${colors.cyan} is ${colors.yellow}deprecated${colors.cyan}. ` +
                `Use ${colors.green}"${manager}.${method}({ ${newProperty}: '${example}' })"` +
                `${colors.cyan} instead.${colors.reset}`
        } else {
            return `${colors.magenta}[Economy - Deprecation Warning] ${colors.red}"${manager}.${oldProperty}"` +
                `${colors.cyan} property is ${colors.yellow}deprecated${colors.cyan}. ` +
                `Use ${colors.green}"${manager}.${newProperty}"${colors.cyan} instead.${colors.reset}`
        }
    }
}

/**
 * @typedef {object} ProperyDeprecationOptions
 * @property {string} method The method that includes an options object with deprecated property.
 * @property {string} argumentName The name of the argument where the options object has a deprecated property.
 * @property {string[]} argumentsList The list of arguments of the method.
 * @property {string} example Example of the usage of the new property. 
 */
